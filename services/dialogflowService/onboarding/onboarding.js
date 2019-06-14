const User = require('../../../models/user');


const onboarding = async agent => {

    const user = await User.findOne({
        userId: agent.originalRequest.payload.user.userId
    })

    const userId = agent.originalRequest.payload.user.userId;
    const lastLogin = agent.originalRequest.payload.user.lastSeen;
    if(!user) {
        let newUser = new User()
        newUser.userId = userId
        newUser.channelId = []
        newUser.seperateLists = []
        newUser.lastLogin = lastLogin.split("T")[0]
        newUser.save()

        agent.add(`
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
            </speak>`)
    } else {
        agent.add(`
            <speak>
               Welkom terug!
            </speak>`)
    }
}

module.exports = {
    onboarding
}