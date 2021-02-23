import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

//import data from "./data";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const { data } = await axios.get("/api/products");
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Something went wrong please try again.");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const clearError = () => {
    setError(null);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        loading,
        setProducts,
        error,
        setError,
        clearError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
