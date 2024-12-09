import { draftMode } from "next/headers";

export async function GET(req, res) {
  res.draftMode({ enable: false });
  return new Response("Draft mode is disabled");
}
