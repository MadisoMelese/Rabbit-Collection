import { useState } from "react";
import FormInput from "./FormInput";

const EditProductPage = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [
      {
        url: "https://picsum.photos/500/500?random=1",
        altText: "Stylish Jackect",
      },
      {
        url: "https://picsum.photos/500/500?random=2",
        altText: "Stylish Jackect",
      },
      {
        url: "https://picsum.photos/500/500?random=3",
        altText: "Stylish Jackect",
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e)=>{
    const file = e.taget.files[0]
    console.log(file)
  }
  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>

      {/* form */}
      <form>
        {/* name */}
        <FormInput
          label="Product Name"
          name="name"
          value={productData.name}
          onChange={handleChange}
          type="text"
        />

        {/* Description */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>
          <textArea
            name="description"
            value={productData.description}
            rows={4}
            required
            className="w-full p-2 border rounded"
          ></textArea>
        </div>

           {/* Price range */}
           <FormInput
          label="Price"
          name="price"
          value={productData.price}
          onChange={handleChange}
          type="number"
        />

           {/*count is stock */}
           <FormInput
          label="count in Stock"
          name="countInStock"
          value={productData.countInStock}
          onChange={handleChange}
          type="number"
        />

           {/*SKU */}
           <FormInput
          label="sku"
          name="sku"
          value={productData.sku}
          onChange={handleChange}
          type="text"
        />

           {/*sizes */}
           <FormInput
          label="Sizes (separeted-by-comma)"
          name="sizes"
          value={productData.sizes.join(", ")}
          onChange={(e)=>setProductData({
            ...productData,
            sizes: e.target.value.split(",").map((size)=>size.trim()),
          })}
          type="text"
        />

           {/*Colors */}
           <FormInput
          label="Colors - (separeted-by-comma)"
          name="colors"
          value={productData.colors.join(", ")}
          onChange={(e)=>setProductData({
            ...productData,
            colors: e.target.value.split(",").map((color)=>color.trim()),
          })}
          type="text"
        />

      {/*Image upload  */}
      <FormInput
          label="Upload Image"
          name="images"
          value={productData.images.url}
          onChange={handleImageUpload}
          type="file"
        />
      </form>
    </div>
  );
};

export default EditProductPage;
