var template = require('./template.marko');

module.exports = function render(input, out) {
    var type = input.type || 'success';
    var className = 'alert alert-' + type;
    var renderBody = input.renderBody;
    var message = input.message;

    template.render({
        className: className,
        renderBody: renderBody,
        message: message
    }, out);
};

