const yup = require('yup');

const nameReq = /[!@#$%^&*(),.?":{}|<>\-_]|(lijst|kanaal)/g

const listSchema = yup.object().shape({
    list_name: yup.string().test('match', 
    'De lijst naam mag de volgende woorden en tekens niet bevatten: !@#$%^&*(),.?":{}|<>\-_ "lijst" "kanaal"', 
     function(name) {
       return !nameReq.test(name); 
     }).trim().required().label('lijstnaam'),
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


