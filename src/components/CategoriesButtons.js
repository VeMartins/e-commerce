import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";

import CategoriesSelect from "../components/CategoriesSelect";
import { useFilterContext } from "../context/filter-context";
import "../components/CategoriesButtons.css";

const CategoriesButtons = ({ categories, styleProductsPage: styles }) => {
  const [size, setSize] = useState(window.innerWidth);
  const {
    updateFilter,
    showMenu,
    closeMenu,
    toggleMenu,
    filters: { category },
  } = useFilterContext();

  const updateSize = () => {
    setSize(window.innerWidth);
  };
  useEffect(() => {
    window.onresize = updateSize;
  }, []);

  if (styles && size <= 450) {
    return <CategoriesSelect categories={categories} />;
  }

  return (
    <section className="categories-main_section">
      <div className={`${styles ? "" : "menu-center"} `}>
        {!styles && (
          <div className="menu-header">
            <button type="button" onClick={toggleMenu} className="menu-toggle">
              Menu {showMenu && <RiArrowUpSFill />}
              {!showMenu && <RiArrowDownSFill />}
            </button>
          </div>
        )}

        <div
          className={`${
            styles
              ? ""
              : showMenu
              ? "btn-categories_container_show"
              : "btn-categories_container"
          }`}
        >
          <div className={`${styles ? "products-categories" : "menu-links"} `}>
            {categories.map((catg, index) => {
              return (
                <button
                  key={index}
                  name="filterButton"
                  type="button"
                  onClick={() => {
                    updateFilter(catg);
                  }}
                  className={`${
                    styles ? "btn-categories-products" : "btn-categories"
                  } ${category === catg.toLowerCase() ? "active" : null}`}
                >
                  <Link
                    to="/products"
                    key={index}
                    onClick={closeMenu}
                    className={`${
                      styles ? "categories-link-products" : "categories-link"
                    } `}
                  >
                    {catg}
                  </Link>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesButtons;
