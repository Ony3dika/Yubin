import { getOAuth2Client } from "@/lib/gmail";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("gmail_access_token")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { error: "Session expired or invalid" },
      { status: 401 }
    );
  }

  // Clean up cookie
  cookieStore.delete("gmail_access_token");

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Invalid user session" },
        { status: 401 }
      );
    }

    const oauth2Client = getOAuth2Client();
    const { tokens } = await oauth2Client.getToken(code);

    const { error: dbError } = await supabase.from("gmail_tokens").upsert({
      user_id: user.id,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expiry_date: tokens.expiry_date,
      updated_at: new Date().toISOString(),
    });

    if (dbError) {
      console.error("Error storing tokens:", dbError);
      return NextResponse.json(
        { error: "Failed to store tokens" },
        { status: 500 }
      );
    }

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/app/settings`
    );
  } catch (err: any) {
    console.error("Error exchanging code:", err);
    return NextResponse.json(
      { error: err.message || "Failed to exchange code" },
      { status: 500 }
    );
  }
}
