const express = require("express");
const router = express.Router();
const axios = require("axios");
const helper = require("../middleware/helper");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/", (req, res) => {
  axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
      return res.status(200).send(response.data);
    })
    .catch((error) => {
      return res.status(500).send("error");
    });
});
router.get("/:id", (req, res) => {
  helper
    .make_API_call(
      `https://jsonplaceholder.typicode.com/posts/${req.params.id}/comments`
    )
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;
