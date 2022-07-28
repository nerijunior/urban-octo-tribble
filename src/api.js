const API_TOKEN = process.env.REACT_APP_GITHUB_API_TOKEN;
const PER_PAGE = 30;

export default function fetchRepositories(
  query,
  sortBy = undefined,
  order = "desc",
  page = 1
) {
  if (!API_TOKEN || API_TOKEN.length === 0) {
    throw new Error(
      "No Github API token found, please update set REACT_APP_GITHUB_API_TOKEN env value."
    );
  }

  const url = "https://api.github.com/search/repositories";
  const params = new URLSearchParams({
    q: query,
    sort: sortBy,
    order,
    per_page: PER_PAGE,
    page,
  });

  return fetch(`${url}?${params}`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `token ${API_TOKEN}`,
    },
  })
    .then(async (response) => {
      const data = await response.json();
      return Promise.resolve({
        items: data.items,
        total: data.total_count,
        pages: Math.round(data.total_count / PER_PAGE),
      });
    })
    .catch((error) => {
      console.error("Send to some external log/bug/error provider.", error);
      throw error;
    });
}
