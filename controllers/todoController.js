var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// connect to the database
mongoose.connect("mongodb://test:test@ds125716.mlab.com:25716/todos");

// create a schema (blueprint for our data)
var todoSchema = new mongoose.Schema({
  item: String
});

// create model type so mongoDB knows what blueprint to use
var Todo = mongoose.model("Todo", todoSchema);

// var data = [{item: "get milk"}, {item: "walk dog"}, {item: "rock on"}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
  app.get("/todos", function(req, res){
  // get data from mongoDB and pass it to view
    Todo.find({}, function(err, data){
      if(err) throw err;
      res.render("todos", {todos: data});
    })
  });

  // post a new todo
  app.post("/todos", urlencodedParser, function(req, res){
    // get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err, data){
      if (err) throw err;
      res.json(data);
    });
  });

  // delete todos
  app.delete("/todos/:item", function(req, res){
    // delete item that was clicked
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if(err) throw err;
      res.json(data);
    });
  });
};
