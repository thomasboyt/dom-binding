require(["../dom-binding.js"], function (DomBindable) {
  module("Getting/Setting Properties");

  test("Constructor Test", function() {
    var bikeShed = new DomBindable({
      color: "purple"
    })
    equal(bikeShed.get("color"), "purple", "The constructor allows properties to be set.");
  });

  test("Set Test", function() {
    var bikeShed = new DomBindable();
    bikeShed.set("color", "purple");
    equal(bikeShed.get("color"), "purple", "Properties can be set and retrieved on the model.");
  })

  module("Single Binding");

  var selectorTest = function(selectorToPass, selectorToAssert) {
    var bikeShed = new DomBindable();
    bikeShed.set("color", "purple");
    bikeShed.bind("color", selectorToPass);
    equal(document.querySelector(selectorToAssert).innerHTML, "purple", "The content of #bindable was updated to equal purple");

    bikeShed.set("color", "red");
    equal(document.querySelector(selectorToAssert).innerHTML, "red", "The content of #bindable was updated to equal red");
  }

  test("Content via selector string", function() {
    selectorTest("#bindable", "#bindable");
  });
  test("Content via node", function() {
    selectorTest(document.querySelector("#bindable"), "#bindable");
  });
  test("Content via nodeList", function() {
    selectorTest(document.querySelectorAll("#bindable"), "#bindable");
  });
  test("Content via jQuery", function() {
    selectorTest($("#bindable"), "#bindable");
  });

  module("Multi binding");
  var multiTest = function(selectorToPass, selectorToAssert) {
    var bikeShed = new DomBindable();
    bikeShed.set("color", "purple");

    bikeShed.bind("color", selectorToPass);

    var els = document.querySelectorAll(selectorToAssert);
    for (var i=0; i<els.length; i++) {
      equal(els[i].innerHTML, "purple", "The content of element #" + i + " was updated to equal purple");
    }

    bikeShed.set("color", "red");
    for (var i=0; i<els.length; i++) {
      equal(els[i].innerHTML, "red", "The content of element #" + i + " was updated to equal red");
    }
  }
  test("Multiple contents via selector string", function() {
    multiTest("li.multi-bind", "li.multi-bind");
  });
  test("Multiple contents via nodeList", function() {
    multiTest(document.querySelectorAll("li.multi-bind"), "li.multi-bind");
  });
  test("Multiple contents via jQuery", function() {
    multiTest($("li.multi-bind"), "li.multi-bind");
  });

  module("Class binding");
  test("Binding to a class", function() {
    var bikeShed = new DomBindable({color: "purple"});
    bikeShed.set("color", "purple");

    bikeShed.bind("color", "#bindable", {type: "class"});
    ok(document.querySelector("#bindable").classList.contains("purple"), "#bindable has the class 'purple'")

    bikeShed.set("color", "red");
    ok(!document.querySelector("#bindable").classList.contains("purple") && document.querySelector("#bindable").classList.contains("red"), "#bindable has the class 'red' and not 'purple'")
  });

  module("Transform binding");
  var transformFn = function(value) {
    if (value == "purple")
      return "violet";
    else if (value == "pink")
      return "fuschia";
    return value;
  };

  test("Transforming content", function() {
    var bikeShed = new DomBindable({color: "purple"});
    bikeShed.bind("color", "#bindable", {type: "content", transform: transformFn});
    
    equal(document.querySelector("#bindable").innerHTML, "violet", "'purple' was transformed to 'violet'")

    bikeShed.set("color", "pink");
    equal(document.querySelector("#bindable").innerHTML, "fuschia", "'pink' was transformed to 'fuschia'")

    bikeShed.set("color", "red");    
    equal(document.querySelector("#bindable").innerHTML, "red", "'red' was not transformed")
  });

  test("Transforming classes", function() {
    var bikeShed = new DomBindable({color: "purple"});
    bikeShed.bind("color", "#bindable", {type: "class", transform: transformFn});
    
    ok(document.querySelector("#bindable").classList.contains("violet"), "#bindable has the 'violet' class");

    bikeShed.set("color", "pink");
    ok(document.querySelector("#bindable").classList.contains("fuschia") && !document.querySelector("#bindable").classList.contains("violet"), "#bindable has the 'pink' class");

    bikeShed.set("color", "red");
    ok(document.querySelector("#bindable").classList.contains("red"), "#bindable has the 'red' class");
  })

})