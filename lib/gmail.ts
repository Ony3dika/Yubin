import { google } from "googleapis";
import { supabase } from "@/utils/supabase";

export const getOAuth2Client = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  if (!clientId || !clientSecret) {
    throw new Error("Missing Google OAuth credentials");
  }

  return new google.auth.OAuth2(
    clientId,
    clientSecret,
    `${appUrl}/api/auth/gmail/callback`
  );
};

export const getGmailClient = async (userId: string) => {
  const { data: tokenData, error } = await supabase
    .from("gmail_tokens")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error || !tokenData) {
    throw new Error("User has not connected Gmail");
  }

  const oauth2Client = getOAuth2Client();

  oauth2Client.setCredentials({
    access_token: tokenData.access_token,
    refresh_token: tokenData.refresh_token,
    expiry_date: tokenData.expiry_date,
  });

  // Handle token refresh if needed
  // Note: googleapis automatically refreshes if refresh_token is present
  // But we might want to listen to the 'tokens' event to save the new access token
  // For simplicity in this step, we trust googleapis or manual refresh logic if needed.

  oauth2Client.on("tokens", async (tokens) => {
    if (tokens.access_token) {
      await supabase
        .from("gmail_tokens")
        .update({
          access_token: tokens.access_token,
          expiry_date: tokens.expiry_date,
          ...(tokens.refresh_token && { refresh_token: tokens.refresh_token }),
        })
        .eq("user_id", userId);
    }
  });

  return google.gmail({ version: "v1", auth: oauth2Client });
};
