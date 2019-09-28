var express = require('express');
var app = express();
var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/sampledb");
var path = require("path");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));
app.set('view engine','ejs');
app.set("views",__dirname);
mongoose.pluralize("null");
var memberSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
});
app.get('/', function (req, res) {
     res.sendFile(__dirname+'/home_page/index.html');
});

app.post("/register_user",function(req,res){
     var newstudent=mongoose.model("student",memberSchema);
     var newmentor=mongoose.model("mentor",memberSchema);
     if(req.body.usertype=="student")
     {
        newstudent.find({email:req.body.email},function(err,docs){
           
            if(docs.length)
            {
               res.render("register_page/ejs/primarykeycheck");
            }
            else
            {
            var createnewstudent=new newstudent({
                name:req.body.name,
                email:req.body.email,
                password:req.body.pass
            });
            createnewstudent.save(function(err,newentry){
                    if(err)
                    {
                        console.log("student with name" +req.body.name + "is not registered\n");
                    }
                    else{
                        console.log("student with name "+newentry.name+" is  registered\n");
                    }
            });
            res.sendFile(__dirname+"/login_page/loginpage.html")
            }

        });
        
     }
     else
     {
         newmentor.find({email:req.body.email},function(err,docs){
           
        if(docs.length)
        {
            res.render("register_page/ejs/primarykeycheck");
        }
        else
        {
            var createnewmentor=new newmentor({
                name:req.body.name,
                email:req.body.email,
                password:req.body.pass
            });
            createnewmentor.save(function(err,newentry){
                    if(err)
                    {
                        console.log("Mentor with name" +req.body.name +"is not registered\n");
                    }
                    else{
                        console.log("Mentor with name "+newentry.name+" is  registered\n");
                    }
            });
        }
       });
      }
});

app.post("/validate_user",function(req,res){

    var validatestudent=mongoose.model("student",memberSchema);
    var validatementor=mongoose.model("mentor",memberSchema);
    if(req.body.usertype=="student")
    {
        validatestudent.find({email:req.body.email,password:req.body.your_pass},function(err,docs)
        {
       
             if(docs.length)
             {
                 res.send("Successfully logged in");
             }
             else
             {
                 res.render("login_page/ejs/authorisation");
             }
        });
    }
    else
    {
        validatementor.find({email:req.body.email,password:req.body.your_pass},function(err,docs)
        {
           
                 if(docs.length)
                 {
                     res.send("Successfully logged in");
                 }
                 else
                 {
                     res.render("login_page/ejs/authorisation");
                 }
        });
    }
   
});

app.listen(5006, function () {
    console.log('Node server is running..');
});
