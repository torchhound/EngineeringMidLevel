import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Features } from '../imports/api/features.js';

import './main.html';

Template.requestForm.rendered = function() {
	this.$('.ui.radio.checkbox').checkbox();
};

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
});