const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
  itemName: {
    type: String,
  },
  trackingId: {
    type: String,
  },
  location: {
    type: String,
  },
  time: {
    type: String,
  },
  date: {
    type: String,
  },
  sender: {
    type: String,
  },
  receiver: {
    type: String,
  },
  status: {
    type: String,
  },
});

const Shipments = mongoose.model("shipment", shipmentSchema);

module.exports = Shipments;
