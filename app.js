console.log("Connected");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp",{ useNewUrlParser: true });


app.use(bodyParser.urlencoded({extended:true}));

// setting up database schema.
var campgroundSchema = mongoose.Schema({
	name:String,
	image:String,
	description:String
});

var Campground = mongoose.model("Campground",campgroundSchema);

// Campground.create({name:"Buchard Gardens "
// 	, image:"https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807__480.jpg"
// 	, description: "Buchard Gardens is a beautiful place to visit any time of the year The Butchart Gardens is a group of floral display gardens in Brentwood Bay, British Columbia, Canada, located near Victoria on Vancouver Island. The gardens receive over a million visitors each year."
// 	},function(err,campground){
// 	if(err){
// 		console.log("There was an error detected");
// 		console.log(err);
// 	}else{
// 		console.log("You have successfuly added a new campground to the database:");
// 		console.log(campground);
// 	}
// });


// var campgrounds = [{name:"Gold Stream Park", image:"https://cdn.pixabay.com/photo/2016/11/21/15/14/camping-1845906__480.jpg"},
// 	{name:"Mount Doglas", image:"https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201__480.jpg"},
// 	{name:"Mount Tolmie", image:"https://cdn.pixabay.com/photo/2015/10/12/14/57/campfire-984020__480.jpg"},
// 	{name:"Mount Washington", image:"https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402__480.jpg"},
// 	{name:"Buchard Gardens ", image:"https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807__480.jpg"}];

app.set("view engine","ejs");

app.get("/",function(req,res){
	res.render("landing");	
});

app.get("/campgrounds",function(req,res){
	Campground.find({},function(err,newcampground){
		if(err){
			console.log(err);
		}else{
			res.render("index",{campgrounds:newcampground}); 
		}
	});
	
});

app.post("/campgrounds",function(req,res){
	var name = req.body.place;
	var image = req.body.image;
	var description = req.body.description;
	var newObject = {name:name,image:image,description:description};
	// add the newcampground to the database
	Campground.create(newObject,function(err,newlyCreated){
		if(err){
			console.log("The new Campground could not be added");
			console.log(err);
		}
		else{
			// this time redirects to the get page instead of the post page as standard.
			res.redirect("/campgrounds");
		}
	});
	

	
});

app.get("/campgrounds/new",function(req,res){
	res.render("new");
});

app.get("/campgrounds/:id",function(req,res){

	Campground.findById(req.params.id,function(err,foundCampground){
		if(err){
			console.log("No campground found");
			console.log(err);
		}
		else{
			res.render("shows",{campgrounds:foundCampground});
		}
	});
	
});


app.listen(3000,function(){
	console.log("Server running at port 3000");	
});








