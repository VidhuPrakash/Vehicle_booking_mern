import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import AdminMenu from "../../components/layout/AdminMenu";
const UpdateUser = () => {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPass] = useState("");

  // get user data
  useEffect(() => {
    console.log(auth?.user);
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
    console.log("address", address);
  }, [auth?.user]);

  //   form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        name: name,
        email: email,
        password: password,
        phone: phone,
        address: address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile updated succesfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  console.log(address);
  return (
    <Layout>
      <div className="container-fluid text-white">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit}>
              <h4 className="title">USER PROFILE</h4>
              <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  disabled
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  onChange={(e) => setPass(e.target.value)}
                  value={password}
                  type="password"
                  className="form-control"
                  id="password"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPhone" className="form-label">
                  Phone
                </label>
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  type="text"
                  className="form-control"
                  id="phone"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Address
                </label>
                <input
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  type="text"
                  className="form-control"
                  id="address"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </form>
            <div></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateUser;
