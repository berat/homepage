import { draftMode } from "next/headers";

export async function GET(req, res) {
  (await draftMode()).enable();
  return new Response("Draft mode is disabled");
}
