var router = require("express").Router();
var Hotel = require("../models").Hotel;
var Restaurant = require("../models").Restaurant;
var Activity = require("../models").Activity;
var Itinerary = require('../models').Itinerary

router.get("/", (req, res, next) => {
  Promise.all([
    Hotel.findAll({ include: [{ all: true }] }),
    Restaurant.findAll({ include: [{ all: true }] }),
    Activity.findAll({ include: [{ all: true }] }),
    Itinerary.findAll({include: [{all:true}]})
  ])
    .then(([hotels, restaurants, activities, itineraries]) => {
      res.json({
        hotels,
        restaurants,
        activities,
        itineraries
      });
    })
    .catch(next);
});

router.get('/itineraries/:id',function(req,res,next){
  Itinerary.findOne({where:{
    id: req.params.id,
  },
  include: [{ all: true }] 
}
)
  .then((data)=>
  res.json(data)
   
  )
})

module.exports = router;
