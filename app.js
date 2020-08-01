const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const cors = require("cors");

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
// app.use(cors());

mongoose.connect("mongodb://localhost:27017/keeperDB",{
    useNewUrlParser: true,
    useUnifiedTopology:true
});

const keeperSchema = new mongoose.Schema({
    title : String ,
    content: String
});

const Keeper = mongoose.model("note", keeperSchema);

const data = new Keeper({
    title: "day1",
    content:"game of the"
});

// data.save(function(err){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("data saved");
//     }
// });

app.get("/name",function(req, res){
    Keeper.find({}, function(err, value){
        if(!err){
            // console.log(value);
            res.send(value);
        }
    })
});

app.post("/name", function(req, res){
    console.log("Body: ", req.body);

    const newInput = new Keeper({
        title: req.body.title,
        content : req.body.content
    }); 

    newInput.save(function(err){
        if(!err){
            console.log("data saved to DB");
        } else {
            console.log(err);
        }
    });

});

app.delete("/name", function(req, res){
    const id = req.body.id;
    console.log(id);

    Keeper.deleteOne({_id: id},function(err){
        if(err){
            console.log(err);
        } else {
            console.log("data successfuly deleted from DB");
        }
    });
});

app.listen(4050,function(req, res){
    console.log("server is runing on port 4050");
});