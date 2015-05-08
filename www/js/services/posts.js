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
					page: 1,
					pagesize: 10
				},
				tmeout: 20000
			}
		}
	);

	var getPosts = function(page, callback) {
		return resource.query({
			page: page
		}, function(result){
			$log.debug('get posts result:', result);
			return callback & callback(result);
		});
	};

	return {
		refresh: function(){
			return getPosts(1, function(result){
				nextPage = 2;
				hasNextPage = result.hasMore;
				posts = result.posts;
			})
		},
		pagination: function() {
			return getPosts(nextPage, function(result){
				hasNextPage = result.hasMore;
				nextPage++;
				posts = posts.concat(result.posts);
			});
		},
		hasNextPage: function(hasMore) {
			if (typeof hasMore !== 'undefined') {
				hasNextPage = hasMore;
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
		},
		getPost: function(post_id) {
			for(var i = 0, len = posts.length; i < len; i++) {
				if (posts[i]._id == post_id) {
					return posts[i];
				}
			}

			return null;
		}
	};
});