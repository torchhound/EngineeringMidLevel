import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Features = new Mongo.Collection('features');

if (Meteor.isServer) {
   Meteor.publish('features', function featuresPublication() {
      return Features.find({});
   });
   Meteor.publish('comments', function commentsPublication() {
      return Features.find({}, {fields: {comments: 0}});
   })
};

Meteor.methods({
	'features.insert'(title, description, client, clientPriority, targetDate, ticketUrl, productArea) {
		if (! Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		};

		const comments = [];

		Features.insert({
      		title,
      		description,
      		client,
      		clientPriority,
      		targetDate,
      		ticketUrl,
      		productArea,
      		comments,
      		createdAt: new Date(),
      		owner: Meteor.userId(),
    	});
	},
	'features.remove'(id) {
		Features.remove(id);
	},
	'features.update'(id, title, description, client, clientPriority, targetDate, ticketUrl, productArea) {
		if(title) {
   			Features.update(id, { 
   				$set: {title: title},
   			});
   		} else if(description) {
   			Features.update(id, { 
   				$set: {description: description},
   			});
   		} else if(client) {
   			Features.update(id, { 
   				$set: {client: client},
   			});
   		} else if(clientPriority) {
   			Features.update(id, { 
   				$set: {clientPriority: clientPriority},
   			});
   		} else if(targetDate) {
   			Features.update(id, { 
   				$set: {targetDate: targetDate},
   			});
   		} else if(ticketUrl) {
   			Features.update(id, { 
   				$set: {ticketUrl: ticketUrl},
   			});
   		} else if(productArea) {
   			Features.update(id, { 
   				$set: {productArea: productArea},
   			});
   		}
	},
	'features.comment'(id, commentText) {
		Features.update(id, {
			$push: {comments: {commentText:commentText, author:Meteor.userId()}},
		});
	},
});