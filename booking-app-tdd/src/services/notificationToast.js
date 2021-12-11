import { BehaviorSubject } from "rxjs";

const notifyEvt$ = new BehaviorSubject({ open: false, message: null });

const notificationToast = {
  open: (message) => {
    console.log("Notification Opened");
    notifyEvt$.next({ open: true, message });
  },
  close: () => {
    console.log("Notification Closed");
    notifyEvt$.next({ open: false, message: null });
  },
  notifyEvt$: notifyEvt$.asObservable(),
};

export default notificationToast;
