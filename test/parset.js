var w = 1500;
var h = 650;
var padding = 20;

$.getScript("d3.parsets.js", function(){
	alert("Script loaded");
});

var vis = d3.select("#graph").append("svg")
	.attr("width", w)
	.attr("width", h);

var chart = d3.parsets()
	.dimensions(["Frequency", "Memory", "Act", "Lucid", "Dejavu"]);


d3.csv("dream.csv", function(error,data){
	data.forEach(function(d)
	{ d.frequency = +d.frequency;
	d.memory = +d.memory;
	d.action = +d.action;
	d.lucid = +d.lucid;
	d.dejavu = +d.dejavu;});

	vis.datum(data).call(chart);

	});

