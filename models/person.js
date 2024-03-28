const mongoose = require('./mongooseInstance');

const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    number:{
        type: String,
        required: true
    }
})

personSchema.set('toJSON', {
    transform: (document, returned) => {
        returned.id = document._id.toString();
        delete returned._id;
        delete returned.__v;
        return returned;
    }
})

const Person = mongoose.model("Person", personSchema);


module.exports = Person;