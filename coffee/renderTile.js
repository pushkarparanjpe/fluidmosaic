(function() {
  var hexagon, rect, status_colors;

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

  status_colors = {
    "unread": "#ffff80",
    "read": "#ffffff"
  };

  d3.json("data/tiles.json", function(data) {
    var hexData, hexagons, nickData, nicks, polyData, rectData, rects, svg;
    hexData = [];
    rectData = [];
    nickData = [];
    polyData = [];
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
      nickData.push({
        "x": nickX,
        "y": nickY,
        "w": nickW,
        "t": scout
      });
      return polyData.push(hexagon(size * 0.8, center, 0, "", 7));
    });
    svg = d3.select("#tile").append("svg").attr("width", 1200).attr("height", 800);
    hexagons = svg.selectAll("polygon").data(hexData).enter().append("polygon").style("stroke", function(d) {
      return d.color;
    }).style("stroke-width", function(d) {
      return d.thickness;
    }).style("fill", 'none').attr("points", function(d) {
      return d.points.map(function(d) {
        return [d.x, d.y].join(",");
      }).join(" ");
    });
    rects = svg.selectAll("rect").data(rectData).enter().append("rect").style("stroke", "gray").style("stroke-width", 1).style("fill", 'none').attr("x", function(d) {
      return d.x;
    }).attr("y", function(d) {
      return d.y;
    }).attr("width", function(d) {
      return d.width;
    }).attr("height", function(d) {
      return d.height;
    });
    return nicks = svg.selectAll("text").data(nickData).enter().append("text").attr("x", function(d) {
      return d.x;
    }).attr("y", function(d) {
      return d.y;
    }).attr("dx", function(d) {
      return d.w;
    }).attr("dy", "1.2em").attr("text-anchor", "middle").text(function(d) {
      return d.t;
    }).attr("fill", "black");
  });

  'console.log polyData[0].points[0].x\ncircles = svg.selectAll("circle")\n			.data(polyData)\n			.enter()\n			.append("circle")\n			.style("fill", "gray")\n			.style("stroke", "none")\n			.style("stroke-width", 2)\n			.attr("cx",(d) -> (d.points.map((d) -> (d.x)).join(" ")))\n#				.attr("cy",  (d) -> (d.map((d)->d.y)))\n#				.attr("r",  (d) -> (d.map((d)->d.r)))';

}).call(this);
