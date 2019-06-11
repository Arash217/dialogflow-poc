const yup = require('yup');

const accountSchema = yup.object().shape({
    username: yup.string().trim().min(3).required(),
    password: yup.string().trim().min(5).required(),
});

module.exports = accountSchema;
