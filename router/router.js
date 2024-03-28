const express = require('express');
const router = express.Router();
const baseUrl = '/persons'
const {Person} = require('../models/index')


function validateInputs(request) {
       
        if(!request.body.name || !request.body.number || request.body.name.length < 5 || request.body.number.length < 5) {
        const error = new Error("mandatory information was not filled");
        error.name = "InputValidationError"
        throw error;
        }
}




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
   
    const personToSave = new Person({
        name: req.body.name,
        number: req.body.number
    })
    try {
        validateInputs(req);
        const response =  await personToSave.save()
        const allPersons = await Person.find({});
        res.json({allPersons}); 
    }
    catch(error) {
        next(error)
    }
})

router.put(`${baseUrl}/:id`, async(req, res, next) => {
    try {
        validateInputs(req);
        const updatedPerson = await Person.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                number: req.body.number
            }
            
        });
        console.log(updatedPerson);
        const allPersons = await Person.find({})
        res.json({
            updatedPerson,
            allPersons
        });
    }
    catch(error) {
        console.log("errorname: ", error.name);
        if(error.name === "InputValidationError") {

            next(error);
        }
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
        res.json({deletedPerson});
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
