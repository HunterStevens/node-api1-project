const express = require('express');
const shortid = require('shortid');
const server = express();

server.use(express.json());

let users = [
    {
        id:shortid.generate(),
        name: 'John Dale',
        bio: 'Simple Farmer'
    }
]

server.get('/', (req, res) =>{
    res.json({api:'Up and Running!'});
})

server.get('/api/users', (req, res) => {
    if(!users){
        res.status(400).json({Error:'There was an error trying to get the data.'});
    }
    else{
        res.status(201).json(users);
    }
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    let certainUser = users.filter(person => person.id === id);
    if(!certainUser){
        res.status(400).json({Error:'There was an error trying to get the data.'});
    }
    else{
        res.status(201).json(certainUser);
    }
})

server.post('/api/users', (req, res) => {
    let userInfo = req.body;
    userInfo.id = shortid.generate();


    if(userInfo.name === null || userInfo.bio === null || userInfo.name === "" || userInfo.bio === ""){
        res.status(400).json({Error:'Please Provide Name and Bio for the user'})
    }
    else if(!userInfo){
        res.status(400).json({Error:'There was an error trying to get the data.'});
    }
    else{
        users.push(userInfo);
        res.status(201).json(users);
    }
})

server.delete('/api/users/:id', (req, res) => {
    let id = req.params.id;

    let checkId = users.filter(check => check.id === id);
    console.log("Checkid: ", checkId)

    users = users.filter(person => person.id != id);
    if(checkId.length === 0){
        res.status(400).json({Error:'The Id was not found in the Data'});
    }
    else if(!users){
        res.status(500).json({Error:'There was an error trying to get the data.'});
    }
    else{
        res.status(201).json(users);
    }
})

server.patch('/api/user/:id', (req, res) => {
    const id = Number(req.params.id);


    if(!users){
        res.status(400).json({Error:'There was an error trying to get the data.'});
    }
    else{
        res.status(201).json(users);
    }
})

server.listen(5000, () => console.log('API is Running!'));