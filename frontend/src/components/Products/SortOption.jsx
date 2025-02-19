import { useSearchParams } from "react-router-dom";

const SortOption = () => {
  const [, setSearchParams] = useSearchParams()
  const sortChangeHandler = (e) => {
    const sortBy = e.target.value;
    if (sortBy === "") {
      setSearchParams({});
    } else {
      setSearchParams({ sort: sortBy });
    }

  }
  return (
    <div className="mb-4 flex items-center justify-end">
      <select 
      onChange={sortChangeHandler}
      id="sort" className="border p-2 rounded-md focus:outline-none">
        <option value="">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default SortOption;
