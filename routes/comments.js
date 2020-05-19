const express = require("express");
const router = express.Router({mergeParams: true}); // merge params from beers with comments
const Beer = require("../models/beer");
const Comment = require("../models/comment");

// comments new
router.post("/", isLoggedIn, function(req, res) {
    // look up beer using id
    Beer.findById(req.params.id, function(err, foundBeer) {
        if (err) {
            console.log(err);
            return res.redirect("/beers");
        } 

        // create new comment
        var comment = req.body.comment;
        Comment.create(comment, function(err, newComment) {
            if (err) {
                console.log(err);
                return res.redirect("/beers");
            } 
            // add username and id to comment
            newComment.author = {
                id: req.user._id,
                username: req.user.username
            }
            newComment.save();
            // connect new comment to beer
            foundBeer.comments.push(newComment);
            foundBeer.save();
            res.redirect("/beers/" + foundBeer._id);
        });
    });
});

// edit route

// update route
// delete route
router.delete("/:id", checkCommentOwnership, function(req, res) {
    // console.log(req.baseUrl);
    // var beerId = 
    Comment.findByIdAndRemove(req.params.id, function(err, removedComment) {
        if(err) console.log(err);
        return res.redirect("back");
    });
    
});

// middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect("/login");
}

function checkCommentOwnership(req, res, next) {
    // is user logged in
    if (req.isAuthenticated()) {
        // find comment with that id
        Comment.findById(req.params.id, function(err, foundComment) {
            if(err) {
                console.log(err);
                res.redirect("back");
            } else {
                // does user own the comment
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    console.log("user doesn't have permission");
                    res.redirect("back");
                }
            }
        })
    } else {
        console.log("Uesr need to be logged in");
        res.redirect("back");
    }
}

module.exports = router;
