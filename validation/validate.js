const Joi = require('@hapi/joi');

const registerValidation = data =>{

    const schema =Joi.object( {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        address: Joi.string().required(),
        phone: Joi.required()
    });

    return schema.validate(data)
}

const loginValidation =data=>{

    const schema =Joi.object( {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    
    });

    return schema.validate(data)
}

module.exports =  {loginValidation, registerValidation};
