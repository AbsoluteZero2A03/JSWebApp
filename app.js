
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , mongoose = require('mongoose');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon(__dirname+"/azico.ico"));
//  app.use(express.directory(path.resolve('./public/angular-3')));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.resolve('./public/angular-3')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var db = mongoose.createConnection('localhost', 'site');

var BlogPostSchema = new mongoose.Schema( 
	{
		title: {type : String},
		content: {type: String},
		author: {type : String},
		date: {type : Date},
		comments: {type : Array}		
	}
, {collection: "blogposts"});

var BlogPost = db.model("BlogPost", BlogPostSchema);


//app.get('/', routes.index);
app.get('/', function(req,res) {
	fs.readFile('./public/angular-3/index.html', function(err,data) {
		res.end(data);	
	});		
});
app.post('/blogposts.json', function (req,res) {	
	var qu = req.body.title;
	
	BlogPost.findOne({name: qu}, function(err,doc) {
		if (err) { console.log(err); }
		res.json(doc);
	});	
});
app.post('/comment', function (req,res) {
	var params = req.body;
	BlogPost.update({"name": params.title}, {$push: { comments: {author : params.author, content: params.content, date: new Date().toUTCString()}}}, function(err) {if (err) {console.log(err)}});
	res.redirect('/#/blog/'+params.title);
});

app.get('/posts.json', function (req,res) {
	BlogPost.find({}, function(err,docs){
	
		res.json(docs);
	})
})

app.get('/users', user.list);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
