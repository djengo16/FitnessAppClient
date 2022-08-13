import { useState } from "react";

const useToast = () => {
  const initialConfig = {
    message: "",
    severity: "",
  };
  const [open, setOpen] = useState(false);
  const [toastConfig, setToastConfig] = useState(initialConfig);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setToastConfig(initialConfig);
  };
  return {
    open,
    handleOpen,
    handleClose,
    toastConfig,
    setToastConfig,
  };
};
export default useToast;
