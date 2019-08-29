const User = require('../../../models/user');

const onboarding = async agent => {
    console.log(agent.parameters)
    let userId
    const conv = agent.conv();

    if ('userId' in conv.originalRequest.payload.user.storage) {
        userId = conv.originalRequest.payload.user.storage.userId;
    } else {
        // generateUUID is your function to generate ids.
        userId = generateUUID();
        conv.originalRequest.payload.user.storage.userId = userId
    }

    const user = await User.findOne({
        userId: userId
    })

    const date = new Date()
    const lastLogin = conv.originalRequest.payload.user && conv.originalRequest.payload.user.lastSeen ? conv.originalRequest.payload.user.lastSeen : date.toISOString()

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
                Als je wilt oefenen zeg dan: <break time='0.3' /> ik wil oefenen.
                    <break time='0.3' />
            </speak>`)
    } else {
        agent.add(`
            <speak>
               Welkom terug! <break time='0.3' />
               Als je met mij wilt oefenen zeg, <break time='0.4' /> ik wil oefenen.
               Voor uitleg zeg, <break time='0.4' /> Ik wil uitleg.
            </speak>`)
    }
}

module.exports = {
    onboarding
}
