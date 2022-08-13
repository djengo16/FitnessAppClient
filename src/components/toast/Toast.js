import React, { forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ReactDOM from "react-dom";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} {...props} />;
});
const portalElement = document.getElementById("alerts");

const Toast = ({
  open,
  onClose,
  severity,
  message,
  vertical = "top",
  horizontal = "right",
}) => {
  return ReactDOM.createPortal(
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      onClose={onClose}
      open={open}
      autoHideDuration={4000}
      //action={action}
    >
      <Alert severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>,
    portalElement
  );
};

export default Toast;
