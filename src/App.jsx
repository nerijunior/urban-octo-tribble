import { useEffect, useState } from "react";
import fetchRepositories from "./api";
import Pagination from "./components/Pagination";
import SearchRepoForm from "./components/SearchRepoForm";

function App() {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [retry, setRetry] = useState(false);
  const [totalRepositoriesCount, setTotalRepositoriesCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    if (!query) {
      return;
    }

    loadRepositories();
  }, [currentPage, sortBy, retry]);

  const loadRepositories = async () => {
    setLoading(true);

    try {
      const response = await fetchRepositories(
        query,
        sortBy,
        null,
        currentPage
      );

      setRepositories(response.items);
      setTotalRepositoriesCount(response.total);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    setCurrentPage(1);
    setRetry(!retry);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <div className="section">
        {error && <div className="notification is-warning">{error}</div>}

        <SearchRepoForm
          query={query}
          setQuery={setQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onSubmit={handleSubmit}
          loading={loading}
        />

        <span>Page: {currentPage}</span>

        <table className="table is-fullwidth is-stripped is-bordered is-hoverable">
          <thead>
            <tr>
              <th>Repository</th>
              <th>Description</th>
              <th>Stars</th>
              <th>Language</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {repositories.length === 0 && (
              <tr>
                <td colSpan={5} className="has-text-centered">
                  No results
                </td>
              </tr>
            )}
            {!loading &&
              repositories.map((repository) => (
                <tr key={repository.id}>
                  <td>
                    <a
                      href={repository.html_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {repository.full_name}
                    </a>
                  </td>
                  <td>{repository.description}</td>
                  <td>
                    <a
                      href={repository.stargazers_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {repository.stargazers_count}
                    </a>
                  </td>
                  <td>{repository.language}</td>
                  <td>
                    {" "}
                    <a
                      href={repository.owner.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {repository.owner.login}
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {!loading && totalRepositoriesCount > 0 && (
          <Pagination
            currentPage={currentPage}
            totalRecords={totalRepositoriesCount}
            onPageChange={(value) => handlePageChange(value)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
