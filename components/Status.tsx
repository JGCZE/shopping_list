import { TStatus } from "@/lib/types";
import { clsx } from "clsx";
import React from "react";

const Status = ({ status }: { status: TStatus }) => {
  const { status: currentStatus, message } = status

  return (
    <div className="h-10">
      {message && (
        <p className={clsx({
          "text-red-500": currentStatus === "error",
          "text-green-500": currentStatus === "success",
        })}
      >
        {message}
      </p>
    )}
  </div>
)}

export default Status;
