const yup = require('yup');

const channelSchema = yup.object().shape({
    channel_name: yup.string().trim().required().label('lijstnaam'),
    channel_subject: yup.string().trim().required().label('onderwerp'),
    lists: yup.array()
});

module.exports = channelSchema;
