require(["dom-binding.js"], function (DomBindable) {
  var bikeShed = new DomBindable();
  bikeShed.set("color", "purple");

  // transforming content bind, jq selector
  bikeShed.bind("color", $("#bindable"), {
    type: "content",
    transform: function(value) {
      if (value==='purple')
        return 'violet';
      else
        return value;
    }
  });

  // class bind, node
  bikeShed.bind("color", document.querySelector("#bindable"), {type: 'class'});

  // class bind, nodeList
  bikeShed.bind("color", document.querySelectorAll(".multi-bind"), {type: 'class'});

  // content bind, string
  bikeShed.bind("color", "#string-bindable", {type:'content'})

  $("#change-bind").click(function() {
    bikeShed.set("color", "red");
  });


})