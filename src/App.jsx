import { useState } from "react";
import Form from "./components/layouts/Form";
import ButtonGroup from "./components/ButtonGroup";
import Aside from "./components/Aside";
import Modal from "./components/Modal";
import MenuItems from "./components/layouts/MenuItems";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toogleDropdown, setToogleDropdown] = useState(false);
  const [toogleSetting, setToogleSetting] = useState(false);

  // console.log(showForm, toogleDropdown, toogleSetting);
  return (
    <section className="flex flex-row justify-between w-[95vw] h-[90vh] border-[1.5px] rounded-md px-2.5 py-0.5">
      <main
        className="flex flex-col justify-between w-[90%] h-full px-1 py-[2%]  text-black rounded-sm relative"
        onClick={() => {}}
      >
        <section className="flex flex-row justify-between">
          <div className="font-black text-3xl text-indigo-800">My Work</div>
          <ButtonGroup
            setShowForm={setShowForm}
            setToogleDropdown={setToogleDropdown}
            setToogleSetting={setToogleSetting}
          />
        </section>
        <section className="w-max h-max border-red-50 border-2">
          {(toogleDropdown || toogleSetting) && (
            <Modal mini body={<MenuItems />} />
          )}
          {showForm && <Modal body={<Form />} />}
        </section>
      </main>
      <Aside />
    </section>
  );
}

export default App;
