import toast from "react-hot-toast";
import Layout from "../components/layout/layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

function VehicleDetails() {
  const params = useParams();
  const [vehicles, setVehicles] = useState({});
  // initial details
  useEffect(() => {
    if (params?.slug) getVehicle();
  }, [params?.slug]);
  // get vehicle
  const getVehicle = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setVehicles(data?.vehicles);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  // payment checkout to stripe
  const checkout = async () => {
    try {
      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);

      const res = await axios.post("/api/v1/payment/checkout", {
        vehicle: {
          id: vehicles._id,
          name: vehicles.name,
          price: vehicles.price,
          category: vehicles.category,
        },
      });
      const session = await res.data;

      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (result.error) {
        console.log(result.error);
        toast.error("Something went wrong");
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="row container">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${vehicles._id}`}
            className="card-img-top"
            alt={vehicles.name}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Vehicle Details</h1>
          <h6>Name:{vehicles.name}</h6>
          <h6>Description:{vehicles.description}</h6>
          <h6>Price:{vehicles.price}</h6>
          <h6>
            Manufacture:{" "}
            {vehicles.category ? vehicles.category.manufacture : "N/A"}
          </h6>
          <button className="btn btn-secondary" onClick={checkout}>
            Book
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default VehicleDetails;
