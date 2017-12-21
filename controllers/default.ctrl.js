class DefaultCtrl {

    home(req, res) {
        var obj = {
            title: "Home View"
        }
        res.render("pages/home", { obj: obj, vals: [1, 2, 3] });
    }

    about(req, res) {
        res.render("pages/about");
    }

    contact(req, res) {
        res.render("pages/contact");
    }
}

module.exports = new DefaultCtrl();