import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

import { useOrderContext } from "../context";
import { Loading, ErrorModal, PageHeaderImage } from "../components";
import { formatPrice } from "../utils/helpers";

const OrderHistory = () => {
  const { orderList, loading, error, getUserOrderList } = useOrderContext();
  const history = useHistory();

  useEffect(() => {
    getUserOrderList();
  }, [getUserOrderList]);

  return (
    <main>
      <PageHeaderImage
        title="Order History"
        link={<Link to="/">Home / </Link>}
        colorStyle
      />

      <section className="section-order-history">
        <div>
          {loading && <Loading />}
          {error && (
            <ErrorModal
              error={error}
              className="signin-error"
              style={{ position: "initial" }}
            />
          )}
          {!error && !loading && (
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAYMENT</th>
                    <th>DELIVERY</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {orderList.map((order) => {
                    return (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{formatPrice(order.totalPrice)}</td>
                        <td
                          className={`${
                            order.isPaid ? "success" : "not-success"
                          }`}
                        >
                          {order.isPaid
                            ? order.paidAt.substring(0, 10)
                            : "Not Paid"}
                        </td>
                        <td
                          className={`${
                            order.isDelivered ? "success" : "not-success"
                          }`}
                        >
                          {order.isDelivered
                            ? order.deliveredAt.substring(0, 10)
                            : "Not Delivered"}
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-green-dark"
                            onClick={() => history.push(`/order/${order._id}`)}
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
export default OrderHistory;
