var express = require('express');
var router = express.Router();

// Import the Article model
var Article = require('../models/Article.js');

router.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/public/index.html");
});

router.get("/api/saved", function(req, res) {
  
  // Query Mongo for the Articles
   Article.find({}, function(err, docs){
      // log any errors
      if (err){
        console.log(err);
      } 
      //json object
      else {
        res.json(docs);
      }
   });
});

router.post("/api/saved", function(req, res) {
  
  var entry = new Article (req.body);

  // Save the entry to MongoDB
  entry.save(function(err, doc) {
    // log any errors
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } 
    // or log the doc that was saved to the DB
    else {
      console.log(doc);
      res.sendStatus(200);
    }
  });

});

router.post("/api/delete/:articleMongoId", function(req, res) {
  console.log(req.params.articleMongoId)
  Article.findByIdAndRemove(req.params.articleMongoId, function (err, todo) {
    if (err) {
      console.log(err);      
      res.sendStatus(400);
    } 
    else {
      res.sendStatus(200);
    }
  });
});

router.get("*", function(req, res) {
  res.redirect("/");
});

module.exports = router;