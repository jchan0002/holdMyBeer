var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var beers =[
    {name: "Beer 1", image: "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60"},
    {name: "Beer 2", image: "https://images.unsplash.com/photo-1558642891-54be180ea339?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60"},
    {name: "Beer 3", image: "https://images.unsplash.com/photo-1523567830207-96731740fa71?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60"},
    {name: "Beer 4", image: "https://images.unsplash.com/photo-1575367439058-6096bb9cf5e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60"},
]

app.get("/", function(req, res) {
    res.redirect("/beers"); 
});

app.get("/beers", function(req, res) {
    res.render("index", {beers: beers});
});

app.get("/beers/new", function(req, res) {
    res.render("new.ejs");
});

app.post("/beers", function(req, res) {
    // get data from form and add to array
    var name = req.body.name;
    var image = req.body.image;
    var newBeer = {name, image};
    beers.push(newBeer);
    // redirect back to campground
    res.redirect("/beers");
});

app.listen(3000, function() {
    console.log("Server started!");
});