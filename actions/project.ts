import { fetchGraphQL } from "./common";

const PROJECT_GRAPHQL_FIELDS = `
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
  demo
  source
  summary
  status
`;

const PROJECT_GRAPHQL_FIELDS_CONTENT = `
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
  demo
  source
  summary
  status
  
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

function extractProject(fetchResponse) {
  return fetchResponse?.data?.projectsCollection?.items?.[0];
}

function extractProjectEntries(fetchResponse) {
  return fetchResponse?.data?.projectsCollection?.items;
}

export async function getAllProjects(limit?: number, isDraftMode?: boolean) {
  const entries = await fetchGraphQL(
    `query {
        projectsCollection(where: { slug_exists: true }, order: date_DESC, limit: ${limit ?? 100}, preview: ${
          isDraftMode ? "true" : "false"
        }) {
          items {
            ${PROJECT_GRAPHQL_FIELDS}
          }
        }
      }`,
    isDraftMode,
  );


  return extractProjectEntries(entries);
}

export async function getProjectAndMoreProjects(
  slug: string,
  preview: boolean,
) {
  const entry = await fetchGraphQL(
    `query {
        projectsCollection(where: { slug: "${slug}" }, preview: ${
          preview ? "true" : "false"
        }, limit: 1) {
          items {
            ${PROJECT_GRAPHQL_FIELDS_CONTENT}
          }
        }
      }`,
    preview,
  );


  const entries = await fetchGraphQL(
    `query {
        projectsCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
          preview ? "true" : "false"
        }, limit: 2) {
          items {
            ${PROJECT_GRAPHQL_FIELDS_CONTENT}
          }
        }
      }`,
    preview,
  );


  return {
    project: extractProject(entry),
    moreProjects: extractProjectEntries(entries),
  };
}
