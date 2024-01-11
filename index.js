const express = require("express");
const cors = require("cors")
const multer = require('multer')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const plantdetailsmodel = require("./model/plant");
const plantmodel= require("./model/planttype");

const app = new express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());


app.get('/', (request, response) => {
    response.send("hi database")
})

//for saving plant data

app.post('/pnew', upload.single('plantphoto'), async (request, response) => {
    const { plantid,plantname,planttype,color,size,price,description,stock,status } = request.body
    console.log(request.body)
    const newdata = new plantdetailsmodel({
        plantid,
        plantname,
        planttype,
        color,
        size,
        price,
        description,
        stock,
        plantphoto: {
            data: request.file.buffer,
            contentType: request.file.mimetype,
        },
        status
    })
    await newdata.save();
})


//for retrieving plant data

app.get('/pview', async (request, response) => {
    var data = await plantdetailsmodel.find();
    response.send(data)
})

//for update status of plant-delete 

app.put('/updatestatus/:id', async (request, response) => {
    let id = request.params.id
    await plantdetailsmodel.findByIdAndUpdate(id, { $set: { Status: "INACTIVE" } })
    response.send("Record Deleted")
})

//for modifying the plant details 

app.put('/pedit/:id', async (request, response) => {
    let id = request.params.id
    await plantdetailsmodel.findByIdAndUpdate(id, request.body)
    response.send("Record Updated")
})

//for retrieving plant type data

app.get('/pview', async (request, response) => {
    var data = await plantmodel.find();
    response.send(data)
})

//for update status of plant type-delete 

app.put('/updatestatus/:id', async (request, response) => {
    let id = request.params.id
    await plantmodel.findByIdAndUpdate(id, { $set: { Status: "INACTIVE" } })
    response.send("record deleted")
})

//for modifying the plant type

app.put('/pedit/:id', async (request, response) => {
    let id = request.params.id
    await plantmodel.findByIdAndUpdate(id, request.body)
    response.send("record updated")

})

app.listen(3005, (request, response) => {
    console.log("Port is running in 3005")
})
