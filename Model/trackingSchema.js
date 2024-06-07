const mongoose = require('mongoose');

const trackingSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    currentStatus: {
        type: String,
        enum: ['Scheduled', 'Pickup', 'Washing','Ironing','Dryclean','Wash and Iron','Out for delivery'],
        default: 'Scheduled'
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
