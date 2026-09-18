const { body } = require("express-validator");

const minLengthErr = "cannot be blank";
const maxLengthErr = "can be maximum 20 characters";
const nameErr = "can only contain letters and numbers";

const validateUser = [
    body("name").trim()
        .matches(/^[a-zA-Z0-9]+$/, 'i').withMessage(`Name ${nameErr}`)
        .isLength({ min: 1 }).withMessage(`Name ${minLengthErr}`)
        .isLength({ max: 20 }).withMessage(`Name ${maxLengthErr}`)
];

module.exports = validateUser;