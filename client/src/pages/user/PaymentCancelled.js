import React from "react";
import Layout from "../../components/layout/layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { FcCancel } from "react-icons/fc";
import "./styles.css";

const PaymentCancelled = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  return (
    <Layout>
      <div className="row">
        <div className="col-md-12 d-flex flex-column justify-content-center align-items-center">
          <div style={{ fontSize: "15em" }}>
            <FcCancel />
          </div>
          <h1 className="text-center">Payment Cancelled</h1>
          <p>Your payment was cancelled.</p>
          <p>If you would like to try again, you can do so below:</p>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/checkout")} // Assuming you have a checkout page
          >
            Retry Payment
          </button>
          <p> or </p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Go back
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentCancelled;
