const get = async (req, res) => {
    res.render('lp_bot', {layout: 'bot' });
};

module.exports = {
    get
};
