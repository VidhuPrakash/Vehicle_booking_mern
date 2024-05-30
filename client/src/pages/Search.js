import React from "react";
import Layout from "../components/layout/layout";
import { useSearch } from "../context/search";
import { Button } from "react-bootstrap";

function Search() {
  const [values, setValues] = useSearch();
  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap m-4">
            {values?.results.map((v) => (
              <div className="card m-2" style={{ width: "18rem" }} key={v._id}>
                <img
                  src={`/api/v1/product/product-photo/${v._id}`}
                  className="card-img-top"
                  alt={v.name}
                />
                <div classname="card-body">
                  <h5 classname="card-title">{v.name}</h5>
                  <p classname="card-text">{v.description}</p>
                  <p classname="card-text">${v.price}</p>
                  <button className="btn btn-primary">See Details</button>
                  <button className="btn btn-secondary m-3">Add to cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Search;
