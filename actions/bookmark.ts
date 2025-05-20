export async function getBookmarks(isTurkish: boolean = true) {
  const pathName = isTurkish ? "/api/bookmarks" : "/en/api/bookmarks";

  const res = await fetch(
    (process.env.NODE_ENV === "production"
      ? "https://beratbozkurt.net/"
      : "http://localhost:1234/") + pathName,
  );

  const result = await res.json();

  return result;
}
