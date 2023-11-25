import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "./../../components/layout/layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
function Vehicle() {
  const [vehicles, setVehicle] = useState([]);
  // getAll Vehicle
  const getAllVehicle = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setVehicle(data.vehicles);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  // lifecycle method
  useEffect(() => {
    getAllVehicle();
  }, []);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">Available Vehicle List</h1>
            <div className="d-flex flex-wrap">
              {vehicles?.map((v) => (
                <Link
                  className="product-link"
                  key={v._id}
                  to={`/dashboard/admin/product/${v.slug}`}
                >
                  <div
                    className="card m-2"
                    style={{ width: "18rem" }}
                    key={v._id}
                  >
                    <img
                      src={`/api/v1/product/product-photo/${v._id}`}
                      className="card-img-top"
                      alt={v.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{v.name}</h5>
                      <p className="card-text">{v.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Vehicle;
