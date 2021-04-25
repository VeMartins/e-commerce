import React from "react";

import { useHistory } from "react-router-dom";

import { useProductContext } from "../../context";
import { Loading, ErrorModal, PageHeaderImage } from "../../components";
import { formatPrice } from "../../utils/helpers";

const ProductListAdmin = () => {
  const {
    products,
    loading,
    error,
    clearError,
    deleteProduct,
  } = useProductContext();

  const history = useHistory();

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
        <div className="table-wrapper">
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
                        className="btn btn-green-dark "
                        onClick={() =>
                          history.pushState(`/product/${product._id}/edit`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-green-dark"
                        onClick={() => deleteProduct(product)}
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
