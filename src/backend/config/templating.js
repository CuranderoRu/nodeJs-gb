const templating = require('consolidate');
const handlebars = require('handlebars')

handlebars.registerHelper('select', function(selected, options) {
    return options.fn(this).replace(
        new RegExp(' value=\"' + selected + '\"'),
        '$& selected="selected"');
});
templating.requires.handlebars = handlebars;

module.exports = templating;