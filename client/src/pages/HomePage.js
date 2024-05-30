import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import "./style.css";

function HomePage() {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get vehicle
  const getAllVehicle = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product`);
      setVehicles(data.vehicles);
    } catch (error) {
      console.log(error);
    }
  };

  // filter category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    getAllCategory();
    if (!checked.length || !radio.length) getAllVehicle();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterVehicle();
  }, [checked, radio]);
  // get fillterd products
  const filterVehicle = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setVehicles(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row mt-0">
        <div
          className="col-md-2 mt-0 side-bg"
          style={{ height: "100vh", overflowY: "auto" }}
        >
          <h4 className="text-center">Filter By Manufacture</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => {
                  handleFilter(e.target.checked, c._id);
                }}
                className="mb-2"
              >
                {c.manufacture}
              </Checkbox>
            ))}
          </div>

          {/* Price Filter  */}
          <h4 className="text-center">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array} className="mb-2">
                    {p.name}
                  </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-10 main-bg">
          <div className="top-image">
            <img src="./car-stainless-logo-png.webp" className="fade-image" />

            <h1 className="main-heading">" WE GIVE TRUST TO OUR CUSTOMERS "</h1>
            <h4 className="sub-heading">
              World's largest used vehicle online seller
            </h4>
            <h4 className="title-heading">- VEHION -</h4>
          </div>

          <div className="dark-fade"></div>

          <h1 className="latest-deals-heading">LATEST DEAL</h1>
          <div className="d-flex flex-wrap justify-content-center">
            {vehicles?.map((v) => (
              <div className="card m-2" style={{ width: "18rem" }} key={v._id}>
                <img
                  src={`/api/v1/product/product-photo/${v._id}`}
                  className="card-img-top"
                  alt={v.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{v.name}</h5>
                  <p className="card-text">
                    {v.description.substring(0, 30)}...
                  </p>
                  <p className="card-text">${v.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => navigate(`/product/${v.slug}`)}
                  >
                    See Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
