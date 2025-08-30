const sortByDisplayOrder = require('./src/utils/sort-by-display-order.js');
const rssPlugin = require('@11ty/eleventy-plugin-rss');
// Filters
const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');

module.exports = (config) => {
	// Add filters
	config.addFilter('dateFilter', dateFilter);
	config.addFilter('w3DateFilter', w3DateFilter);
	// Set directories to pass through to the dist folder
	config.addPassthroughCopy('./src/images/');

	//Css
	config.addPassthroughCopy("bundle.css");
	//Blog collection
	// Returns work items, sorted by display order
	// Plugins
	config.addPlugin(rssPlugin);
	config.addCollection('blog', (collection) => {
		return [...collection.getFilteredByGlob('./src/posts/*.md')].reverse();
	});
	
	return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
		dir: {
			input: 'src',
			output: 'dist',
		},
	};
};