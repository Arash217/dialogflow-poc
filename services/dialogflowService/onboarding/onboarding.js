const Users = require('../../../models/users');


const userCheck = async agent => {
    const user = await Users.findOne({userId: agent.originalRequest.payload.user})
    console.log('hallo')
    
}

const zeroState = async agent => {
    const feedbackText = `
    <speak>
        Welkom bij Overhoorbot. 
        <break time='0.5' /> 
            Met mij kun je je kennis oefenen. 
        <break time='0.5' /> 
            Als je uitleg van deze app wilt, zeg dan:
        <break time='0.3' /> 
            Ik wil uitleg.
        <break time='0.5' />
            Als je wilt oefenen zeg dan:
        <break time='0.3' /> 
            Ik wil oefenen
    </speak>`
    agent.add(feedbackTexst);
}

const repeatUse = async agent => {
    const feedbackText = `
    <speak>
        Hey welkom terug!
    </speak>`

    agent.add(feedbackText);
}
module.exports = {
    userCheck
}