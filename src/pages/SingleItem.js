import React, { useState, useEffect } from "react";
import "./SingleItem.css";
import Loading from "../components/Loading";
import data from "../data"; // if using an external api would need to fetch the data again
import { useParams } from "react-router-dom";
import { FaFacebook, FaPinterest } from "react-icons/fa";

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
    return <h2>no item to display</h2>;
  }
  const { title, price, img, desc, detail, thumbnail1, thumbnail2 } = product;

  return (
    <main>
      <section className="page-width main-detail-container">
        <div className="pic-container">
          <div>
            <div>
              <img src={`.${img}`} alt={title} className="detail-photo" />
            </div>
          </div>
          <div className="see-more-photos">
            <ul className="photos-list">
              <li>
                <img src={`.${thumbnail1}`} alt={`thumbnail1 ${title}`} />
              </li>
              <li>
                other photo<p>link to another photo</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="info-box">
          <div className="details-container">
            <h1>{title}</h1>
            <div className="price">
              <dl className="price-container">
                <div className="price">
                  <dt>
                    <span className="hidden">Regular price</span>
                  </dt>
                  <dd>
                    <span> {price} €</span>
                  </dd>
                </div>
                <div className="price sale hidden">
                  <dt>
                    <span>Sale Price</span>
                  </dt>
                  <dd>
                    <span>{price}</span>
                  </dd>
                </div>
              </dl>
            </div>
            <form className="details-form">
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
                <button className="btn-details add-cart-btn">
                  <span>Add to cart</span>
                </button>
              </div>
            </form>
          </div>
          <div className="description-container">
            <p>{desc}</p>
            <p>{detail}</p>
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
