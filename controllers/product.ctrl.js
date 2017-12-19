const Product = require('../models/product.model');
const Review = require('../models/review.model');
const moment = require('moment');

class ProductCtrl {
    get(req, res) {
        Product.find()
            .sort("-lastUpdated")
            .then(function (data) {
                res.render("pages/products", { products: data });
            });
    }

    new(req, res) {
        res.render("pages/new-product");
    }

    getById(req, res) {
        let id = req.params.id;
        Product.findById(id)
            .then(function (product) {
                Review.find({ productId: id })
                    .then(function (reviews) {
                        let jsonProduct = product.toJSON();
                        jsonProduct.lastUpdated = moment(jsonProduct.lastUpdated).fromNow();
                        jsonProduct.reviews = reviews;
                        console.log(jsonProduct);
                        res.render("pages/product-detail", { product: jsonProduct });
                    });
            })
            .catch(function (err) {
                console.log(err);
                res.render("pages/error");
            });
    }

    save(req, res) {
        let product = new Product(req.body);
        product.save()
            .then(function () {
                res.redirect("/products");
            })
            .catch(function () {
                res.render("pages/error");
            });

    }

    delete(req, res) {
        let id = req.params.id;

        Product.findByIdAndRemove(id)
            .then(function () {
                res.redirect("/products");
            })
            .catch(function () {
                res.render("pages/error");
            });
    }
}

module.exports = new ProductCtrl();