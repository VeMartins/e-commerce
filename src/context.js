import React, { useContext, useState, useEffect } from "react";
import data from "./data";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(data);

  const fetchProducts = () => {
    setLoading(true);

    try {
      if (products) {
        const newProducts = products.map((item) => {
          const { id, title, category, price, img, desc } = item;
          return { id, title, category, price, img, desc };
        });
        setProducts(newProducts);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <AppContext.Provider
      value={{
        products,
        loading,
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
