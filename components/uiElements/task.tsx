import React from "react";
import { Checkbox } from "../ui/checkbox";

type Props = {
  taskName: string;
  key: string;
};

const Task = ({ taskName, key }: Props) => {
  return (
    <div className="flex items-center space-x-3 border-b py-2 w-full" key={key}>
      <Checkbox id="todo" />
      <label
        htmlFor="todo"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:cursor-pointer data-[state=checked]:line-through"
      >
        {taskName}
      </label>
    </div>
  );
};

export default Task;
