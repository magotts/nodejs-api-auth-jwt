const express = require("express");
const router = express.Router();
const verify = require("./verifyToken");

// GET ALL POSTS
router.get("/", verify, (req, res) => {
    res.json({
      post1: {
        title: "my first post",
        description: "random data you shouldnt access."
      }
    });
});

module.exports = router;