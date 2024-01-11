const mongoose =require("mongoose")

mongoose.connect("mongodb+srv://bloomingbuds245:bloomingbuds245@cluster0.antw3nd.mongodb.net/bloom?retryWrites=true&w=majority")
.then(()=>{console.log("DB connected")})
.catch(err=>console.log(err));


let sc=mongoose.Schema;
const plantschema=new sc({
    Planttype:String,
    Status:String
});

var plantmodel=mongoose.model("Planttype",plantschema)
module.exports=plantmodel;