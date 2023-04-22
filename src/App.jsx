import { useState } from "react";
import Form from "./components/Form";
import ButtonGroup from "./components/ButtonGroup";
import Aside from "./components/Aside";

function App() {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = (e) => {
    e.preventDefault();
    setShowForm((showForm) => !showForm);
  };
  return (
    <section className="flex flex-row justify-between w-[95vw] h-[90vh] border-[1.5px] rounded-md px-2.5 py-0.5">
      <main
        className="flex flex-col justify-between w-[90%] h-max px-1 py-[2%]  text-black rounded-sm"
        onClick={() => {}}
      >
        <section className="flex flex-row justify-between">
          <div className="font-black text-3xl text-indigo-800">My Work</div>
          <ButtonGroup handleShowForm={handleShowForm} />
        </section>

        <Form showForm={showForm} />
      </main>
      <Aside />
    </section>
  );
}

export default App;
