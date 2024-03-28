const express = require('express');
const router = express.Router();
const baseUrl = '/persons'
const {Person} = require('../models/index')



router.get(baseUrl, async(req, res, next) => {
    try {
        const data = await Person.find({});
        res.json(data);
        
    }
    catch(error) {
        next(error)
    }   
})

router.post(`${baseUrl}`, async(req, res, next) => {
    if(!req.body.name || !req.body.number || req.body.number.length < 5 || req.body.number.length < 5) {
        res.status(400).send("Required information was not filled in");
        return;
    }
    const personToSave = new Person({
        name: req.body.name,
        number: req.body.number
    })
    try {
        const response =  await personToSave.save()
        res.send(`${response.name} was successfully saved to the database`);   
    }
    catch(error) {
        next(error)
    }
})

router.put(`${baseUrl}/:id`, async(req, res, next) => {
    try {
        const foundPerson = await Person.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                number: req.body.number
            }
            
        });
        console.log(foundPerson);
        res.status(200).send(`${foundPerson.name} was successfully deleted`);
    }
    catch(error) {
       const newError = new Error("The person was deleted before");
        next(newError);
    }
})

router.delete(`${baseUrl}/:id`, async(req, res, next) => {
    try {
        const deletedPerson = await Person.findByIdAndDelete(req.params.id);
        console.log(deletedPerson);
        if(!deletedPerson) {
            throw new Error("Person was already previously deleted")
        }
    }
    catch(error){
        next(error)
    }

})

router.get(`${baseUrl}/error`, (req, res, next) => {
    try {
        throw new Error("trial error");
    }
    catch(error) {
        next(error)
    }
})



module.exports = router;
