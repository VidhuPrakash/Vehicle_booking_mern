import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/layout/AdminMenu.jsx";
import Layout from "../../components/layout/layout.jsx";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;
const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Process",
    "Shipped",
    "Deliverd",
    "Cancelled",
  ]);
  const [changestatus, setChangestatus] = useState();
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container-fluid text-text-white">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-8">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => {
              console.log(o.buyer);
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Vehicle</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Address</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(o._id, value)}
                            defaultValue={o?.status}
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{o?.vehicle?.name}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{o?.buyer?.address}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>
                          {o?.payment.stripeSessionId ? "Success" : "Failed"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    <div
                      className="row mb-2 p-3 card flex-row"
                      key={o?.vehicle?._id}
                    >
                      <div className="col-md-4">
                        <img
                          src={`/api/v1/product/product-photo/${o?.vehicle?.id}`}
                          className="card-img-top"
                          alt={o?.vehicle?.name}
                          width="100px"
                          height={"100px"}
                        />
                      </div>
                      <div className="col-md-8">
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

export default AdminOrders;
