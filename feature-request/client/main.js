import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Features } from '../imports/api/features.js';

import './main.html';

Template.requestForm.rendered = function() {
	this.$('.ui.radio.checkbox').checkbox();
};
/*
Template.updateForm.rendered = function() {
	this.$('.ui.radio.checkbox').checkbox();
};
*/
Template.body.helpers({ 
  features() {
    return Features.find({}, {sort: {createdAt: -1}});
  },
});

Template.body.events({
	'submit .requestForm'(event) {
    	event.preventDefault();
    	const target = event.target;
    	const title = target.title.value;
    	const description = target.description.value;
    	const client = target.client.value;
    	const clientPriority = target.clientPriority.value;
    	const targetDate = target.targetDate.value;
    	const ticketUrl = target.ticketUrl.value;
    	const productArea = target.productArea.value;
    	Features.insert({
      		title,
      		description,
      		client,
      		clientPriority,
      		targetDate,
      		ticketUrl,
      		productArea,
      		createdAt: new Date(),
    	});
		target.title.value = '';
		target.description.value = '';
		target.client.value = '';
		target.clientPriority.value = '';
		target.targetDate.value = '';
		target.ticketUrl.value = '';
		//clear productArea?
		$('#requestForm').hide();
		$('#create').show();
  	},
  	'submit .updateForm'(event) {
  		event.preventDefault();
  		const target = event.target;
    	const title = target.title.value;
    	const description = target.description.value;
    	const client = target.client.value;
    	const clientPriority = target.clientPriority.value;
    	const targetDate = target.targetDate.value;
    	const ticketUrl = target.ticketUrl.value;
    	const productArea = target.productArea.value;
    	if(title) {
    		Features.update(this._id, { 
    			$set: {title: title},
    		});
    	} else if(description) {
    		Features.update(this._id, { 
    			$set: {description: description},
    		});
    	} else if(client) {
    		Features.update(this._id, { 
    			$set: {client: client},
    		});
    	} else if(clientPriority) {
    		Features.update(this._id, { 
    			$set: {clientPriority: clientPriority},
    		});
    	} else if(targetDate) {
    		Features.update(this._id, { 
    			$set: {targetDate: targetDate},
    		});
    	} else if(ticketUrl) {
    		Features.update(this._id, { 
    			$set: {ticketUrl: ticketUrl},
    		});
    	} else if(productArea) {
    		Features.update(this._id, { 
    			$set: {productArea: productArea},
    		});
    	}
    	target.title.value = '';
		target.description.value = '';
		target.client.value = '';
		target.clientPriority.value = '';
		target.targetDate.value = '';
		target.ticketUrl.value = '';
		$('.updateForm').hide();
		$('.update').show();
  	},
});

Template.body.events({
	'click .create'() {
		$('#create').hide();
		$('#requestForm').show();
	},
})

Template.feature.events({
	'click .delete'() {
		Features.remove(this._id);
	},
	'click .update'() {
		$('.update').hide();
		$('.updateForm').show();
	}
});