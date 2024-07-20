import { CircleCheckBig, List } from "lucide-react";
import React from "react";

export default function TotalTodos({ totalTodos }: { totalTodos: number }) {
  return (
    <div className="flex items-center gap-1 border-b-2 p-2 border-gray-100  text-sm text-foreground/80">
      <>
        <List />
        <span>+ {totalTodos}</span>
        {totalTodos > 0 ? (
          <span className="capitalize">Tasks left</span>
        ) : (
          <span className="capitalize">No Todos</span>
        )}
      </>
    </div>
  );
}
