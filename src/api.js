import { DEFAULT_PER_PAGE, GITHUB_API_TOKEN } from "./constants";

export default function fetchRepositories(
  query,
  sortBy = undefined,
  order = "desc",
  page = 1
) {
  console.log({ page });
  if (!GITHUB_API_TOKEN || GITHUB_API_TOKEN.length === 0) {
    throw new Error(
      "No Github API token found, please update set REACT_APP_GITHUB_API_TOKEN env value."
    );
  }

  const url = "https://api.github.com/search/repositories";
  const params = new URLSearchParams({
    q: query,
    sort: sortBy,
    order,
    per_page: DEFAULT_PER_PAGE,
    page,
  });

  return fetch(`${url}?${params}`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `token ${GITHUB_API_TOKEN}`,
    },
  })
    .then(async (response) => {
      const data = await response.json();
      return Promise.resolve({
        items: data.items,
        total: data.total_count,
      });
    })
    .catch((error) => {
      console.error("Send to some external log/bug/error provider.", error);
      throw error;
    });
}
