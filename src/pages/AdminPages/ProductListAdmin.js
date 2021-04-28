import React, { useEffect } from "react";

import { useHistory } from "react-router-dom";

import { useProductContext, useSigninContext } from "../../context";

import { Loading, ErrorModal, PageHeaderImage } from "../../components";
import { formatPrice } from "../../utils/helpers";

const ProductListAdmin = () => {
  const {
    products,
    loading,
    error,
    clearError,
    deleteProduct,
    createProduct,
    new_product,
    success_create_product,
    resetNewProduct,
    new_product_error,
    delete_error,
    success_delete_product,
    resetDeleteProduct,
  } = useProductContext();
  const { userInfo } = useSigninContext();

  const history = useHistory();

  useEffect(() => {
    if (success_create_product) {
      resetNewProduct();

      history.push(`/product/${new_product._id}/edit`);
    }
    if (success_delete_product) {
      resetDeleteProduct();
    }
  }, [
    new_product,
    history,
    success_create_product,
    resetNewProduct,
    success_delete_product,
    resetDeleteProduct,
  ]);

  return (
    <main>
      <PageHeaderImage title="List of Products" colorStyle />

      <section className="section-order-history">
        {loading && <Loading />}
        {error && (
          <ErrorModal
            error={error}
            onClear={clearError}
            footer
            header="Failed to load products, please try again later."
            linkText={"Okay"}
          />
        )}
        {new_product_error && (
          <ErrorModal
            error={new_product_error}
            onClear={clearError}
            footer
            header="Failed to create a new product."
            linkText={"Okay"}
          />
        )}
        {delete_error && (
          <ErrorModal
            error={delete_error}
            onClear={clearError}
            footer
            className="signin-error"
            header="Failed to delete product."
            linkText={"Okay"}
          />
        )}
        {/*success_delete_product && (
          <ErrorModal
            error="Product Deleted"
            className="signin-error"
            style={{ position: "initial" }}
          />
        )*/}

        <div className="table-wrapper">
          <div className="create-product-btn">
            <button
              type="button"
              className="btn btn-green-dark "
              onClick={() => createProduct(userInfo.token)}
            >
              Create Product
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>SALE</th>
                <th>CATEGORY</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                return (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td className="capitalize">{product.title}</td>
                    <td
                      className={`${
                        product.sale !== 0
                          ? "dinamic-size not-success"
                          : "success"
                      }`}
                    >
                      {formatPrice(product.price)}
                    </td>
                    <td className={`${product.sale !== 0 ? "success" : ""}`}>
                      {product.sale === 0
                        ? product.sale
                        : formatPrice(product.sale)}
                    </td>
                    <td className="capitalize">{product.category}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-transparent-green "
                        onClick={() =>
                          history.push(`/product/${product._id}/edit`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-transparent-red"
                        onClick={() =>
                          deleteProduct(product._id, userInfo.token)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};
export default ProductListAdmin;
