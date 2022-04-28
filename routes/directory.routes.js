const express = require("express");
const router = express.Router();

const {
  add,
  update,
  fetch,
  fetchOne,
  remove
} = require("../controllers/directory.controllers")

// route for adding book
router.post("/add", add);

// route for updating books
router.put("/update/:id", update);

// route for fetching books
router.get("/fetch", fetch);

// route for fetching one book
router.get("/fetchOne/:id", fetchOne);

// route for removing books
router.delete("/remove/:id", remove);

module.exports = router;
