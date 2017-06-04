const mongoose = require("mongoose");
mongoose.Promise = global.Promise; // wait data from DataBase, global is smth like window for DOM
const slug = require("slugs"); // for nice URL view(like permalink)

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: "Please enter the Store name" // trow error if user don't give a name
  },
  slug: String, // this slug be auto generated before smbdy save
  description: {
    type: String,
    trim: true
  },
  tags: [String] // gonna be array of strings
});

// before storeSchema saved
storeSchema.pre("save", function(next) {
  if (!this.isModified(name)) {
    next() // skip
    return //stop this function from running
  }
  this.slug = slug(this.name); // this here equal the Store we are trying to save!
});

module.exports = mongoose.model("Store", storeSchema);
