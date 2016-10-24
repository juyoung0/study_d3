	d3.csv("dream.csv", function(error,data){
		data.forEach(function(d) 
		{ d.frequency = +d.frequency;
		  d.memory = +d.memory;
		  d.action = +d.action;
		  d.lucid = +d.lucid;
		  d.dejavu = +d.dejavu;});

	var w = 1500;
	var h = 650;
	var padding = 20;

	var number = new Array(4);
	
	for(var j=0; j<4; j++){
		number[j] = new Array(3);
		number[j][0] = 1;
		number[j][1] = 1;
		number[j][2] = 1;
	}

	var f, m;
	var maxR = 0;

	for(var i=0; i<data.length; i++){
		f = data[i].frequency-1;
		m = data[i].memory-1;
		number[f][m]++;
		
		if(number[f][m] > maxR)
			maxR = number[f][m];
	}

	for(var k=0; k<4; k++){
		for(var u=0; u<3; u++)
			console.log(number[k][u]);
	}

	var maxX = 1 + d3.max(data, function(d) {return d.frequency;});
	var maxY = 1 + d3.max(data, function(d) {return d.memory;});

	var xScale = d3.scaleLinear()
			.domain([0, maxX])
			.range([padding, w-padding*2]);
	var yScale = d3.scaleLinear()
			.domain([0, maxY])
			.range([h-padding, padding]);
	var rScale = d3.scaleLinear()
			.domain([0, maxR])
			.range([1, 20]);

	var svg = d3.select("#graph")
				.append("svg")
				.attr("width", w)
				.attr("height", h);

	svg.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("cx", function(d) {return xScale(d.frequency);})
		.attr("cy", function(d) {return yScale(d.memory);})
		.attr("r", function(d) {return rScale(number[d.frequency-1][d.memory-1]);})
		.attr("fill", "yellow")
		.attr("stroke", "orange")
		.attr("stroke-width", function(d) {return rScale(number[d.frequency-1][d.memory-1])/2;});

	var xAxis = d3.axisBottom()
				.scale(xScale)
				.ticks(5);
	var yAxis = d3.axisLeft()
				.scale(yScale)
				.ticks(5);

	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(0," + (h-padding) +")")
		.call(xAxis);

	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + padding + ",0)")
		.call(yAxis);

	});

