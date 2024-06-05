const mongoose = require('mongoose');

const trackingSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered'],
        default: 'pending'
    },
    estimatedDeliveryTime: {
        type: Date,
        required: true,
      },
}, {
    timestamps: true 
});

const Tracking = mongoose.model("Tracking", trackingSchema);

module.exports = Tracking;
