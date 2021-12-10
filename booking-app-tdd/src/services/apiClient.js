const apiClient = {
  getHomes: () => {
    // return Promise.resolve([]);
    return fetch("https://run.mocky.io/v3/62de12a6-dce1-4b9c-a34c-c77e275df98a")
      .then((response) => response.json())
      .catch((err) => console.log("getHomes", err));
  },
};

export default apiClient;
