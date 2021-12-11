import React, { useState, useEffect } from "react";
import { Snackbar } from "@material-ui/core";
import notificationToast from "../services/notificationToast";

const Notification = () => {
  const [notification, setNotification] = useState({
    open: false,
    message: null,
  });

  useEffect(() => {
    const notifySubscription = notificationToast.notifyEvt$.subscribe((state) =>
      setNotification(state)
    );
    return () => {
      notifySubscription.unsubscribe();
    };
  }, []);

  return (
    <Snackbar
      open={notification.open}
      onClose={() => notificationToast.close()}
      message={notification.message}
      autoHideDuration={3000}
    />
  );
};

export default Notification;
