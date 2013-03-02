# dom-binding.js

A tiny library that lets you make models with properties that can be bound to the DOM.

## Usage

[Require](http://requirejs.org/) it:

```javascript
require(["dom-binding.js"], function (DomBindable) {
  // your code here
});
```

Create a model:

```javascript
var bikeShed = new DomBindable();
```

Set a property:

```javascript
bikeShed.set("color", "purple");
```

Bind an element:

```javascript
// sets the inner content of #some-bindable-span to 'purple'
bikeShed.bind("color", "span#some-bindable-span");
``` 

You can also bind to the class of an element:

```javascript
// sets the class of #some-bindable-span to 'purple'
bikeShed.bind("color", "span#some-bindable-span", {type: "class"}); 
```

And you can transform the value of a property when rendering it:
```javascript
bikeShed.bind("color", "span#crayola-color", {transform: function(value) {
  if (value === 'purple')
    return 'violet';
  if (value === 'pink')
    return 'fuschia';
  return value; //default
}});
```