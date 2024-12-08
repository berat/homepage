import { fetchGraphQL } from "./common";

const PAGES_GRAPHQL_FIELDS = `
  slug
  title
  cover {
    url(transform: {
      format: AVIF,
      quality: 90
    })
  }
  view
  like
`;

const PAGES_GRAPHQL_FIELDS_CONTENT = `
  slug
  title
  cover {
    url(transform: {
      format: AVIF,
      quality: 90
    })
  }
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
  return fetchResponse?.data?.pagesCollection?.items?.[0];
}

function extractPostEntries(fetchResponse) {
  return fetchResponse?.data?.pagesCollection?.items;
}

export async function getPage(slug: string, preview: boolean) {
  const entry = await fetchGraphQL(
    `query {
        pagesCollection(where: { slug: "${slug}" }, preview: ${
          preview ? "true" : "false"
        }, limit: 1) {
          items {
            ${PAGES_GRAPHQL_FIELDS_CONTENT}
          }
        }
      }`,
    preview,
  );

  console.log('getPage ~ entry:', entry)


  return {
    post: extractPost(entry),
  };
}
