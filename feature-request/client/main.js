import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Features } from '../imports/api/features.js';

import './main.html';

Template.requestForm.rendered = function() {
	this.$('.ui.radio.checkbox').checkbox();
};

Template.feature.rendered = function() {
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
    Meteor.call('features.insert', title, description, client, clientPriority, targetDate, ticketUrl, productArea);
		target.title.value = '';
		target.description.value = '';
		target.client.value = '';
		target.clientPriority.value = '';
		target.targetDate.value = '';
		target.ticketUrl.value = '';
		//clear productArea?
		$('.requestForm').hide();
		$('.cancelRequest').hide();
		$('.create').show();
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
   	Meteor.call('features.update', this._id, title, description, client, clientPriority, targetDate, ticketUrl, productArea)
   	target.title.value = '';
		target.description.value = '';
		target.client.value = '';
		target.clientPriority.value = '';
		target.targetDate.value = ''
		target.ticketUrl.value = '';
		$('#updateForm').hide();
		$('#update').show();
  	},
});

Template.body.events({
	'click .create'() {
		$('.create').hide();
		$('.requestForm').show();
		$('.cancelRequest').show();
	},
	'click .cancelRequest'(event) {
    event.preventDefault();
		$('.requestForm').hide();
		$('.cancelRequest').hide();
		$('.create').show();
	},
})

Template.feature.events({
	'click .delete'() {
    Meteor.call('features.remove', this._id);
	},
	'click .update'() {
		$('#update').hide();
		$('#updateForm').show();
	},
	'click .cancelUpdate'() {
		$('#updateForm').hide();
		$('#update').show();
	},
});