const apiClient = {
  getHomes: () => {
    // return Promise.resolve([]);
    return fetch("https://run.mocky.io/v3/62de12a6-dce1-4b9c-a34c-c77e275df98a")
      .then((response) => response.json())
      .catch((err) => console.log("getHomes", err));
  },
  bookHome: (item, checkIn, checkOut) => {
    return fetch("https://run.mocky.io/v3/d28be3f7-ffcc-4b7b-88b1-212a03d6a7fa")
      .then((response) => response.json())
      .catch((err) => console.log("bookHome", err));
  },
};

export default apiClient;
