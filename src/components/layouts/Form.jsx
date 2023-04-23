import React from "react";

const Form = ({ showForm }) => {
  return (
    <form action="">
      <label htmlFor="TaskName">Name your task</label>
      <input type="text" name="TaskName" id="TaskName" />
    </form>
  );
};

export default Form;
