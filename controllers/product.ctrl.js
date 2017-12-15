const Product = require('../models/product.model');

class ProductCtrl {
    get(req, res) {
        Product.find()
            .then(function (data) {
                res.render("pages/products", { products: data });
            });
    }
}

module.exports = new ProductCtrl();