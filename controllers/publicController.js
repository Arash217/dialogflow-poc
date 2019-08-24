const homePage = async (req, res) => {
    res.render('lp_home', {layout: 'landingpage' });
};

const aboutPage = async (req, res) => {
    res.render('lp_about', {layout: 'about' });
};

const usePage = async (req, res) => {
    res.render('lp_use', {layout: 'about' });
};

module.exports = {
    homePage,
    aboutPage,
    usePage
};
