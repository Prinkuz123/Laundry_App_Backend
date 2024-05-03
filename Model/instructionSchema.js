const mongoose = require("mongoose");
const instructionSchema = new mongoose.Schema({
  water: { type: String, require: true, enum: ["hot", "cool"] },
  fabricSoftener: { type: String, require: true, enum: ["yes", "no"] },
  detergent: { type: String, require: true, enum: ["scented", "normal"] },
  note:{type:String}
});
const instruction = mongoose.model("instruction", instructionSchema);
module.exports = instruction;
