const mongoose = require("mongoose");
const goalschema = require("../schema/goalschema");

const goalmodel = mongoose.model("goal", goalschema);

module.exports = goalmodel;