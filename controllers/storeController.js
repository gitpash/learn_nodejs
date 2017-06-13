const mongoose = require("mongoose");
const Store = mongoose.model("Store");
exports.homePage = (req, res) => {
  console.log(req.name);
  res.render("index");
};

exports.addStore = (req, res) => {
  res.render("editStore", { title: "Add Store" });
};

exports.createStore = async (req, res) => {
  const store = await new Store(req.body).save(); // create the store and immidiately save it

  req.flash(
    "success",
    `successfully created ${store.name}. Want to leave a review?`
  );
  res.redirect(`/store/${store.slug}`);
};

exports.getStores = async (req, res) => {
  // query the database for stores
  const stores = await Store.find();
  res.render("stores", { title: "Stores", stores });
};

exports.editStore = async (req, res) => {
  //1. find the store given the ID
  const store = await Store.findOne({ _id: req.params.id });
  // res.json(store);

  //2. confirm they are owner of the store
  // can't do now cause don't have any login/account

  //3. render the edit form to let user update info
  res.render("editStore", { title: `Edit ${store.name}`, store });
};
exports.updateStore = async (req, res) => {
  // 1 find & update the store
  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return new store instead of existing
    runValidators: true
  }).exec();
  req.flash('Success', `Successfully updates <strong>${store.name}</strong>. <a href="stores/${store.slug}>View store →</a>`)
  res.redirect(`/stores/${store._id}/edit`)
  // 2 redirect to the store & tell it's OK
};
