import { ModelRouter } from '../common/model-router'
import * as restify from 'restify'
import * as mongoose from 'mongoose'
// import { NotFoundError } from 'restify-errors'
import { Review } from './reviews.model'

class ReviewsRouter extends ModelRouter<Review> {

	constructor() {
		super(Review)
	}

	envelope(document) {
		let resource = super.envelope(document)
		const restId = document.restaurant._id ? document.restaurant._id : document.restaurant
		const userId = document.user._id ? document.user._id : document.user
		resource._links.restaurant = `/restaurants/${restId}`
		resource._links.user = `/users/${userId}`
		return resource
	}

	protected prepareOne(query: mongoose.DocumentQuery<Review,Review>): mongoose.DocumentQuery<Review,Review>	{
		return query.populate('user', 'name')
								.populate('restaurant', 'name')
	}

	// findById = (req, resp, next) => {
	// 	this.model.findById(req.params.id)
	// 		.populate('user', 'name')
	// 		.populate('restaurant', 'name')
	// 		.then(this.render(resp, next))
	// 		.catch(next)
	// }

	applyRoutes(application: restify.Server) {

		application.get(`${this.basePath}`, this.findAll)
		application.get(`${this.basePath}/:id`, [this.validateId, this.findById])
		application.post(`${this.basePath}`, this.save)

	}

}

export const reviewsRouter = new ReviewsRouter()