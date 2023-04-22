import Button from "../components/layouts/Button";
import { FiGrid, FiLayers, FiUser } from "react-icons/fi";

const Aside = () => {
  return (
    <aside className="flex flex-col justify-end items-center w-[9%]">
      <Button
        onClick={() => {}}
        role={"nav items"}
        primary
        icon
        primaryColor="blue-600"
        body={<FiGrid width="35px" height="35px" />}
      />
      <Button
        onClick={() => {}}
        role={"nav items"}
        primary
        icon
        primaryColor="blue-600"
        body={<FiLayers width="35px" height="35px" />}
      />
      <Button
        onClick={() => {}}
        role={"nav items"}
        primary
        icon
        primaryColor="blue-600"
        body={<FiUser width="35px" height="35px" />}
      />
    </aside>
  );
};

export default Aside;
