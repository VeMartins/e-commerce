import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import {
  Loading,
  ErrorModal,
  PageHeaderImage,
  ConfirmationBox,
} from "../../components";
import { useOrderContext } from "../../context";
import { formatPrice } from "../../utils/helpers";

const OrdersList = () => {
  const [showConfirmBox, setConfirmBox] = useState(false);
  const [orderId, setOrderId] = useState("");
  const {
    adminOrderList,
    getAdminOrdersList,
    loading,
    error,
    deleteOrder,
    success: success_delete,
    adminOrderReset,
  } = useOrderContext();
  const history = useHistory();

  const deleteHandler = (order) => {
    setConfirmBox(true);
    setOrderId(order._id);
  };
  const deleteOrderHandler = () => {
    deleteOrder(orderId);
    setConfirmBox(false);
  };

  useEffect(() => {
    setOrderId("");
    adminOrderReset();

    getAdminOrdersList();
  }, [getAdminOrdersList, success_delete, adminOrderReset]);

  return (
    <main>
      <PageHeaderImage title="List of orders" colorStyle />

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
                    <th>NAME</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAYMENT</th>
                    <th>DELIVERY</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {adminOrderList.map((order) => {
                    return (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.user.name}</td>
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
                          <button
                            type="button"
                            className="btn btn-transparent-red"
                            onClick={() => deleteHandler(order)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {showConfirmBox && (
                <ConfirmationBox
                  handleBox={() => setConfirmBox(false)}
                  handleDelete={() => deleteOrderHandler()}
                />
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default OrdersList;
