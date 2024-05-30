import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout";
import UserMenu from "../../components/layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  // get Orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  // cancel request
  const cancelOrder = async (orderId) => {
    try {
      // Send a PUT request to the server to cancel the order
      const response = await axios.put(`/api/v1/auth/orders/${orderId}/cancel`);

      // If the request was successful, update the orders state
      if (response.status === 200) {
        setOrders(
          orders.map((order) =>
            order._id === orderId ? { ...order, status: "Cancelled" } : order
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Vehicle</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">
                          <div
                            className="btn btn-danger"
                            onClick={() => cancelOrder(o._id)}
                          >
                            CANCEL
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.vehicle?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>
                          {o?.payment.stripeSessionId ? "Success" : "Failed"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    <div className="row card flex-row" key={o?.vehicle?._id}>
                      <div className="col-md-4">
                        <img
                          src={`/api/v1/product/product-photo/${o?.vehicle?.id}`}
                          className="card-img-top"
                          alt={o?.vehicle?.name}
                          width="100%"
                          height={"130px"}
                        />
                      </div>
                      <div className="col-md-4">
                        <p>{o?.vehicle?.name}</p>
                        <p>{o?.vehicle?.description}</p>
                        <p>Price : {o?.vehicle?.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
