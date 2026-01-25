const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://beratbozkurt.net"
    : "http://localhost:3000";

export async function getBookmarks() {
  const res = await fetch(`${BASE_URL}/api/bookmarks`, {
    next: {
      revalidate: 3600, // 1 saat cache
    },
  });

  if (!res.ok) {
    throw new Error(`Bookmarks alınamadı: ${res.status}`);
  }

  return res.json();
}