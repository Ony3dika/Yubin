import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader) {
    return NextResponse.json({ error: "Missing token" }, { status: 401 });
  }

  const accessToken = authHeader.replace("Bearer ", "");

  const listRes = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=20",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const listData = await listRes.json();
  const emails = await Promise.all(
    listData.messages.map(async (msg: any) => {
      const msgRes = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=full`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const msgData = await msgRes.json();
      return msgData;
    })
  );

  return Response.json(emails);
}
