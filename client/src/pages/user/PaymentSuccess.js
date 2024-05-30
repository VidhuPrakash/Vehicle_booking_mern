import Layout from "../../components/layout/layout";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { GrStatusGood } from "react-icons/gr";

function PaymentSuccess() {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  return (
    <Layout>
      <div className="row">
        <div className="col-md-12 d-flex flex-column justify-content-center align-items-center">
          <div style={{ fontSize: "15em", color: "green" }}>
            <GrStatusGood />
          </div>
          <h1 className="text-centre">Payment Successful</h1>
          <p>Your payment was successful. Thank you!</p>
          <p>Click below to continue:</p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Continue
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default PaymentSuccess;
