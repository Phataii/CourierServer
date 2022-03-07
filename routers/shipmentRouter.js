const router = require("express").Router();
const Shipment = require("../models/shipmentModel");
const auth = require("../middleware/auth");
const { validateRequest } = require("../middleware/validate");
const { param } = require("express-validator");

router.post("/", auth, async (req, res) => {
  try {
    const {
      itemName,
      trackingId,
      location,
      time,
      date,
      sender,
      receiver,
      status,
    } = req.body;

    const newShipment = new Shipment({
      itemName,
      trackingId,
      location,
      time,
      date,
      sender,
      receiver,
      status,
    });

    const savedShipment = await newShipment.save();

    res.json(savedShipment);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.json(shipments);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//Get a shipment
router.get(
  "/:id",
  param("id").isMongoId().withMessage("Please enter a valid shipment ID"),
  validateRequest,
  async (req, res) => {
    try {
      const post = await Shipment.findById(req.params.id);

      if (!post) return res.status(404).json("Shipment not found");

      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
module.exports = router;
