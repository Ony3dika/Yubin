import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { supabase } from "@/utils/supabase";

//Parse Email
function decodeBase64(str: string) {
  return Buffer.from(str, "base64").toString("utf-8");
}

function getHeader(headers: any[], name: string) {
  return headers.find((h) => h.name === name)?.value || "";
}

export function parseEmail(msg: any) {
  const headers = msg.payload.headers;

  const subject = getHeader(headers, "Subject");
  const from = getHeader(headers, "From");
  const dateRaw = getHeader(headers, "Date");
  const id = msg.id;

  let body = "";
  const parts = msg.payload.parts || [];

  for (const part of parts) {
    if (part.mimeType === "text/plain") {
      body = decodeBase64(part.body.data || "");
    }
  }

  return { id,subject, from, body, date: dateRaw };
}

const fetchEmail = async (googleAccessToken: string) => {
  const res = await fetch("/api/gmail/list", {
    headers: {
      Authorization: `Bearer ${googleAccessToken}`,
    },
  });

  const data = await res.json();
  const emails = data.map((email: any) => parseEmail(email));

  return emails;
};

export const useFetchEmail = (googleAccessToken: string) => {
  return useQuery({
    queryKey: ["email"],
    queryFn: () => fetchEmail(googleAccessToken),
  });
};
