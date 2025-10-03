import toast from "react-hot-toast";
import { Info } from "lucide-react";
import React from "react";

export const toastInfo = (message: string) => {
  const infoIcon = React.createElement(Info, { size: 18, color: "#0369a1" });

  toast(message, {
    icon: infoIcon,
    style: {
      background: "#e0f2fe",
      color: "#0369a1",
      border: "1px solid #bae6fd",
      borderRadius: "8px",
    },
  });
};
