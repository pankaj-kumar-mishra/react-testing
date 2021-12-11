import React, { useState, useEffect } from "react";
import moment from "moment";
import apiClient from "../services/apiClient";
import bookingDialog from "../services/bookingDialog";
import notificationToast from "../services/notificationToast";

const HomeBooking = ({ item }) => {
  //   const [checkIn, setCheckIn] = useState(new Date());
  //   const [checkOut, setCheckOut] = useState(new Date(moment().add("days", 2)));
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const price = item?.price || 0;
    const checkInDate = moment(checkIn, "YYYY-MM-DD");
    const checkOutDate = moment(checkOut, "YYYY-MM-DD");
    const diffDates = checkOutDate.diff(checkInDate, "days");

    // console.log("Diff", diffDates);
    const tempTotal = diffDates * price;
    // if (Number.isInteger(tempTotal)) {
    if (tempTotal > 0) {
      setTotal(tempTotal);
    } else {
      setTotal("--");
    }
  }, [checkIn, checkOut, item]);

  const handleBooking = () => {
    apiClient
      .bookHome(item, checkIn, checkOut)
      .then((res) => {
        console.log("booked???", res);
        bookingDialog.close();
        notificationToast.open(res.message);
      })
      .catch((err) => console.log(err));
  };

  if (!item) {
    return <div data-testid="empty">No data found</div>;
  }
  return (
    <div>
      <h2 data-testid="title">{item.title}</h2>
      <div data-testid="price" className="mb-3">
        <span className="font-weight-bold text-primary text-large">
          {item.price}
        </span>{" "}
        per night
      </div>
      <div className="form-group">
        <label htmlFor="checkInDate">Choose your check-in date</label>
        <input
          data-testid="check-in"
          className="form-control"
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="checkOutDate">Choose your check-out date</label>
        <input
          data-testid="check-out"
          className="form-control"
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </div>
      <div data-testid="total" className="my-3 text-end">
        <span className="text-danger">Total: ${total}</span>
      </div>
      <div className="d-flex justify-content-end">
        <button
          data-testid="book-btn"
          className="btn btn-primary"
          onClick={handleBooking}
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default HomeBooking;
