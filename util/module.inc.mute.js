module.exports = () => {

    const module = {};

    module.execute = (target) => {
            const muteTime = 300000;
            const role = target.addRole('316601940068925440');
            role.then(() => {
                console.log(`${target.user.username} was muted.`);
                target.user.send(`You have been muted for 5 mins, for excessive spamming, `)
                return true;
            }).catch((reason) => {
                console.log(`Mute of ${target.user.username} failed: ${reason}`);
                return false;
            });

            setTimeout(() =>{
                const role = target.removeRole('316601940068925440');
                 console.log(`${target.user.username} was unmuted`)
             },muteTime);

            return true;

    };

    return module;
};

// setTimeout(() => {
//     module.exports = {
//
//         const: module = {},
//
//     module: execute = (target) => {
//         const role = target.addRole('316601940068925440');
//         role.then(() => {
//             console.log(`${target.user.username} was muted.`);
//             return true;
//         }).catch((reason) => {
//             console.log(`Mute of ${target.user.username} failed: ${reason}`);
//             return false;
//         });
//         return true;
//     },
//
//     return: module, };
// }, 0);