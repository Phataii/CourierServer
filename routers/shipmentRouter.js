const router = require("express").Router();
const Shipment = require("../models/shipmentModel");
const auth = require("../middleware/auth");
const { validateRequest } = require("../middleware/validate");
const { param } = require("express-validator");

router.post("/", auth, async (req, res) => {
  try {
    const {
      itemName1,
      itemName2,
      itemName3,
      itemName4,
      itemName5,
      trackingId,
      location,
      time,
      date,
      sender,
      receiver,
      status,
    } = req.body;

    const newShipment = new Shipment({
      itemName1,
      itemName2,
      itemName3,
      itemName4,
      itemName5,
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

router.put("/:id", auth, async (req, res) => {
  try {
    const shipmentId = req.params.id;

    const {
      itemName1,
      itemName2,
      itemName3,
      itemName4,
      itemName5,
      trackingId,
      location,
      time,
      date,
      sender,
      receiver,
      status,
    } = req.body;

    const shipment = await Shipment.findOneAndUpdate(
      shipmentId,
      {
        itemName1,
        itemName2,
        itemName3,
        itemName4,
        itemName5,
        trackingId,
        location,
        time,
        date,
        sender,
        receiver,
        status,
      },
      { new: true }
    );

    res.json(shipment);
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
