import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@material-ui/core";
import apiClient from "../services/apiClient";
import bookingDialog from "../services/bookingDialog";
import HomeBooking from "./HomeBooking";

const Homes = () => {
  const [homesData, setHomesData] = useState([]);
  const [dialogData, setDialogData] = useState({ open: false, item: null });

  useEffect(() => {
    const homesDataPromise = apiClient.getHomes();

    homesDataPromise.then((data) => {
      setHomesData(data);
    });
  }, []);

  useEffect(() => {
    const dialogSubscription = bookingDialog.dialogEvt$.subscribe((state) =>
      setDialogData(state)
    );

    return () => dialogSubscription.unsubscribe();
  }, []);

  return (
    <div className="container-fluid m-2">
      {/* MODAL CONTENT */}
      <Dialog open={dialogData.open} onClose={() => bookingDialog.close()}>
        <DialogContent>
          <HomeBooking item={dialogData.item} />
        </DialogContent>
      </Dialog>
      {/* PAGE CONTENT */}
      <h1>Homes</h1>
      <div className="row">
        {homesData.map((item, index) => (
          <div key={index} className="col-6 col-md-6 col-lg-4 col-xl-3 mb-3">
            <div data-testid="home" className="card w-100">
              <img
                data-testid="home-image"
                src={item.image}
                alt=""
                className="card-img-top"
              />
              <div className="card-body">
                <div data-testid="home-title" className="card-title h5">
                  {item.title}
                </div>
                <div data-testid="home-location">{item.location}</div>
                <div data-testid="home-price">${item.price}/night</div>
                <div className="d-flex justify-content-end">
                  <button
                    data-testid="home-booking-btn"
                    type="button"
                    onClick={() => bookingDialog.open(item)}
                    className="btn btn-primary"
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homes;
