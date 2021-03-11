import React, { useState, useEffect, useRef } from "react";
import { FaFacebook, FaPinterest } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import { ErrorModal, ImageThumbnail, Loading, Price } from "../components";

import { useGlobalContext } from "../context/context";

import "./SingleItem.css";

const SingleItem = () => {
  const quantityRef = useRef(null);

  const {
    addToCart,
    getTotal,
    hasError,
    clearError,
    error,
    closeTopbar,
  } = useGlobalContext();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  const { id } = useParams(); // will come as string so will need to use parseInt to use the id because id is an integer in data.js

  useEffect(() => {
    const source = axios.CancelToken.source(); //cleanup
    setLoading(true);
    const fetchSingleProduct = async () => {
      try {
        const { data } = await axios.get("/api/products", {
          cancelToken: source.token, //cleanup
        });
        const item = await data.find((item) => item.id === parseInt(id));
        setProduct(item);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
          setProduct(null);
          setLoading(false);
          throw error;
        }
      }
    };
    fetchSingleProduct();
    return () => {
      source.cancel(); //cleanup
    };
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return (
      <section>
        <ErrorModal
          header="Ooops! No item to display."
          onClear={clearError}
          error={error}
          link={<Link to="/">Back to Home Page</Link>}
        />
      </section>
    );
  }

  const { title, desc, detail, stock } = product;

  const handleSubmit = (e) => {
    e.preventDefault();
    const quantity = parseInt(quantityRef.current.value);
    if (stock < quantity || stock === 0) {
      return hasError(true);
    } else {
      addToCart(product, quantity);
      getTotal();
    }
  };

  return (
    <main className="main-singleItem-page" onMouseOver={closeTopbar}>
      {error && (
        <ErrorModal
          header={`Sorry, only ${stock} item(s) in stock `}
          onClear={clearError}
          linkText={"Okay"}
        />
      )}
      <div className="back-results">
        <Link to="/">
          {" "}
          <MdKeyboardArrowLeft /> Back to results
        </Link>
      </div>

      <section className=" main-detail-container">
        <ImageThumbnail {...product} />
        <div className="info-box">
          <div className="details-container">
            <h1>{title}</h1>
            <div className="price">
              <Price {...product} product={product} />
            </div>
            {stock > 0 && (
              <form className="details-form" onSubmit={handleSubmit}>
                <div className="quantity">
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    ref={quantityRef}
                    type="number"
                    id="quantity"
                    min="1"
                    defaultValue="1"
                  ></input>
                </div>
                <div className="add-cart">
                  <button
                    className="btn-details add-cart-btn"
                    type="submit"
                    disabled={stock <= 0 ? "disabled" : ""}
                  >
                    <span>Add to cart</span>
                  </button>
                </div>
              </form>
            )}
          </div>
          <div className="box-style-look description">
            <h4 className="description__title">Product Description</h4>
            <p className="description__description">{desc}</p>
            <p className="description__detail">{detail}</p>
          </div>
          <ul className="social-container">
            <li>
              <a href="http://" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <span>Share It</span>
            </li>
            <li>
              <a href="http://" target="_blank" rel="noopener noreferrer">
                <FaPinterest />
              </a>
              <span>Pin It</span>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default SingleItem;
