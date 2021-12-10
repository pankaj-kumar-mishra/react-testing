import React, { useState, useEffect } from "react";
import apiClient from "../services/apiClient";

const Homes = () => {
  const [homesData, setHomesData] = useState([]);

  useEffect(() => {
    const homesDataPromise = apiClient.getHomes();

    homesDataPromise.then((data) => {
      setHomesData(data);
    });
  }, []);

  return (
    <div className="container-fluid m-2">
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homes;
