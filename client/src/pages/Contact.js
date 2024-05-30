import React from "react";
import Layout from "../components/layout/layout";

function Contact() {
  return (
    <Layout>
      <div className="container">
        <h1 className="text-center mt-5 mb-4">Contact Us</h1>

        <div className="row">
          <div className="col-md-6">
            <h2>Our Office</h2>
            <p>XYZ Street</p>
            <p>XYZ, XYZ, XYZ</p>
            <p>XYZ</p>
          </div>
          <div className="col-md-6">
            <h2>Contact Information</h2>
            <p>Email: vidhu0dev@example.com</p>
            <p>Phone: +1 123-456-7890</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <h2>Send Us a Message</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input type="text" className="form-control" id="name" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input type="email" className="form-control" id="email" />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="5"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
