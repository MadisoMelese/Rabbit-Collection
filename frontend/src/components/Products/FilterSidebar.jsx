import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });
  const [priceRange, setPriceRange] = useState([0, 100]);

  const categories = ["Top Wear", "Bottom Wear"];
  const colors = [
    "red",
    "blue",
    "black",
    "green",
    "yellow",
    "gray",
    "white",
    "pink",
    "beige",
    "navy",
  ];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = [
    "Cotton",
    "Wool",
    "Polyester",
    "Silk",
    "Linen",
    "Viscose",
    "Fleece",
    "Denim",
  ];
  const brands = [
    "Urban Threads",
    "Modern Fit",
    "Street Style",
    "Beach Breeze",
    "Fashionista",
    "ChicStyle",
  ];
  const genders = ["Men", "Women"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: Number(params.minPrice) || 0,
      maxPrice: Number(params.maxPrice) || 100,
    });
    setPriceRange([0, Number(params.maxPrice) || 100]);
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;

    let newFilters = { ...filters };
    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  // color change 
  const handleColorChange = (color) => {
    const newFilters = { ...filters };
  
    if (filters.color === color) {
      delete newFilters.color;
    } else {
      newFilters.color = color;
    }
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.set(key, newFilters[key].join(","));
      } else if (newFilters[key]) {
        params.set(key, newFilters[key]);
      }
    });

    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-gray-900 font-medium mb-2">Category</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={category}
                checked={filters.category === category}
                onChange={handleFilterChange}
                className="hidden peer"
              />
              <div className="w-5 h-5 border border-gray-300 rounded-full peer-checked:bg-blue-500 peer-checked:border-transparent transition-all"></div>
              <span className="text-gray-700">{category}</span>
            </label>
          </div>
        ))}
      </div>

      {/* Gender Filter */}
      <div className="mb-6">
        <label className="block text-gray-900 font-medium mb-2">Gender</label>
        {genders.map((gender) => (
          <div key={gender} className="flex items-center mb-1">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                value={gender}
                checked={filters.gender === gender}
                onChange={handleFilterChange}
                type="radio"
                name="gender"
                className="hidden peer"
              />
              <div className="w-5 h-5 border border-gray-300 rounded-full peer-checked:bg-blue-500 peer-checked:border-transparent transition-all"></div>
              <span className="text-gray-700">{gender}</span>
            </label>
          </div>
        ))}
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <label className="block text-gray-900 font-medium mb-2">Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${
                filters.color === color ? "ring-2 ring-blue-500" : ""
              }`}
              title={color}
              style={{ backgroundColor: color.toLowerCase() }}
              onClick={() => handleColorChange(color)}
            ></button>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className="mb-6">
        <label className="block text-gray-900 font-medium mb-2">Size</label>
        {sizes.map((size) => (
          <div key={size} className="flex items-center mb-1">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                value={size}
                checked={filters.size.includes(size)}
                onChange={handleFilterChange}
                name="size"
                type="checkbox"
                className="hidden peer"
              />
              <div className="w-5 h-5 border-2 border-gray-400 rounded-md peer-checked:bg-blue-500 peer-checked:border-transparent transition-all"></div>
              <span className="text-gray-700">{size}</span>
            </label>
          </div>
        ))}
      </div>

      {/* Material Filter */}
      <div className="mb-6">
        <label className="block text-gray-900 font-medium mb-2">Material</label>
        {materials.map((material) => (
          <div key={material} className="flex items-center mb-1">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                value={material}
                checked={filters.material.includes(material)}
                onChange={handleFilterChange}
                name="material"
                type="checkbox"
                className="hidden peer"
              />
              <div className="w-5 h-5 border-2 border-gray-400 rounded-md peer-checked:bg-blue-500 peer-checked:border-transparent transition-all"></div>
              <span className="text-gray-700">{material}</span>
            </label>
          </div>
        ))}
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <label className="block text-gray-900 font-medium mb-2">Brand</label>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-1">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                value={brand}
                checked={filters.brand.includes(brand)}
                onChange={handleFilterChange}
                name="brand"
                type="checkbox"
                className="hidden peer"
              />
              <div className="w-5 h-5 border-2 border-gray-400 rounded-md peer-checked:bg-blue-500 peer-checked:border-transparent transition-all"></div>
              <span className="text-gray-700">{brand}</span>
            </label>
          </div>
        ))}
      </div>

      {/* Price Filter */}
      <div className="mb-8">
        <label className="block text-gray-900 mb-2 font-medium">Price Range</label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            name="maxPrice"
            min={0}
            max={100}
            value={priceRange[1]}
            onChange={(e) => handleFilterChange(e)}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>
        <div className="flex justify-between text-gray-600 mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
