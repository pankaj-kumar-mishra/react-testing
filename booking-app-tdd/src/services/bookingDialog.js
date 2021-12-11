import { BehaviorSubject } from "rxjs";

const dialogEvt$ = new BehaviorSubject({ open: false, item: null });

const bookingDialog = {
  open: (item) => {
    console.log("Booking Dialog", item);
    dialogEvt$.next({ open: true, item });
  },
  close: () => {
    console.log("Close Dialog");
    dialogEvt$.next({ open: false, item: null });
  },
  dialogEvt$: dialogEvt$.asObservable(),
};

export default bookingDialog;
