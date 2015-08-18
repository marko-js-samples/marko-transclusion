Sample App: Marko + Express
======================================

This sample app illustrates how to use "transclusion" with Marko. Transclusion allows content to be nested inside a custom tag. In addition, the custom tag renderer can choose where that nested content is rendered into the final HTML.

# Installation

```
git clone https://github.com/marko-js-samples/marko-transclusion.git
cd marko-transclusion
npm install
node server.js
```

Navigate to [http://localhost:8080/](http://localhost:8080/) to see your server in action!

# Overview

Example usage of transclusion:

```xml
<app-alert type="success">
    <b>Success</b> This is a success alert!
</app-alert>
```

Output HTML:

```html
<div class="alert alert-success" role="alert">
    <b>Success</b> This is a success alert!
</div>
```

Renderer for the custom `<app-alert>` tag:

___src/components/app-alert/renderer.js___

```javascript
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
```

Template for the custom `<app-alert>` tag:

___src/components/app-alert/template.marko___

```xml
<div class="${data.className}" role="alert">
    <invoke function="data.renderBody(out)" if="data.renderBody"/>
    <div else-if="data.message">
        ${data.message}
    </div>
    <div else>
        (no nested content!)
    </div>
</div>
```