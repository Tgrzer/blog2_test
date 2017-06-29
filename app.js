var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');



app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://test:test@ds141242.mlab.com:41242/blog2");


var blogSchema = new mongoose.Schema({
	title: String,
	image: String

})


var Blog = mongoose.model("Blog", blogSchema);


// Blog.create({
// 	title: "Monday",
// 	image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Rainbow-diagram-ROYGBIV.svg/2000px-Rainbow-diagram-ROYGBIV.svg.png"

// })



app.get("/", function(req,res){
	res.redirect('/blogs');
})


//INDEX
app.get("/blogs", function(req,res){
	Blog.find({}, function(err, data){
		if(err) throw err;
		res.render("index", {blog: data});
	})
	
})


//NEW

app.get("/blogs/new", function(req,res){
	res.render("create");
})



//CREATE

app.post("/blogs", function(req,res){
	var title= req.body.title;
	var image = req.body.image;
	var newBlog = {title:title, image:image};
	Blog.create(newBlog, function(err,data){
		if(err){
			console.log(err);
		} else {
			res.redirect('/blogs');
		}
	})
})


//SHOW

app.get("/blogs/:id", function(req,res){
	Blog.findById(req.params.id, function(err, data){
		if(err) {
			res.redirect("/blogs")
		} else{
		res.render('show', {blog: data});
	}
	});
})


//EDIT

app.get("/blogs/:id/edit", function(req,res){
	Blog.findById(req.params.id, function(err,data){
		if(err){
			res.redirect('/blogs');
		} else {
			res.render("edit", {blog: data});
		}
	})



})







app.listen(3000, function(){
	console.log('server is running');
})