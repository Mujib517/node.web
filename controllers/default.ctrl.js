class DefaultCtrl {

    home(req, res) {
        res.render("pages/home");
    }

    about(req, res) {
        res.render("pages/about");
    }

    contact(req, res) {
        res.render("pages/contact");
    }
}

module.exports = new DefaultCtrl();