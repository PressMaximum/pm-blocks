module.exports = function(grunt) {
	"use strict";
	// Update google Fonts
	grunt.registerTask("google-fonts", function() {
		var done = this.async();
		var request = require("request");
		var fs = require("fs");

		request(
			"https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDN4eR6IPflX0QhU1UOOHjv71-2KY3BQwA",
			function(error, response, body) {
				if (response && response.statusCode == 200) {
					var fonts = {};
					JSON.parse(body).items.forEach(function(font) {
						fonts[font.family] = {
							family: font.family,
							category: font.category,
							variants: font.variants,
							subsets: font.subsets
						};
					});

					fs.writeFile(
						"src/components/google-fonts/google-fonts.json",
						JSON.stringify(fonts, undefined, 4),
						function(err) {
							if (!err) {
								console.log("Google Fonts Updated!");
							}
						}
					);
				}
			}
		);
	});
};
