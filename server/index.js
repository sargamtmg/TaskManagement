const express = require('express');

const app = express();

const random = [
    {
        username : "sargam",
        age:26
    },
    {
        username : "John",
        age:32
    }
];

app.get('/',(req,res)=>{
    res.json("hello api call");
})

app.get('/data',(req,res)=>{
    res.json(random);
})

app.listen(8000,()=>{
    console.log("server listening to port 8000");
})