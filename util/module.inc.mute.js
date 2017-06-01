module.exports = () => {

    const module = {};

    module.execute = (target) => {
        const role = target.addRole('316601940068925440');
        role.then(() => {
            console.log(`${target.user.username} was muted.`);
            return true;
        }).catch((reason) => {
            console.log(`Mute of ${target.user.username} failed: ${reason}`);
            return false;
        });
        return true;
    };

    return module;
};
