import { FiChevronDown, FiSettings } from "react-icons/fi";
import Button from "./layouts/Button";
import { useState } from "react";

const ButtonGroup = ({ handleShowForm }) => {
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
          // onClick={showDropdown}
          role={"drop down"}
          primary
          icon
          primaryColor="blue-600"
          body={<FiChevronDown width="15px" height="15px" />}
        />
      </div>
      <Button
        // onClick={showSettingDropdown}
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
