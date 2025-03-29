import { Link } from "react-router-dom";

const ProductGrid = ({ products, loading, error }) => {
  console.log("Products in product grid jsx:", products);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products && products.map((product, index) => {
        const imageUrl = product.images[0].url;
        return (
          <Link key={product._id || index} to={`/product/${product._id}`} className="block">
            <div className="bg-white p-4 rounded-lg">
              <div className="w-full h-96 mb-4">
                <img
                  src={imageUrl}
                  alt={product.images?.[0]?.altText || product.name || "Product Image"}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-sm mb-2">{product.name || "Unnamed Product"}</h3>
              <p className="text-gray-500 font-medium text-sm tracking-tighter">
                {typeof product.price === "number" ? `$${product.price.toFixed(2)}` : "Price not available"}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductGrid;
