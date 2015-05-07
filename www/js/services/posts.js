'use strict';

angular.module('starter.services', ['ngResource'])
.factory('Posts', function($resource, $log){
	var posts = [];
	var category = "featured";
	var nextPage = 1;
	var hasNextPage = true;

	var resource = $resource(
		'http://api.likewed.net/v1/ideas/posts.json', 
		{},
		{
			query: {
				method: 'get',
				params: {
					category: 'featured',
					page: 1,
					pagesize: 10,
					mdrender: true
				},
				tmeout: 20000
			}
		}
	);

	var getPosts = function(category, page, callback) {
		return resource.query({
			category: category,
			page: page
		}, function(result){
			$log.debug('get posts category: ', category, 'page:', page, 'data:', result.posts);

			return callback & callback(result);
		});
	};

	return {
		refresh: function(){
			return getPosts(category, 1, function(result){
				nextPage = 2;
				hasNextPage = true;
				posts = result.posts;
			})
		},
		pagination: function() {
			return getPosts(category, nextPage, function(result){
				if (result.posts.length < 10) {
					$log.debug('data length', result.posts.length);
					hasNextPage = false;
				}
				nextPage++;
				posts = posts.concat(result.posts);
			});
		},
		hasNextPage: function(has) {
			if (typeof has !== 'undefined') {
				hasNextPage = has;
			}

			return hasNextPage;
		},
		resetData: function(has) {
			posts = [];
			nextPage = 1;
			hasNextPage = true;
		},
		getPosts: function() {
			return posts;
		}
	};
});