import React from "react";

function CategoryForm({ handleSubmit, value, setValue }) {
  const { manufacture } = value;
  const { setManufacture } = setValue;
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Enter Manufacture"
            value={manufacture}
            onChange={(e) => setManufacture(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default CategoryForm;
