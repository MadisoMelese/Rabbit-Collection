import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
// best seller product
const selectedProduct = {
  name: "Stylish Jacket",
  price: 12,
  originalPrice: 23,
  description: "This is a stylish jacket perfect for any occasion",
  brand: "FashionBrand",
  material: "Leather",
  sizes: ["S", "M", "L", "XL"],
  colors: ["Red", "black"],
  images: [
    {
      url: "https://picsum.photos/500/500?random=1",
      altText: "Stylish Jacket 1",
    },
    {
      url: "https://picsum.photos/500/500?random=2",
      altText: "Stylish Jacket 2",
    },
  ],
};
// you may also like product
const similarProducts = [
  {
    _id: 1,
    name: `Product 1`,
    price: 120,
    images: [{ url: "https://picsum.photos/500/500?random=1" }],
  },
  {
    _id: 2,
    name: `Product 2`,
    price: 220,
    images: [{ url: "https://picsum.photos/500/500?random=2" }],
  },
  {
    _id: 3,
    name: `Product 3`,
    price: 320,
    images: [{ url: "https://picsum.photos/500/500?random=3" }],
  },
  {
    _id: 4,
    name: `Product 4`,
    price: 420,
    images: [{ url: "https://picsum.photos/500/500?random=4" }],
  },
];

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isbtnDisabled, setIsbtnDisabled] = useState(false);

  const handleQuantity = (action) => {
    if (action === "minus" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (action === "plus") {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddtoCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select both size and color before add to the cart.", {
        duration: 1000,
      });
      return;
    }

    setIsbtnDisabled(true);

    setTimeout(() => {
      toast.success("Your order added to the cart!.", {
        duration: 1000,
      });
      setSelectedColor("");
      setSelectedSize("");
      setIsbtnDisabled(false);
    }, 500);
  };
  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* Left Thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                onClick={() => setMainImage(image.url)}
                className={`size-20 object-cover rounded-lg cursor-pointer border ${
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

          {/* Mobile Thumbnail */}
          <div className="md:hidden flex overscroll-x-auto space-x-4 mb-4">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                onClick={() => setMainImage(image.url)}
                className={`size-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url ? "border-black" : "border-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Right Thumbnail */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {selectedProduct.name}
            </h1>
            <p className="text-lg text-gray-600 mb-1 line-through">
              ${selectedProduct.originalPrice}
            </p>
            <p className="text-xl text-gray-500 mb-2 ">
              {selectedProduct.price && `$${selectedProduct.price}`}
            </p>
            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

            {/* color displayer */}
            <div className="mb-4">
              <p className="text-gray-700">Color: </p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`size-8 rounded-full border ${
                      color === selectedColor
                        ? "border-2 border-black"
                        : "border-gray-600"
                    }`}
                    style={{
                      backgroundColor: color.toLowerCase(),
                      filter: "brightness(0.5)",
                    }}
                  ></button>
                ))}
              </div>
            </div>

            {/* Size displayer */}
            <div className="mb-4">
              <p className="text-gray-700">Size: </p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    onClick={() => setSelectedSize(size)}
                    key={size}
                    className={`px-4 py-2 rounded border ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-gray-200"
                    } `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quanity displayer */}
            <div className="mb-6">
              <p className="text-gray-700">Quantity: </p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={() => handleQuantity("minus")}
                  className={`px-2 py-1 bg-gray-200 rounded text-lg`}
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

            {/* add goods to cart button */}
            <button
              disabled={isbtnDisabled}
              onClick={handleAddtoCart}
              className={`bg-black text-white py-1 px-6 rounded w-full mb-4 uppercase ${
                isbtnDisabled
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-gray-900"
              } `}
            >
              {isbtnDisabled ? "Adding.." : "Add to Cart"}
            </button>
            {/* characterstics: */}
            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Characteristics: </h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1">Brand</td>
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

        {/* you may also like contentts */}
        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-4 capitalize">
            you may Also Like
          </h2>
          <ProductGrid products={similarProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
