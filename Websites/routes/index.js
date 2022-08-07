const express = require("express");
const router = express.Router();
const apiHelper = require("../helpers/apiHelper");

/* GET home page. */
router.get("/", function (req, res, next) {
  apiHelper.callApi("http://localhost:5000/api/").then((response) => {
    console.log(response);
    res.render("index", {
      title: "Rest API Getting Started",
      data: response.data,
    });
  }).catch(error => {
    res.send(error);
  });
  // res.render("index", { title: "Rest  Getting Started" });
});

module.exports = router;
