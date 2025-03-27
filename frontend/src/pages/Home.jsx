import { useEffect, useState } from "react";
import Hero from "../components/Layout/Hero";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturedSection from "../components/Products/FeaturedSection";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDeatails";
import ProductGrid from "../components/Products/ProductGrid";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slice/products.slice";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  // fetch products for a specific collection
  const fetchBestSeller = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/bestSeller`
      );
      setBestSellerProduct(response.data);
    } catch (error) {
      console.error("Error in fetching best seller product: ", error);
    }
  };
  
  useEffect(() => {
    dispatch(fetchProductsByFilters({ gender: "Women", category: "Bottom Wear", limit: 8 }));
    fetchBestSeller();
  }, [dispatch]);
  

  return (
    <>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      {/* best seller */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      {bestSellerProduct && bestSellerProduct._id ? (
  <ProductDetails productId={bestSellerProduct._id} />
) : (
  <p className="text-center">Loading best seller product...</p>
)}

      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <FeaturedCollection />

      <FeaturedSection />
    </>
  );
};

export default Home;
