const Ad = require("./models/ads.model");

const loadTestData = async () => {
  const data = [
    {
      title: "test",
      description: "Lorem Ipsum",
      publicationDate: "2022-08-12",
      photo: "test.jpg",
      price: 25,
      location: "Warsaw",
      seller: "John Doe",
    },
  ];

  try {
    let counter = await Ad.countDocuments();
    if (counter === 0) {
      console.log("No ads. Loading example data...");
      await Ad.create(data);
      console.log("Test data has been succesfully loaded");
    }
  } catch (err) {
    console.log("Couldn't load test data", err);
  }
};

module.exports = loadTestData;
