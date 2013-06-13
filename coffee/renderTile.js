(function() {
  var circles, d, hexData, hexagon, hexagons, load, nickData, polyData, polyDataMain, popit, rect, rectData, status_colors, svg, _popTile, _populate, _render;

  hexagon = function(size, center, thickness, color, radius) {
    var angle, circle, hexobj, i, x, y;
    circle = 2 * Math.PI;
    angle = circle / 6;
    hexobj = {
      "points": [],
      "thickness": thickness,
      "color": color
    };
    for (i = 0; i <= 5; i++) {
      x = (Math.cos(angle * i) * size) + center[0];
      y = (Math.sin(angle * i) * size) + center[1];
      hexobj.points[i] = {
        "x": x,
        "y": y,
        "r": radius
      };
    }
    return hexobj;
  };

  rect = function(x, y, width, height) {
    var rectobj;
    rectobj = {
      "x": x,
      "y": y,
      "width": width,
      "height": height
    };
    return rectobj;
  };

  svg = null;

  hexagons = null;

  circles = null;

  hexData = [];

  rectData = [];

  nickData = [];

  polyDataMain = [];

  polyData = [];

  status_colors = {
    "unread": "#ffff80",
    "read": "#ffffff"
  };

  _populate = function(data) {
    console.log("Populating...");
    data.tiles.forEach(function(tile) {
      var cat_color, center, nickW, nickX, nickY, scout, size, status;
      size = 150;
      center = tile.loc_xyz;
      cat_color = tile.cat_color;
      status = tile.status;
      scout = tile.scout;
      hexData.push(hexagon(size, center, 8, cat_color));
      hexData.push(hexagon(size * 0.95, center, 6, status_colors[status]));
      rectData.push(rect(center[0] - size * 1.0 / 2, center[1] - size * 1.0 / 2, size * 1.0, size * 1.0));
      nickX = center[0] - size * 0.5 / 2;
      nickY = center[1] - size * 0.72;
      nickW = size * 0.5;
      rectData.push(rect(nickX, nickY, nickW, size * 0.15));
      return nickData.push({
        "x": nickX,
        "y": nickY,
        "w": nickW,
        "t": scout
      });
    });
    svg = d3.select("#tile").append("svg").attr("width", 1200).attr("height", 800);
    return _render();
  };

  _render = function() {
    var nicks, rects;
    console.log("Rendering...");
    console.log(hexData.length);
    hexagons = svg.selectAll("polygon").data(hexData);
    hexagons.enter().append("polygon").style("stroke", function(d) {
      return d.color;
    }).style("stroke-width", function(d) {
      return d.thickness;
    }).style("fill", 'none').attr("points", function(d) {
      return d.points.map(function(d) {
        return [d.x, d.y];
      });
    });
    hexagons.exit().remove();
    rects = svg.selectAll("rect").data(rectData);
    rects.enter().append("rect").style("stroke", "gray").style("stroke-width", 1).style("fill", 'none').attr("x", function(d) {
      return d.x;
    }).attr("y", function(d) {
      return d.y;
    }).attr("width", function(d) {
      return d.width;
    }).attr("height", function(d) {
      return d.height;
    });
    rects.exit().remove();
    nicks = svg.selectAll("text").data(nickData);
    nicks.enter().append("text").attr("x", function(d) {
      return d.x;
    }).attr("y", function(d) {
      return d.y;
    }).attr("dx", function(d) {
      return d.w / 2;
    }).attr("dy", "1.2em").attr("text-anchor", "middle").text(function(d) {
      return d.t;
    }).attr("fill", "black");
    return nicks.exit().remove();
  };

  load = function() {
    return d3.json("data/tiles.json").on("load", function(json) {
      return _populate(json);
    }).get();
  };

  load();

  _popTile = function(index) {
    hexData.pop(index);
    hexData.pop(index);
    rectData.pop(index);
    rectData.pop(index);
    return nickData.pop(index);
  };

  popit = function() {
    _popTile(0);
    return _render();
  };

  if (d !== null) {
    clearTimeout(d);
    d = null;
    d = setTimeout(popit, 5000);
  }

}).call(this);
