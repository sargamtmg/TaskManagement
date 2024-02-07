const express = require('express');
const connectToMongoDB = require('./db.js');
const { ObjectId } = require('mongodb');

const app = express();
const port = 8000;

app.use(express.json());

let db;
// Connect to MongoDB
connectToMongoDB()
.then(database => {
        db=database;
        // Start the Express server
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
})
.catch(error => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit the process if MongoDB connection fails
});

//get all users
app.get('/user', (req, res) => {
    db.collection('user').find().toArray()
    .then((documents)=>{
        console.log("documents =>"+documents);
        res.status(200).json(documents);
    })
    .catch(err=>{
        res.status(500).json({"error":err});
    })
});

//post user
app.post('/user',(req,res)=>{
    let user = req.body;
    db.collection('user').insertOne(user)
    .then(()=>{
        res.status(200).json({"message":"user created sucessfully"});
    })
    .catch(err=>{
        res.status(500).json({"error creatinng user":err});
    })
})

//get all tasks
app.get('/task', (req, res) => {
    db.collection('task').find().toArray()
    .then((documents)=>{
        console.log("documents =>"+documents);
        res.status(200).json(documents);
    })
    .catch(err=>{
        res.status(500).json({"error":err});
    })
});

//create task
app.post('/task',(req,res)=>{
    let task = req.body;
    db.collection('task').insertOne(task)
    .then(()=>{
        res.status(200).json({"message":"task created sucessfully"});
    })
    .catch(err=>{
        res.status(500).json({"error creatinng task":err});
    })
})

//delete task
app.delete('/task/:id',(req,res)=>{
    db.collection('task').deleteOne({_id: new ObjectId(req.params.id)})
    .then(()=>{
        res.status(200).json({"message":"task deleted sucessfully"});
    })
    .catch(err=>{
        res.status(500).json({"error deleating task ":err});
    })
})