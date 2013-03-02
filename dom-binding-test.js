require(["dom-binding.js"], function (DomBindable) {
  var bikeShed = new DomBindable();
  bikeShed.set("color", "purple");

  bikeShed.bind("color", "#bindable", {
    type: "content",
    transform: function(value) {
      if (value==='purple')
        return 'violet';
      else
        return value;
    }
  })
  bikeShed.bind("color", "#bindable", {type: 'class'});

  bikeShed.bind("color", ".multi-bind", {type: 'class'});

  $("#change-bind").click(function() {
    bikeShed.set("color", "red");
  });


})