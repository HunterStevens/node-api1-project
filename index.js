require('dotenv').config();
const restricted = require('./auth/restricted-middleware');
const express = require('express');
const shortid = require('shortid');
const server = express();
const port = process.env.PORT || 5000;

server.use(express.json());

let users = [
    {
        id: shortid.generate(),
        name: "John Dale",
        bio: "Simple Farmer"
    },
    {
        name: "George Clean",
        bio: "AKA Mr. Clean",
        id: shortid.generate()
    },
    {
        name: "Betty Crocker",
        bio: "can bake some mad cookies",
        id: shortid.generate()
    },
    {
        name: "Danny Phantom",
        bio: "obsessed with ghosts",
        id: shortid.generate()
    },
    {
        name: "Simon Simon",
        bio: "Named after his father",
        id: shortid.generate()
    }
]

server.get('/', (req, res) =>{
    res.json({api:'Up and Running!'});
})

server.get('/api/users', (req, res) => {
    if(!users){
        res.status(500).json({Error:'There was an error trying to get the data.'});
    }
    else{
        res.status(201).json(users);
    }
})

server.get('/api/users/:id', restricted, (req, res) => {
    const id = req.params.id;

    let certainUser = users.filter(person => person.id === id);
    if(certainUser.length === 0){
        res.status(404).json({Error:'The Id was not found in the Data'});
    }
    else if(!certainUser){
        res.status(500).json({Error:'There was an error trying to get the data.'});
    }
    else{
        res.status(201).json(certainUser);
    }
})

server.post('/api/users', restricted, (req, res) => {
    let userInfo = req.body;
    userInfo.id = shortid.generate();


    if(userInfo.name === null || userInfo.bio === null || userInfo.name === "" || userInfo.bio === ""){
        res.status(404).json({Error:'Please Provide Name and Bio for the user'})
    }
    else if(!userInfo){
        res.status(500).json({Error:'There was an error trying to get the data.'});
    }
    else{
        users.push(userInfo);
        res.status(201).json(users);
    }
})

server.delete('/api/users/:id', restricted, (req, res) => {
    let id = req.params.id;

    let checkId = users.filter(check => check.id === id);
    console.log("Checkid: ", checkId)

  
    if(checkId.length === 0){
        res.status(404).json({Error:'The Id was not found in the Data'});
    }
    else if(!users){
        res.status(500).json({Error:'There was an error trying to get the data.'});
    }
    else{  
        users = users.filter(person => person.id != id);
        res.status(201).json(users);
    }
})

server.patch('/api/users/:id', restricted, (req, res) => {
    const id = req.params.id;
    let userInfo = req.body;
    let checkId = users.filter(check => check.id === id);
    if(checkId.length === 0){
        res.status(404).json({Error:'The Id was not found in the Data'});
    }

    else if (!userInfo.name || !userInfo.bio || userInfo.name === null || userInfo.bio === null || userInfo.name === "" || userInfo.bio === ""){
        res.status(404).json({Error:'Please Provide Name and Bio for the user to update'})
    }  
  
    else if(!userInfo){
        res.status(500).json({Error:'There was an error trying to get the data.'});
    }
    else{ 
        users.forEach(person => {
        if(person.id === id)
        {
            person.name = userInfo.name;
            person.bio = userInfo.bio;
        }
        else{
            return person;
        }
    });
        res.status(201).json(users);
    }
})

server.listen(port, () => console.log('API is Running!'));