const yup = require('yup');

const listSchema = yup.object().shape({
    list_name: yup.string().trim().required().label('lijstnaam'),
    list_subject: yup.string().trim().required().label('onderwerp'),
    questions: yup.array().of(
        yup.object().shape({
            question: yup.string().trim().required().label('vraag'),
            answer: yup.string().trim().required().label('antwoord')
        })
    ).required().label('vragen'),
    channels: yup.array()
});

module.exports = listSchema;
