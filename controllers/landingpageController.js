const get = async (req, res) => {
    res.render('lp_home', {layout: 'landingpage' });
};

module.exports = {
    get
};

