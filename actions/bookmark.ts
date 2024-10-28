export async function getBookmarks() {
  const res = await fetch(
    (process.env.NODE_ENV === "production"
      ? "https://beratbozkurt.net/"
      : "http://localhost:3000/") + "/api/bookmarks"
  );

  const result = await res.json();
  return result;
}
