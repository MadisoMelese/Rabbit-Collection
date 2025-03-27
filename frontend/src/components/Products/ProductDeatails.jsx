import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slice/products.slice.js";
import { addToCart } from "../../redux/slice/cart.Slice.js";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, similarProducts, loading, error } = useSelector(
    (state) => state.products
  );
  const { user, guestId } = useSelector((state) => state.auth);
  console.log(selectedProduct)
  const [mainImage, setMainImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isbtnDisabled, setIsbtnDisabled] = useState(false);
  const productFetchId = productId || id;

  // Fetch product details and similar products
  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  // Set the main image when the product is loaded
  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    } else {
      setMainImage(null); // Fallback
    }
  }, [selectedProduct]);

  // Handle quantity changes
  const handleQuantity = (action) => {
    if (action === "minus" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (action === "plus") {
      setQuantity((prev) => prev + 1);
    }
  };

  // Handle adding product to the cart
  const handleAddtoCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error(
        "Please select both size and color before adding to the cart.",
        {
          duration: 1000,
        }
      );
      return;
    }

    setIsbtnDisabled(true);
    dispatch(
      addToCart({
        userId: user?._id,
        guestId,
        productId: productFetchId,
        color: selectedColor,
        size: selectedSize,
        quantity,
      })
    )
      .then(() => {
        toast.success("Product added to the cart!", {
          duration: 1000,
        });
      })
      .catch(() => {
        toast.error("Failed to add product to the cart.");
      })
      .finally(() => {
        setIsbtnDisabled(false);
      });
  };

  // Handle loading and error states
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-6">
      {selectedProduct && (
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
          <div className="flex flex-col md:flex-row">
            {/* Left Thumbnails */}
            <div className="hidden md:flex flex-col space-y-4 mr-6">
              {selectedProduct?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  onClick={() => setMainImage(image.url)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                    mainImage === image.url ? "border-black" : "border-gray-400"
                  }`}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="md:w-1/2">
              <div className="mb-4">
                {mainImage && (
                  <img
                    src={mainImage}
                    alt={selectedProduct.name || `Main Product`}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                )}
              </div>
            </div>

            {/* Mobile Thumbnails */}
            <div className="md:hidden flex overscroll-x-auto space-x-4 mb-4">
              {selectedProduct?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  onClick={() => setMainImage(image.url)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                    mainImage === image.url ? "border-black" : "border-gray-400"
                  }`}
                />
              ))}
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 md:ml-10">
              <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                {selectedProduct.name}
              </h1>
              <p className="text-lg text-gray-600 mb-1 line-through">
                ${selectedProduct.originalPrice}
              </p>
              <p className="text-xl text-gray-500 mb-2">
                {selectedProduct.price && `$${selectedProduct.price}`}
              </p>
              <p className="text-gray-600 mb-4">
                {selectedProduct.description}
              </p>

              {/* Color Selector */}
              <div className="mb-4">
                <p className="text-gray-700">Color: </p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct?.colors?.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border ${
                        color === selectedColor
                          ? "ring-2 ring-blue-500"
                          : "border-none"
                      }`}
                      style={{
                        backgroundColor: color.toLowerCase(),
                        filter: "brightness(0.5)",
                      }}
                    ></button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-4">
                <p className="text-gray-700">Size: </p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct?.sizes?.map((size) => (
                    <button
                      onClick={() => setSelectedSize(size)}
                      key={size}
                      className={`px-4 py-2 rounded border ${
                        selectedSize === size
                          ? "bg-black text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <p className="text-gray-700">Quantity: </p>
                <div className="flex items-center space-x-4 mt-2">
                  <button
                    onClick={() => handleQuantity("minus")}
                    className="px-2 py-1 bg-gray-200 rounded text-lg"
                  >
                    -
                  </button>
                  <span className="text-lg">{quantity}</span>
                  <button
                    onClick={() => handleQuantity("plus")}
                    className="px-2 py-1 bg-gray-200 rounded text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                disabled={isbtnDisabled}
                onClick={handleAddtoCart}
                className={`bg-black text-white py-1 px-6 rounded w-full mb-4 uppercase ${
                  isbtnDisabled
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-gray-900"
                }`}
              >
                {isbtnDisabled ? "Adding..." : "Add to Cart"}
              </button>

              {/* Product Characteristics */}
              <div className="mt-10 text-gray-700">
                <h3 className="text-xl font-bold mb-4">Characteristics: </h3>
                <table className="w-full text-left text-sm text-gray-600">
                  <tbody>
                    <tr>
                      <td className="py-1">Brand:</td>
                      <td className="py-1">{selectedProduct.brand}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Material:</td>
                      <td className="py-1">{selectedProduct.material}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Similar Products Section */}
          <div className="mt-20">
            <h2 className="text-2xl text-center font-medium mb-4 capitalize">
              You May Also Like
            </h2>
            <ProductGrid products={similarProducts} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
