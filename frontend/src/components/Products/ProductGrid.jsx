import { Link } from "react-router-dom";

const ProductGrid = ({ products, loading, error }) => {
  // Handle loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Handle error state
  if (error) {
    return <p>Something went wrong: {error}</p>;
  }

  // Ensure products is an array
  if (!Array.isArray(products) || products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        product._id && (
          <Link key={product._id || index} to={`/product/${product._id}`} className="block">
            <div className="bg-white p-4 rounded-lg">
              <div className="w-full h-96 mb-4">
                <img
                  src={product.images?.[0]?.url || "https://picsum.photos/500/500?random=47"}
                  alt={product.images?.[0]?.altText || product.name || "Product Image"}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-sm mb-2">{product.name || "Unnamed Product"}</h3>
              <p className="text-gray-500 font-medium text-sm tracking-tighter">
                {product.price ? `$${product.price}` : "Price not available"}
              </p>
            </div>
          </Link>
        )
      ))}
    </div>
  );
};

export default ProductGrid;