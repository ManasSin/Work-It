import { FiChevronDown, FiSettings } from "react-icons/fi";
import Button from "./layouts/Button";
import { useState } from "react";
import Modal from "./Modal";

const ButtonGroup = ({ setShowForm, setToogleDropdown, setToogleSetting }) => {
  const handleShowForm = (e) => {
    e.preventDefault();
    setShowForm((showForm) => !showForm);
  };

  const toogleDropdown = (e) => {
    e.preventDefault();
    setToogleDropdown((toogleDropdown) => !toogleDropdown);
  };

  const toogleSetting = (e) => {
    e.preventDefault();
    setToogleSetting((toogleSetting) => !toogleSetting);
  };

  return (
    <section className="flex flex-row w-[50%] sm:w-[45%] lg:w-[30%] 2xl:w-[20%] justify-self-end">
      <div className="flex gap-[1px] pr-3 grow" aria-label="button groups">
        <Button
          onClick={handleShowForm}
          role={"showModal"}
          primary
          primaryColor="blue-600"
          body="Add a note"
        />
        <Button
          onClick={toogleDropdown}
          role={"drop down"}
          primary
          icon
          primaryColor="blue-600"
          body={<FiChevronDown width="15px" height="15px" />}
        />
      </div>
      <Button
        onClick={toogleSetting}
        role={"setting toogle"}
        ghost
        icon
        primaryColor="blue-600"
        body={<FiSettings width="15px" height="15px" />}
      />
    </section>
  );
};

export default ButtonGroup;
