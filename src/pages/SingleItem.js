import React, { useState, useEffect } from "react";
import { FaFacebook, FaPinterest } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";

import ImageThumbnail from "../components/ImageThumbnail";
import Loading from "../components/Loading";
import Price from "../components/Price";
import data from "../data"; // if using an external api would need to fetch the data again

import "./SingleItem.css";

const SingleItem = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const { id } = useParams(); // will come as string so will need to use parseInt to use the id because id is an integer in data.js
  useEffect(() => {
    setLoading(true);
    const fetchSingleProduct = () => {
      try {
        if (data) {
          const newItem = data.find((item) => item.id === parseInt(id));

          setProduct(newItem);
          setLoading(false);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchSingleProduct();
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  if (!product) {
    return (
      <Link to="/" className="btn btn-backhome btn-details">
        No item to display, Go Back to Home Page!
      </Link>
    );
  }
  const { title, desc, detail } = product;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("button pressed");
  };

  return (
    <main className="main-singleItem-page">
      <section className=" main-detail-container">
        <ImageThumbnail {...product} />
        <div className="info-box">
          <div className="details-container">
            <h1>{title}</h1>
            <div className="price">
              <Price {...product} product={product} />
            </div>
            <form className="details-form" onSubmit={handleSubmit}>
              <div className="quantity">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  defaultValue="1"
                ></input>
              </div>
              <div className="add-cart">
                <button className="btn-details add-cart-btn" type="submit">
                  <span>Add to cart</span>
                </button>
              </div>
            </form>
          </div>
          <div className="box-style-look m-top-2">
            <h4 className="m-around">Product Description</h4>
            <p className="m-around">{desc}</p>
            <p className="m-around">{detail}</p>
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
