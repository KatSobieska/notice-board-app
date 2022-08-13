const Ad = require("../models/ad.model.js");

exports.getAllAds = async (req, res) => {
  try {
    res.json(await Ad.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getAdById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) res.status(404).json({ message: "Not found" });
    else res.json(ad);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addAd = async (req, res) => {
  try {
    const {
      title,
      description,
      publicationDate,
      photo,
      price,
      location,
      seller,
    } = req.body;
    const newAd = new Ad({
      title: title,
      description: description,
      publicationDate: publicationDate,
      photo: photo,
      price: price,
      location: location,
      seller: seller,
    });
    await newAd.save();
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updateAd = async (req, res) => {
  const {
    title,
    description,
    publicationDate,
    photo,
    price,
    location,
    seller,
  } = req.body;
  try {
    const ad = await Ad.findById(req.params.id);
    if (ad) {
      await Ad.updateOne(
        { _id: req.params.id },
        {
          $set: {
            title: title,
            description: description,
            publicationDate: publicationDate,
            photo: photo,
            price: price,
            location: location,
            seller: seller,
          },
        }
      );
      res.json({ message: "OK" });
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (ad) {
      await Ad.deleteOne({ _id: req.params.id });
      res.json({ message: "OK" });
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.searchPhrase = async (req, res) => {
  try {
    const ad = await Ad.find({ $text: { $search: req.params.searchPhrase } });
    res.json(ad);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
