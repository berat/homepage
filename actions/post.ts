import { fetchGraphQL } from "./common";

const POST_GRAPHQL_FIELDS = `
  slug
  title
  cover {
    url(transform: {
      format: AVIF,
      quality: 90
    })
  }
  date
  view
  like
`;

const POST_GRAPHQL_FIELDS_CONTENT = `
  slug
  title
  cover {
    url(transform: {
      format: AVIF,
      quality: 90
    })
  }
  date
  view
  like
  
  content {
    json 
    links {
      assets {
        block {
          sys {
            id
          }
          title
          url(transform: {
            quality: 50
          })
          description
        }
      }
      entries {
        inline {
          sys {
            id
          }
          __typename
          ... on Youtube {
            url
          }
          ... on Code {
            language
            code
          }
          ... on Gallery {
                description
            imagesCollection {
              items {
                title
                url(transform: {
                  quality: 50
                })
              }
            }
          }
          ... on Tweet {
            url
          }
        }
        block {
          sys {
            id
          }
          __typename
          ... on Gallery {
                description
            imagesCollection {
              items {
                title
                description
                url(transform: {
                  quality: 50
                })
              }
            }
          }
        }
      }
    }
  }
  sys {
    firstPublishedAt
    publishedAt
  }
`;

function extractPost(fetchResponse) {
  return fetchResponse?.data?.blogCollection?.items?.[0];
}

function extractPostEntries(fetchResponse) {
  return fetchResponse?.data?.blogCollection?.items;
}

export async function getAllPosts(limit?: number, isDraftMode?: boolean) {
  const entries = await fetchGraphQL(
    `query {
        blogCollection(where: { slug_exists: true }, order: date_DESC, limit: ${limit ?? 100}, preview: ${
          isDraftMode ? "true" : "false"
        }) {
          items {
            ${POST_GRAPHQL_FIELDS}
          }
        }
      }`,
    isDraftMode,
  );

  return extractPostEntries(entries);
}

export async function getPostAndMorePosts(slug: string, preview: boolean) {
  const entry = await fetchGraphQL(
    `query {
        blogCollection(where: { slug: "${slug}" }, preview: ${
          preview ? "true" : "false"
        }, limit: 1) {
          items {
            ${POST_GRAPHQL_FIELDS_CONTENT}
          }
        }
      }`,
    preview,
  );

  const entries = await fetchGraphQL(
    `query {
        blogCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
          preview ? "true" : "false"
        }, limit: 2) {
          items {
            ${POST_GRAPHQL_FIELDS_CONTENT}
          }
        }
      }`,
    preview,
  );

  return {
    post: extractPost(entry),
    morePosts: extractPostEntries(entries),
  };
}
