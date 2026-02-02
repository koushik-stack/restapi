const Joi = require('joi');

// User signup validation schema
const signupSchema = Joi.object({
    userType: Joi.string().valid('1', '2').required().messages({
        'any.only': 'userType must be either 1 or 2',
        'any.required': 'userType is required'
    }),
    firstName: Joi.string().min(2).max(50).required().messages({
        'string.min': 'firstName must be at least 2 characters long',
        'string.max': 'firstName cannot exceed 50 characters',
        'any.required': 'firstName is required'
    }),
    lastName: Joi.string().min(2).max(50).required().messages({
        'string.min': 'lastName must be at least 2 characters long',
        'string.max': 'lastName cannot exceed 50 characters',
        'any.required': 'lastName is required'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email',
        'any.required': 'email is required'
    }),
    password: Joi.string().min(8).required().messages({
        'string.min': 'Password must be at least 8 characters long',
        'any.required': 'password is required'
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'confirmPassword must match password',
        'any.required': 'confirmPassword is required'
    })
});

// User login validation schema
const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email',
        'any.required': 'email is required'
    }),
    password: Joi.string().required().messages({
        'any.required': 'password is required'
    })
});

// Validation middleware
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }));
            return res.status(400).json({
                status: 'error',
                message: 'Validation failed',
                errors
            });
        }
        next();
    };
};

module.exports = {
    signupSchema,
    loginSchema,
    validate
};