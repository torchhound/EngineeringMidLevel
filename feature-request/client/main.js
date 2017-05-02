import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Features } from '../imports/api/features.js';

import '../imports/api/features.js'
import './main.html';

Template.requestForm.rendered = function() {
	this.$('.ui.radio.checkbox').checkbox();
};

Template.feature.rendered = function() {
	this.$('.ui.radio.checkbox').checkbox();
};

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('features'); 
});

Template.body.helpers({
  features: function() {
    return Features.find({});
  }
});

Template.feature.onCreated(function featureOnCreated() {
  this.subscribe('comments');
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
    'submit .commentForm'(event) {
      event.preventDefault();
      const commentText = target.commentText.value;
      Meteor.call('features.comment', this._id, commentText);
      target.commentText.value = '';
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
  'click .discuss'() {
    $('#commentForm').show();
    $('#commentsOutput').show();
    $('#discuss').hide();
  },
  'click .cancelComment'() {
    $('#commentForm').hide();
    $('#commentsOutput').hide();
    $('#discuss').show();
  },
});