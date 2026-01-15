export function getRandomPosts<T>(posts: T[], count: number): T[] {
  const shuffled = [...posts].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getYouTubeVideoId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);

    // youtu.be/VIDEO_ID
    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1);
    }

    // youtube.com/watch?v=VIDEO_ID
    if (parsedUrl.searchParams.has("v")) {
      return parsedUrl.searchParams.get("v");
    }

    // youtube.com/embed/VIDEO_ID
    // youtube.com/shorts/VIDEO_ID
    const match = parsedUrl.pathname.match(
      /\/(embed|shorts)\/([a-zA-Z0-9_-]{11})/
    );

    return match ? match[2] : null;
  } catch {
    return null;
  }
}

export function getTweetId(url: string): string | null {
  try {
    const parsed = new URL(url);

    // Örn:
    // /berat/status/1731234567890123456
    // /berat/statuses/1731234567890123456
    // /i/web/status/1731234567890123456
    const match = parsed.pathname.match(/\/status(?:es)?\/(\d+)/);

    return match?.[1] ?? null;
  } catch {
    return null;
  }
}
