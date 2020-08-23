import React from "react";
import useFormValidation from "../Auth/useFormValidation";
import validateCreateLink from "../Auth/validateCreateLink";
const INITIAL_STATE = {
  description: "",
  url: "",
};
function CreateLink(props) {
  const { handleSubmit, handleChange, values, errors } = useFormValidation(
    INITIAL_STATE,
    validateCreateLink,
    handleCreateLink
  );
  function handleCreateLink() {
    console.log("Link created!");
  }
  return (
    <form className="flex flex-column mt3" onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        value={values.description}
        className={errors.description && "error-input"}
        name="description"
        placeholder="A description for your link"
        autoComplete="off"
        type="text"
      />
      {errors.description && <p className="error-text">{errors.description}</p>}
      <input
        onChange={handleChange}
        value={values.url}
        className={errors.url && "error-input"}
        name="url"
        placeholder="The URL for your link"
        autoComplete="off"
        type="text"
      />
      {errors.url && <p className="error-text">{errors.url}</p>}
      <button className="button" type="submit">
        Submit
      </button>
    </form>
  );
}

export default CreateLink;
