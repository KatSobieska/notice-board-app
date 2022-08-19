const Ad = require("../models/ad.model.js");
const fs = require("fs");

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
    const { title, description, publicationDate, price, location, seller } =
      req.body;
    const fileType = req.file ? await req.file.mimetype : "unknown";
    console.log(req.file);

    if (["image/png", "image/jpeg", "image/gif"].includes(fileType)) {
      const newAd = await Ad.create({
        title,
        description,
        publicationDate,
        photo: req.file.filename,
        price,
        location,
        seller,
      });
      res.status(201).send({ message: "Add created " });
    } else {
      res.status(400).send({ message: "Bad request" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updateAd = async (req, res) => {
  const { title, description, publicationDate, price, location, seller } =
    req.body;
  const fileType = req.file ? await req.file.mimetype : "unknown";
  console.log(req.file);

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
            photo: req.file.filename,
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
    const ad = await Ad.find({
      $text: {
        $search: req.params.searchPhrase,
      },
    });
    res.json(ad);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
