#Geometry Functions#

# Defining a Hexagon function
hexagon = (size, center, thickness, color, radius) ->
	# Setting up angles to get polygon vertices
	circle = 2 * Math.PI
	angle = circle / 6
	hexobj = { "points":[], "thickness":thickness, "color":color}

	# With the hexagon defined we iterate through
	# the 6 vertices to get the ith vertice we want. 
	for i in [0..5]
		x = (Math.cos(angle * i) * size) + center[0]
		y = (Math.sin(angle * i) * size) + center[1]
		hexobj.points[i] = {"x": x, "y": y, "r":radius}
	#console.log hexobj
	return hexobj

	
# Defining a Rectangle function
rect = (x, y, width, height) ->
	rectobj = {"x":x,"y":y,"width":width,"height":height}
	return rectobj
		
#END Geometry Functions#



#Utility dicts/arrays
status_colors = {"unread":"#ffff80","read":"#ffffff",}
#END Utility dicts/arrays


#Load JSON Data file
d3.json "data/tiles.json", (data) ->

	#Data Holders
	hexData = []
	rectData = []
	nickData = []
	polyData = []
	#END Data Holders

	#Populate Data Holders
	#Loop over all Tiles
	data.tiles.forEach (tile) ->

		#console.log tile
		size = 150
		center = tile.loc_xyz
		cat_color = tile.cat_color
		status = tile.status
		scout = tile.scout
		
		# Main hexagon data
		# representing category label (color)
		hexData.push(hexagon(size,center,8,cat_color))

		# Inner hexagon data
		# representing read/unread status
		hexData.push(hexagon(size*0.95,center,6,status_colors[status]))

		# Rectangle data
		# placeholder frame for Content
		rectData.push(rect(center[0]-size*1.0/2, center[1]-size*1.0/2, size*1.0, size*1.0))
		
		# Rectangle data
		# placeholder for Scout nickname
		nickX = center[0]-size*0.5/2
		nickY = center[1]-size*0.72
		nickW = size*0.5
		rectData.push(rect(nickX, nickY, nickW, size*0.15))
	
		# Scout nickname text data
		nickData.push({"x":nickX,"y":nickY,"w":nickW,"t":scout})
	
		# Six corner placeholder circles data
		# for [MOVE tile, DELETE tile, Discuss, Share, Source, Emblem]
		# listed in clockwise order
		polyData.push(hexagon(size*0.8,center,0,"",7))

	#END Populate Data Holders


	#Render Shapes
	# Creating the d3.js object that will be called in a div class
	# called "tile".
	svg = d3.select("#tile")
			.append("svg")
			.attr("width", 1200)
			.attr("height", 800)
	
	hexagons = svg.selectAll("polygon")
				.data(hexData)
				.enter()
				.append("polygon")
				.style("stroke", (d) -> (d.color))
				.style("stroke-width", (d) -> (d.thickness))
				.style("fill", 'none')
				#Generalized to add multiple hexagon tiles
				.attr("points",(d) -> (d.points.map((d) -> ([d.x, d.y]).join(",")).join(" ")))
	#console.log hexagons.attr("points")
	
	rects = svg.selectAll("rect")
				.data(rectData)
				.enter()
				.append("rect")
				.style("stroke", "gray")
				.style("stroke-width", 1)
				.style("fill", 'none')
				.attr("x", (d) -> (d.x))
				.attr("y", (d) -> (d.y))
				.attr("width", (d) -> (d.width))
				.attr("height", (d) -> (d.height))

	nicks = svg.selectAll("text")
				.data(nickData)
				.enter()
				.append("text")
				.attr("x", (d) -> (d.x))
				.attr("y", (d) -> (d.y))
				.attr("dx", (d) -> (d.w))
				.attr("dy", "1.2em")
				.attr("text-anchor", "middle")
				.text((d) -> (d.t))
				.attr("fill", "black")
'''
	console.log polyData[0].points[0].x
	circles = svg.selectAll("circle")
				.data(polyData)
				.enter()
				.append("circle")
				.style("fill", "gray")
				.style("stroke", "none")
				.style("stroke-width", 2)
				.attr("cx",(d) -> (d.points.map((d) -> (d.x)).join(" ")))
#				.attr("cy",  (d) -> (d.map((d)->d.y)))
#				.attr("r",  (d) -> (d.map((d)->d.r)))
'''
	#END Render Shapes
