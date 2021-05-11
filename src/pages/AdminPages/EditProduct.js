import axios from "axios";
import React, { useState, useEffect } from "react";

import { useParams, useHistory } from "react-router-dom";
import { ErrorModal, Loading, PageHeaderImage } from "../../components";
import { useProductContext, useSigninContext } from "../../context";

const EditProduct = () => {
  const { id } = useParams();
  const { userInfo } = useSigninContext();
  const history = useHistory();

  const {
    loading: loading_product_update,
    error: error_product_update,
    clearSingleError,
    updateProduct,
    success: success_product_update,
    resetUpdatedProduct,
    products,
    success: success_create_product,
  } = useProductContext();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [sale, setSale] = useState("");
  const [img, setImg] = useState("");
  const [thumbnail1, setThumbnail1] = useState("");
  const [thumbnail2, setThumbnail2] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [stock, setStock] = useState("");
  const [detail, setDetail] = useState("");
  const [featured, setFeatured] = useState("");

  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [updatedMessage, setUpdatedMessage] = useState("");

  useEffect(() => {
    const product = products.find((product) => product._id === id);

    if (success_product_update) {
      setUpdatedMessage("Product Updated");

      const timer = setTimeout(() => {
        resetUpdatedProduct();
        setUpdatedMessage("");
        history.push("/productlist");
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
      setSale(product.sale);
      setImg(product.img);
      setThumbnail1(product.img);
      setThumbnail2(product.thumbnail2);
      setCategory(product.category);
      setSubCategory(product.sub_category);
      setStock(product.stock);
      setDetail(product.detail);
      setFeatured(product.featured);
    } else {
      setErrorMessage("Could not find product");
    }
  }, [
    id,
    history,
    success_product_update,
    resetUpdatedProduct,
    products,
    success_create_product,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct(
      {
        _id: id,
        title,
        img,
        thumbnail1,
        thumbnail2,
        detail,
        category,
        sub_category: subCategory,
        price,
        sale,
        stock,
        featured,
      },
      userInfo.token
    );
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setUploadLoading(true);
    try {
      const { data } = await axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImg(data);
      setUploadLoading(false);
    } catch (error) {
      setUploadError(error.message);
      setUploadLoading(false);
    }
  };
  const uploadThumbHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setUploadLoading(true);
    try {
      const { data } = await axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setThumbnail2(data);
      setUploadLoading(false);
    } catch (error) {
      setUploadError(error.message);
      setUploadLoading(false);
    }
  };

  const clearError = () => {
    clearSingleError();

    setErrorMessage("");
  };
  return (
    <main>
      <PageHeaderImage colorStyle title="Edit Product" />
      <section className="section-contact">
        {loading_product_update && <Loading />}
        {(error_product_update || errorMessage) && (
          <ErrorModal
            error={error_product_update || errorMessage}
            className="signin-error"
            onClear={() => clearError()}
            footer
            linkText={"Okay"}
            style={{ position: "initial" }}
          />
        )}
        {updatedMessage && (
          <ErrorModal
            style={{ position: "initial" }}
            header={updatedMessage}
            className="success"
          />
        )}
        <div className="register">
          <div className=" box-style-look register-form">
            <form onSubmit={handleSubmit} className="signin-form ">
              <div className="login-input-card">
                <label htmlFor="name">Name: </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Product Name"
                  className="form-inputs"
                  defaultValue={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="login-input-card">
                <label htmlFor="image">Image: </label>
                <input
                  type="text"
                  id="image"
                  placeholder="Product Image"
                  className="form-inputs"
                  defaultValue={img}
                  onChange={(e) => setImg(e.target.value)}
                />
              </div>
              <div className="login-input-card">
                <label htmlFor="thumb1">Thumbnail left: </label>
                <input
                  type="text"
                  id="thumb1"
                  placeholder="Product thumbnail1"
                  className="form-inputs"
                  defaultValue={thumbnail1}
                  onChange={(e) => setThumbnail1(e.target.value)}
                />
              </div>
              <div className="login-input-card">
                <label htmlFor="imageFile">
                  Choose main image and left thumb:
                </label>
                <input
                  className="form-inputs image-upload"
                  type="file"
                  id="imageFile"
                  label="Choose Image"
                  onChange={uploadFileHandler}
                />
                {uploadLoading && <Loading />}
                {uploadError && (
                  <ErrorModal
                    error={uploadError}
                    className="signin-error"
                    style={{ position: "initial" }}
                    onClear={() => setUploadError("")}
                    linkText={"Okay"}
                    footer
                  />
                )}
              </div>

              <div className="login-input-card">
                <label htmlFor="thumb2">Thumbnail right: </label>
                <input
                  type="text"
                  id="thumb2"
                  placeholder="Product thumbnail2"
                  className="form-inputs"
                  defaultValue={thumbnail2}
                  onChange={(e) => setThumbnail2(e.target.value)}
                />
              </div>
              <div className="login-input-card">
                <label htmlFor="thumbnailImageFile">
                  Choose Right Thumbnail:
                </label>
                <input
                  className="form-inputs image-upload"
                  type="file"
                  id="thumbnailImageFile"
                  label="Choose Thumbnail"
                  onChange={uploadThumbHandler}
                />
                {uploadLoading && <Loading />}
                {uploadError && (
                  <ErrorModal
                    error={uploadError}
                    className="signin-error"
                    style={{ position: "initial" }}
                    onClear={() => {
                      setUploadError("");
                    }}
                    linkText={"Okay"}
                    footer
                  />
                )}
              </div>
              <div className="login-input-card">
                <label htmlFor="detail">Product Description: </label>
                <textarea
                  type="text"
                  rows="3"
                  id="detail"
                  placeholder="Product details"
                  className="form-inputs"
                  defaultValue={detail}
                  onChange={(e) => setDetail(e.target.value)}
                />
              </div>
              <div className="login-input-card">
                <label htmlFor="category">Product Category: </label>
                <input
                  type="text"
                  id="category"
                  placeholder="Product category"
                  className="form-inputs"
                  defaultValue={category}
                  onChange={(e) => setCategory(e.target.value.toLowerCase())}
                />
              </div>
              <div className="login-input-card">
                <label htmlFor="subCategory">Product Sub-Category: </label>
                <input
                  type="text"
                  id="subCategory"
                  placeholder="Product sub-category"
                  className="form-inputs"
                  defaultValue={subCategory}
                  onChange={(e) => setSubCategory(e.target.value.toLowerCase())}
                />
              </div>
              <div className="login-input-card">
                <label htmlFor="price">Product Price: </label>
                <input
                  type="text"
                  id="price"
                  placeholder="Product price in cents ---> 100 cents = 1 euro"
                  className="form-inputs"
                  defaultValue={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="login-input-card">
                <label htmlFor="sale">Product Sale: </label>
                <input
                  type="text"
                  id="sale"
                  placeholder="If product not on sale set it to 0, sale in cents"
                  className="form-inputs"
                  defaultValue={sale}
                  onChange={(e) => setSale(e.target.value)}
                />
              </div>
              <div className="login-input-card">
                <label htmlFor="stock">Product Stock: </label>
                <input
                  type="text"
                  id="stock"
                  placeholder="Product stock"
                  className="form-inputs"
                  defaultValue={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div className="login-input-card">
                <label htmlFor="not-featured" className="radio-label">
                  Not Featured :{" "}
                </label>
                <input
                  type="radio"
                  id="not-featured"
                  className="radio-input"
                  defaultValue={false}
                  name="IsFeatured"
                  onChange={(e) => setFeatured(e.target.value)}
                />
              </div>
              <div className="login-input-card">
                <label htmlFor="featured" className="radio-label">
                  Featured :
                </label>
                <input
                  type="radio"
                  className="radio-input"
                  id="featured"
                  value={true}
                  name="IsFeatured"
                  onChange={(e) => setFeatured(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn-green-dark btn-center btn btn-order"
              >
                Update Product
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EditProduct;
