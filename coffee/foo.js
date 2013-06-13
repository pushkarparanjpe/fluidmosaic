(function() {
  var fo, foobj;

  foobj = (function() {
    var a;

    function foobj() {}

    a = 0;

    foobj.prototype.foo = function() {
      console.log(a);
      return a += 1;
    };

    foobj.prototype.foo2 = function() {
      return console.log(a);
    };

    return foobj;

  })();

  fo = new foobj();

  fo.foo();

  fo.foo2();

}).call(this);
