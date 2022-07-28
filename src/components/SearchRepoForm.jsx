import cx from "classnames";

export default function SearchRepoForm({
  query,
  sortBy,
  setQuery,
  setSortBy,
  onSubmit,
  loading,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const handleChangeSortBy = (newValue) => () => {
    setSortBy(newValue);
    onSubmit();
  };

  return (
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
  );
}
