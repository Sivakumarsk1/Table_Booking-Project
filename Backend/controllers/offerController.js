const OfferModel = require('../models/offer');

const OfferController = {
  getOffers: (req, res) => {
    OfferModel.getAll((err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching offers", error: err });
      }
      return res.status(200).json({ message: "Offers fetched successfully", offers: results });
    });
  },

  createOffer: (req, res) => {
    const { name, description, discount, minVisits, validUntil, email } = req.body;

    if (!name || !description || !discount || !minVisits || !validUntil || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const offerData = {
      name,
      description,
      discount,
      min_visits: minVisits,
      valid_until: validUntil,
      email
    };

    OfferModel.create(offerData, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error creating offer", error: err });
      }

      return res.status(201).json({
        message: "Offer created successfully",
        offerId: result.insertId
      });
    });
  },

  // Get offers for a specific user by email
  getOffersByUser: (req, res) => {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    OfferModel.getOffersByEmail(email, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching user-specific offers", error: err });
      }

      return res.status(200).json({
        message: "User-specific offers fetched successfully",
        offers: results
      });
    });
  }
};

module.exports = OfferController;
