const homePage = async (req, res) => {
    res.render('lp_home', {layout: 'landingpage' });
};

const aboutPage = async (req, res) => {
    res.render('lp_about', {layout: 'about' });
};

const usePage = async (req, res) => {
    res.render('lp_use', {layout: 'about' });
};

const privacyPageNL = async (req, res) => {
    res.render('lp_privacy_nl', {layout: 'empty' });
};

const privacyPageEN = async (req, res) => {
    res.render('lp_privacy_en', {layout: 'empty' });
};

module.exports = {
    homePage,
    aboutPage,
    usePage,
    privacyPageNL,
    privacyPageEN
};
