import cx from "classnames";
import { useState } from "react";
import fetchRepositories from "./api";

function App() {
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [repositories, setRepositories] = useState([]);

  const loadRepositories = async () => {
    setLoading(true);

    try {
      const response = await fetchRepositories(query, sortBy, null, page);
      console.log(response);

      setRepositories(response.items);
      setTotalPages(response.total_count);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    loadRepositories();
  };

  const handleChangeSortBy = (newValue) => () => {
    setSortBy(newValue);
    loadRepositories();
  };

  const handlePreviousPage = () => {
    console.log("handlePreviousPage");
  };

  const handleNextPage = () => {
    setPage();
  };

  const handlePageChange = (page) => () => {
    console.log("change page", page);
  };

  return (
    <div className="container">
      <div className="section">
        {error && <div className="notification is-warning">{error}</div>}

        <form onSubmit={handleSubmit} className="mb-5">
          <div className="field is-grouped">
            <div className="control is-expanded">
              <input
                type="text"
                className="input"
                id="query"
                placeholder="Search"
                disabled={loading}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="control">
              <button
                type="submit"
                disabled={loading}
                className={cx("button is-primary", { "is-loading": loading })}
              >
                Search
              </button>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Sort By: </label>
              <label className="radio">
                <input
                  type="radio"
                  checked={sortBy == null}
                  onChange={handleChangeSortBy(null)}
                />
                Best Match
              </label>
              <label className="radio">
                <input
                  type="radio"
                  checked={sortBy === "stars"}
                  onChange={handleChangeSortBy("stars")}
                />
                Stars
              </label>
            </div>
          </div>
        </form>

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

        {!loading && repositories.length > 0 && (
          <nav className="pagination" role="navigation" aria-label="pagination">
            <button
              type="button"
              disabled={page === 1}
              className="pagination-previous"
              onClick={handlePreviousPage}
            >
              Previous
            </button>
            <button
              type="button"
              disabled={page === totalPages}
              className="pagination-next"
              onClick={handleNextPage}
            >
              Next page
            </button>
            <ul className="pagination-list">
              <li>
                <button
                  type="button"
                  className={cx("pagination-link", {
                    "is-current": page === 1,
                  })}
                  onClick={handlePageChange(1)}
                >
                  1
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="pagination-link"
                  onClick={handlePageChange(2)}
                >
                  2
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="pagination-link"
                  onClick={handlePageChange(3)}
                >
                  3
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}

export default App;
