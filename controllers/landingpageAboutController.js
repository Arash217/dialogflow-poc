const get = async (req, res) => {
    res.render('lp-about', {layout: 'about' });
};

module.exports = {
    get
};
