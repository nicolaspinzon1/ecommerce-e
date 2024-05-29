import React, { useState, useEffect } from "react";
import ProductItem from "../components/ProductItem";
import ProductDetails from "../components/ProductDetails"; 
import { Dialog } from "@headlessui/react";

export default function Search() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); 

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [showProductDetails, setShowProductDetails] = useState(false); // Estado para mostrar el detalle del producto
  const [cart, setCart] = useState([]); 

  // para agregar un producto al carrito
  const addToCart = (product) => {
    console.log("Agregando al carrito:", product);

    if (product) {
      
      setCart([...cart, product]);

      // Guarda el estado del carrito en el localStorage
      localStorage.setItem("cart", JSON.stringify([...cart, product]));

      console.log("Producto agregado al carrito:", product);
      console.log("Estado actual del carrito:", cart);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://render-ecommerce-ki8y.onrender.com/products/"
        );
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://render-ecommerce-ki8y.onrender.com/categories/all/"
        );
        if (!response.ok) {
          throw new Error("Error al obtener las categorías");
        }
        const data = await response.json();
        console.log(data); 
        setCategories(data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Resetear a la primera página al buscar
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product); 
    setShowProductDetails(true); 
  };

  const handleCloseProductDetails = () => {
    setShowProductDetails(false);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.Product_name && // Verifica si Product_name está definido y no es null ni undefined
      product.Product_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "" || product.SubCategory === parseInt(selectedCategory))
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Productos
        </h2>

        <div className="mt-4 w-full gap-x-3 flex flex-row">
          <div className="flex min-w-[810px]">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Buscar productos..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex">
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Todas las categorías</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.Category_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading && <p>Cargando productos...</p>}
        {error && <p>Error: {error}</p>}

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {currentProducts.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onClick={() => handleProductClick(product)}
            />
          ))}
        </div>

        {/* Paginación */}
        <div className="mt-4 flex justify-center">
          {Array.from(
            { length: Math.ceil(filteredProducts.length / productsPerPage) },
            (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`mx-1 px-4 py-2 border rounded ${
                  currentPage === i + 1
                    ? "bg-gray-800 text-white"
                    : "border-gray-400"
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>

      {/* Mostrar el detalle del producto seleccionado en un modal */}
      {showProductDetails && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => setShowProductDetails(false)}
            >
              &times;
            </span>
            <ProductDetails
              product={selectedProduct}
              onClose={() => setShowProductDetails(false)}
              onAddToCart={addToCart}
            />
          </div>
        </div>
      )}
    </div>
  );
}