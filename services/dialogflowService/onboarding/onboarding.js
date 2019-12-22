const User = require('../../../models/user');
const uuid = require('uuid/v4');

const onboarding = async agent => {
    let userId
    const conv = agent.conv();

    if (userId in conv.user.storage) {
        userId = conv.user.storage.userId;
    } else {
        userId = uuid();
        conv.user.storage = { userId: userId };
    }

    const user = await User.findOne({
        userId: userId
    })

    const date = new Date();
    const lastLogin = conv.user && conv.user.lastSeen ? conv.user.lastSeen : date.toISOString();

    if(!user) {
        let newUser = new User()
        newUser.userId = userId
        newUser.seperateLists = []
        newUser.lastLogin = lastLogin.split("T")[0]
        await newUser.save()

        conv.add(`
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
                ik wil oefenen.
                    <break time='0.3' />
            </speak>`)
    } else {
        conv.add(`
            <speak>
               Welkom terug! <break time='0.3' />
               Als je met mij wilt oefenen zeg, <break time='0.4' /> ik wil oefenen.
               Voor uitleg zeg, <break time='0.4' /> Ik wil uitleg.
            </speak>`)
    }

    agent.add(conv);
}

module.exports = {
    onboarding
}
