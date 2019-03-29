"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
// import { NotFoundError } from 'restify-errors'
const reviews_model_1 = require("./reviews.model");
class ReviewsRouter extends model_router_1.ModelRouter {
    constructor() {
        super(reviews_model_1.Review);
    }
    envelope(document) {
        let resource = super.envelope(document);
        const restId = document.restaurant._id ? document.restaurant._id : document.restaurant;
        const userId = document.user._id ? document.user._id : document.user;
        resource._links.restaurant = `/restaurants/${restId}`;
        resource._links.user = `/users/${userId}`;
        return resource;
    }
    prepareOne(query) {
        return query.populate('user', 'name')
            .populate('restaurant', 'name');
    }
    // findById = (req, resp, next) => {
    // 	this.model.findById(req.params.id)
    // 		.populate('user', 'name')
    // 		.populate('restaurant', 'name')
    // 		.then(this.render(resp, next))
    // 		.catch(next)
    // }
    applyRoutes(application) {
        application.get(`${this.basePath}`, this.findAll);
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        application.post(`${this.basePath}`, this.save);
    }
}
exports.reviewsRouter = new ReviewsRouter();
//# sourceMappingURL=reviews.router.js.map