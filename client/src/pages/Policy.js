import React from "react";
import Layout from "../components/layout/layout";
function Policy() {
  return (
    <Layout>
      <div className="container">
        <h1 className="text-center mt-5 mb-4">Privacy Policy</h1>

        <h2>Information We Collect</h2>
        <p>
          Personal Information: When you register an account, make a purchase,
          or interact with our website, we may collect personal information such
          as your name, email address, phone number, and address.
        </p>
        <p>
          Payment Information: If you make a purchase through our platform, we
          may collect payment information such as credit card details or other
          payment methods.
        </p>
        <p>
          Usage Data: We may collect information about how you interact with our
          website, including your browsing history, IP address, device
          information, and location data.
        </p>

        <h2>How We Use Your Information</h2>
        <p>
          To provide and improve our services: We use the information you
          provide to deliver the products and services you request, personalize
          your experience, and enhance our website's functionality.
        </p>
        <p>
          To communicate with you: We may use your contact information to send
          you updates, promotions, and important notifications related to your
          account or transactions.
        </p>
      </div>
    </Layout>
  );
}

export default Policy;
