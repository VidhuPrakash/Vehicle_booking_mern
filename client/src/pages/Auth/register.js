import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";
import "./style.css";

function Register() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Address, setAddress] = useState("");
  const [Password, setPass] = useState("");

  const Navigate = useNavigate();

  //   form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/auth/register", {
        name: Name,
        email: Email,
        password: Password,
        phone: Phone,
        address: Address,
      });
      if (response && response.data.success) {
        toast.success(response.data.message);
        Navigate("/login");
        toast.success(`Register successfully`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout>
      <div className="register log-main-bg">
        <form onSubmit={handleSubmit} className="register">
          <h1 className="text-white mb-5">SIGN UP</h1>

          <div className="mb-3">
            <label
              htmlFor="exampleInputName"
              className="form-label custom-label"
            >
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label custom-label"
            >
              Email address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label custom-label"
            >
              Password
            </label>
            <input
              onChange={(e) => setPass(e.target.value)}
              value={Password}
              type="password"
              className="form-control"
              id="password"
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPhone"
              className="form-label custom-label"
            >
              Phone
            </label>
            <input
              onChange={(e) => setPhone(e.target.value)}
              value={Phone}
              type="text"
              className="form-control"
              id="phone"
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label custom-label"
            >
              Address
            </label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              value={Address}
              type="text"
              className="form-control"
              id="address"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Register;
