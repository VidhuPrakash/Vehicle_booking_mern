import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Layout from "../../components/layout/layout";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function PaymentSuccess() {
  useEffect(() => {
    toast.success("Payment successfull!");
  }, []);
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [vehicles, setVehicles] = useState([]);
  // get vehicle
  const getAllVehicle = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product`);
      setVehicles(data.vehicles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllVehicle();
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-9">
          <h1 className="text-centre">All Vehicles</h1>
          <div className="d-flex flex-wrap">
            {vehicles?.map((v) => (
              <div className="card m-2" style={{ width: "18rem" }} key={v._id}>
                <img
                  src={`/api/v1/product/product-photo/${v._id}`}
                  className="card-img-top"
                  alt={v.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{v.name}</h5>
                  <p className="card-text">{v.description}</p>
                  <p classname="card-text">${v.price}</p>
                  <button
                    class="btn btn-primary"
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
export default PaymentSuccess;
