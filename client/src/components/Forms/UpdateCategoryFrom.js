import React from "react";

function UpdateCategoryFrom({ handleSubmit, value, setValue }) {
  const { updateManu, updateModel } = value;
  const { setUpdateManu, setUpdateModel } = setValue;
  console.log(value);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Enter Manufacture"
            value={updateManu}
            onChange={(e) => setUpdateManu(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Enter Model"
            value={updateModel}
            onChange={(e) => setUpdateModel(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default UpdateCategoryFrom;
