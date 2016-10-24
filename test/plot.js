d3.csv("seeddataset.csv", function(error,data){
	data.forEach(function(d) 
	{ d.songID = +d.Song_id;
	  d.title = +d.Title;
	  d.artist = +d.Artist;
	  d.valance = +d.Valance;
	  d.arousal = +d.Arousal;
	  d.genre = +d.genre});

var maxX = 1 + d3.max(data, function(d) {return d.valance;});
var maxY = 1 + d3.max(data, function(d) {return d.arousal;});

var rand1, rand2;

for(var i=0; i<data.length; i++){
	
	rand1 = Math.floor(Math.random()*200001 + (-100000));
	rand2 = Math.floor(Math.random()*200001 + (-100000));

	if(data[i].valance+rand1 > 0 && data[i].valance+rand1 < maxX)
		data[i].valance += rand1;

	if(data[i].arousal+rand2 > 0 && data[i].arousal+rand2 < maxY)
		data[i].arousal += rand2;
}

var w = 1500;
var h = 650;
var padding = 20;

var xScale = d3.scaleLinear()
		.domain([0, maxX])
		.range([padding, w-padding]);
var yScale = d3.scaleLinear()
		.domain([0, maxY])
		.range([h-padding, padding]);

var xAxis = d3.axisBottom()
    .scale(xScale)
    .ticks(5);

var yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(5);


var tooltip = d3.select("#graph")
	.append("div")
	.attr("class", "d3-tip");

tooltip.append("div")
	.attr("id", "artist");

tooltip.append("div")
	.attr("id", "title");

var svg = d3.select("#graph")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

svg.selectAll("circle")
	.data(data)
	.enter()
	.append("circle")
	.attr("cx", function(d) {return xScale(d.valance);})
	.attr("cy", function(d) {return yScale(d.arousal);})
	.attr("r", 10)
	.attr("fill", "black")
	.on("mouseover", function(d) {
		d3.select(this)
			.attr("fill", "orange");

		var xPosition = parseFloat(d3.select(this).attr("x"))+10;
		var yPosition = parseFloat(d3.select(this).attr("y"))/2;

		tooltip.select("#artist").html(d.artist);
		tooltip.select("#title").html(d.title);

		tooltip.style("display", "block");
	})
	.on("mouseout", function() {
		d3.select(this)
			.attr("fill", "black");

		tooltip.style("display", "none");
	})
	.on("click", function() {
		d3.select(this)
		.style("fill", "orange")
		.attr("r", 20)
	});


svg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(0," + (h-padding) +")")
	.call(xAxis);

svg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(" + padding + ",0)")
	.call(yAxis);

});

