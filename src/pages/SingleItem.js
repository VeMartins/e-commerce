import React, { useEffect } from "react";
import { FaFacebook, FaPinterest } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useParams, Link } from "react-router-dom";

import { ErrorModal, ImageThumbnail, Loading, Price } from "../components";
import { useGlobalContext } from "../context/products-context";
import AddToCart from "../components/AddToCart";

import "./SingleItem.css";

const SingleItem = () => {
  const {
    fetchSingleProduct,
    clearSingleError,
    single_product_loading: loading,
    single_product: product,
    single_product_error: error,
    single_product_stock_error,
    closeTopbar,
  } = useGlobalContext();

  const { id } = useParams(); // will come as string so will need to use parseInt in backend to use the id because id is an integer in data.js

  useEffect(() => {
    fetchSingleProduct(`/api/product/${id}`);
  }, [fetchSingleProduct, id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <section>
        <ErrorModal
          header="Ooops! No item to display."
          onClear={clearSingleError}
          footer
          error={error}
          link={<Link to="/">Back to Home Page</Link>}
        />
      </section>
    );
  }

  const { title, desc, detail, stock } = product;

  return (
    <main className="main-singleItem-page" onMouseOver={closeTopbar}>
      {single_product_stock_error && (
        <ErrorModal
          header={`Sorry, not enough items or item is sold out `}
          onClear={clearSingleError}
          footer
          linkText={"Okay"}
        />
      )}
      <div className="back-results">
        <Link to="/products">
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
              <Price {...product} product={product} id={id} />
            </div>
            {stock > 0 && <AddToCart {...product} id={id} product={product} />}
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
