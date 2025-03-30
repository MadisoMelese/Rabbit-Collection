import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOption from "../components/Products/SortOption";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slice/products.slice";
const CollectionPage = () => {
  const {collection} = useParams()
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const {products, loading, error} = useSelector((state)=>state.products)
  const queryParams = Object.fromEntries([...searchParams])



  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(()=>{
    dispatch(fetchProductsByFilters({collection, ...queryParams}))
  }, [dispatch, searchParams, collection])
  const togglesidebar = () => {
    // console.log("togglesidebar")
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    //close side bar if clicked outside
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      // console.log("side bd handleClickOutside closed")
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    // add event listener for click
    document.addEventListener("mousedown", handleClickOutside);
    // remove event listener onMount
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile filter */}
      <button
        onClick={togglesidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" />
      </button>

      {/* Filter side bar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-t">All Collection</h2>

        {/* sort option */}
        <SortOption />

        {/* product grid */}
        <ProductGrid products={products} loading={loading} error={error}/>
      </div>
    </div>
  );
};

export default CollectionPage;
