export async function updateViewAndLike(
  pageType: "post" | "project" | "page",
  slug: string,
  type: "views" | "likes",
  count?: number,
) {
  try {
    if (process.env.NODE_ENV !== "production") {
      return true;
    }
    let query: string = `slug=${slug}&type=${type}&pageType=${pageType}`;

    if (type === "likes") {
      query += `&count=${count}`;
    }

    await fetch(
      `${process.env.NODE_ENV === "production"
        ? "https://beratbozkurt.net/"
        : "http://localhost:3000/"
      }api/views?&${query}`,
      {
        method: "PUT",
      },
    );
  } catch (error) {
    console.error(error);
  }
}

export async function getViewAndLike(
  pageType: "post" | "project" | "page",
  slug: string,
) {
  try {
    const result = await fetch(
      `${process.env.NODE_ENV === "production"
        ? "https://beratbozkurt.net/"
        : "http://localhost:3000/"
      }api/views?slug=${slug}&pageType=${pageType}`,
    );

    return result.json();
  } catch (error) {
    console.error(error);
  }
}