var img;
var imgScale = .25;
var canvas;
//var ii = 0;
//var is = 10;
var mapDiv;
var clickX=500;
var clickY=100;
var specialData;
var inp;
var button;
var greeting;
var useDiv;
var feedID, apiKey, chanName;
var feed08, feed10, feed13, feed14, feed15, feed16, feed17, feed20, feed100, feed101, feedxx;
var allFeeds = new Array(); // array of feeds
var xivelyFeeds;
var city = 'Indianapolis';
city = 'Upland';
var state = 'IN';
var weatherDiv;


//______________________ preload ___________________________//
function preload()
{
//	img = createImg("SMLOGO.gif"); // load SOM Logo
//	img = loadImage("SMLOGO.gif"); // load SOM Logo
} // function preload()

//______________________ setup ___________________________//
function setup() 
{
  	canvas = createCanvas(1200, 800);
	canvas.position(10, 10);
	background(0, 0, 255, 25);
  	
  	// Request the data from openweathermap
  	weatherDiv = createDiv('');
	loadJSON('http://api.openweathermap.org/data/2.5/weather?q='+city+','+state+'&units=imperial', gotWeather);
	
	// update weather every 60 seconds
 	setInterval("loadJSON(\'http://api.openweathermap.org/data/2.5/weather?q=\'+city+\',\'+state+\'&units=imperial\', gotWeather)", 10*60000);
 	
 	// update feeds every 60 sec
 	setInterval("refreshFeeds()", 10*60000);
 	
  	feedID = 1879147064; // Special Data
	apiKey = "rOSourU7osPHSsLzveclcZGjVwhLek0GMhUPVhTfWwsMwY6v";
	chanName = 'bootcount';
	loadJSON('https://som.webscript.io/xivelyget?feedID='+feedID+
				'&apiKey='+apiKey+
				'&xivelyChannelName='+chanName, handleSD, 'json');
//	img = loadImage("SMLOGO.gif"); // load SOM Logo
//	image(img, 20, 20, 200, 200);

		// createImg does a better job of scaling 
		// image than loadImage
	img = createImg("SMLOGO.gif"); // load SOM Logo
	
//	img.size(200, AUTO); // Use AUTO to have the height or width auto scale.
//	img.position(20, 20); // place SOM Logo
//	img.loadPixels();
	
	mapDiv = createDiv("<iframe src=\"https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1559232.7164557346!2d-78.72334648750007!3d40.245165495742405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1423505008092\" width=\"600\" height=\"450\" frameborder=\"1\" style=\"border:0\"></iframe>"); 
//	mapDiv.position(400, 70);
	
	inp = createInput(); // input box
	inp.position(10, 180);
	inp.value('PowerTest');
	button = createButton('press'); // press button for input from box
	button.position(150, 180);
	
	textAlign(LEFT);
//	fill(0);
	textSize(18);
	textFont("Times");
	
} // function setup() 

//______________________ draw ___________________________//
function draw() 
{
  button.mousePressed(getTxt);
  if (mouseIsPressed)
  {
  	print('--Mouse pressed');
  }
  if(touchIsDown)
  {
  	print('**touch is down');
  }
	  background(255, 255, 255); // blank screen white
	  background(0, 0, 255, 25); // lay down background color
//	  feed13.dispDiv();
//	  feed14.dispDiv();
//	  feed15.dispDiv();
//	  feed16.dispDiv();
//	  feed100.dispDiv();
//	  feed101.dispDiv();
//	  feedxx.dispDiv();
//	  for(var f in allFeeds)
//	  {
//	  	f.dispDiv();
//	  }
	  for (var i=0; i<allFeeds.length; i++)
	  {
	  	allFeeds[i].dispDiv();
	  }
	  mapDiv.position(400, 70);
//	  img = createImg("SMLOGO.gif"); // load SOM Logo
	  img.size(200, AUTO); // Use AUTO to have the height or width auto scale.
	  img.position(20, 20); // place SOM Logo
//	  image(img, 20, 20, 1033*imgScale, 317*imgScale);
//	  image(img, 20, 20, 200, 50);
//	img.size(200, AUTO); // Use AUTO to have the height or width auto scale.
//	img.position(20, 20); // place SOM Logo

} // function draw()

//______________________ Functions ___________________________//
function gotWeather(weather) 
{
  // Get the angle (convert to radians)
  var angle = radians(Number(weather.wind.deg));
  // Get the wind speed
  var windmag = Number(weather.wind.speed);
  var timeinfo = new Date();
  // Display as HTML elements
//  var tempDiv = createDiv(weather.name+
  weatherDiv.html(weather.name+
  					" Weather: Temp: "+
  					floor(weather.main.temp) + 
  					'&deg;<br>Wind '+ windmag + 
					' <small>MPH</small>'+
					'<br>Time: '+timeinfo
					);
//  tempDiv.position(400, 15);
  weatherDiv.position(400, 15);
//  var windDiv = createDiv("Wind " + windmag + " <small>MPH</small>");
//  windDiv.position(400, 50);  
  // Make a vector
//  wind = p5.Vector.fromAngle(angle);
}
//_________________________________________________//
function handleSD(result) // handle SpecialData Xively Feed only
{
	var vpos = 550;
	var hpos = 400;
	var vhei = 15;
	specialData = result;
	
//	var tempDiv = createDiv('Special Data result'+
		var tempDiv = createDiv('Special Data result'+
						'<br>ID: '+result.id+
						'<br>Title: '+result.title+
						'<br>Feed Name: '+result.device_serial+
						'<br>Status: '+result.status);
	tempDiv.position(hpos, vpos);
	
	// At this point, we have Special Data, so we can
	// now access all the feeds pointed to within
	// the Special Data list
	
	// Now call Xively feeds
	var indent = 10;
	var vert = 210;
	var vspace = 60;
	feed08 = new XFeed(indent, vert, 'PowerTest08'); allFeeds.push(feed08);
	feed08.mygetdata();
//	feed08.mousePressed();
	feed10 = new XFeed(indent, vert+=vspace, 'PowerTest10'); allFeeds.push(feed10);
	feed10.mygetdata();
	feed13 = new XFeed(indent, vert+=vspace, 'PowerTest13'); allFeeds.push(feed13);
	feed13.mygetdata();
	feed14 = new XFeed(indent, vert+=vspace, 'PowerTest14'); allFeeds.push(feed14);
	feed14.mygetdata();
	feed15 = new XFeed(indent, vert+=vspace, 'PowerTest15'); allFeeds.push(feed15);
	feed15.mygetdata();
	feed16 = new XFeed(indent, vert+=vspace, 'PowerTest16'); allFeeds.push(feed16);
	feed16.mygetdata();
	feed17 = new XFeed(indent, vert+=vspace, 'PowerTest17'); allFeeds.push(feed17);
	feed17.mygetdata()
	feed20 = new XFeed(indent, vert+=vspace, 'PowerTest20'); allFeeds.push(feed20);
	feed20.mygetdata();
	feed100 = new XFeed(indent, vert+=vspace, 'PowerTest100'); allFeeds.push(feed100);
	feed100.mygetdata();
	feed101 = new XFeed(indent, vert+=vspace, 'PowerTest101'); allFeeds.push(feed101);
	feed101.mygetdata();
//	feedxx = new XFeed(10, 100, 'feedxx'); allFeeds.push(feedxx);
} // function handleSD(result) 
//_________________________________________________//
function getTxt()
{
	
//	feedxx = new XFeed(10, 100, inp.value());
	feedxx.mygetdata(inp.value());
//	push();
//	useDiv = useDivPTxx;
//	getFeedInfo(inp.value(), 10, 400);
//	pop();	
}

function refreshFeeds()
{
	for (var i=0; i<allFeeds.length; i++)
	  {
	  	allFeeds[i].mygetdata();
	  }
}
//_________________________________________________//
// XFeed Class
function XFeed(xpos, ypos, feedname)
{
	this.x = xpos; // remember x
	this.y = ypos; // remember y
	this.myname = feedname // name of feed: PowerTestxxx
//	this.myname = feedname; // name of feed: PowerTestxxx
	this.mydiv = createDiv('');
//	this.myblock = 0; 
//	this.id = 'IDxx';
//	this.title = 'titlexx';
//	this.status = 'statusxx';
//	this.device_serial = 'device_serialxx';
	this.xdata
	
//	print('begin name: '+this.myname+'; x: '+this.x+'; y: '+this.y);
//	this.mygetdata(); // prepare for getting data from Xively feeds thru Webscript
	
} // XFeed Class	
	
//	XFeed.prototype.mygetdata = function(feedname)
	XFeed.prototype.mygetdata = function()
	{
//		this.myname = feedname; // name of feed: PowerTestxxx
		this.boxon = true;
		this.myrect;
		print('begin name: '+this.myname+'; x: '+this.x+'; y: '+this.y);
		// Can't display until after callback is done loading JSON data

		// Can't display without specialData
//		print('mydisplay name: '+this.myname+'; x: '+this.x+'; y: '+this.y);

		// locate PowerTest name in Special Data
		var re = new RegExp('('+this.myname+'.+\n)','');
		var IMPinfo = specialData.description.match(re);
//		print('regexp name: '+this.myname+'; x: '+this.x+'; y: '+this.y);
		if( IMPinfo == null)
		{
			this.mydiv.html('no match for IMPinfo');
			this.mydiv.position(this.x, this.y);
		} else
		{
			var infoDetail = split(IMPinfo[1], ', ');
			var feedID = infoDetail[1];
			var apiKey = infoDetail[2];
			var chanName = 'bootcount';
				// set up callback getFeed							
			loadJSON('https://som.webscript.io/xivelyget?feedID=' +feedID
						+'&apiKey=' +apiKey
						+'&xivelyChannelName='+chanName, 
							// bind makes sure we can reference 'this' inside getFeed
						this.getFeed.bind(this), 'json');
		}
	} // this.mygetdata
	
	// callback for loadJSON
	XFeed.prototype.getFeed = function(result) // handle Xively Feed 
	{
		this.xdata = result; // stash Xively info
		this.mydisplay();	// Display the info	
	} // getFeed

	XFeed.prototype.mydisplay = function()
	{
//		print('mydisplay name: '+this.myname+'; x: '+this.x+'; y: '+this.y+'; ID: '+this.id);
						
//		var c;
		if (this.xdata.status == 'live')
		{
			this.boxColor = color(0, 255, 0, 100);
		} else
		{
			this.boxColor = color(255, 0, 0, 100);
		}
		noStroke();
		fill(this.boxColor);
		rect(this.x-10, this.y-10, 300, 55);
		this.mydiv.html('Feed Name: '+this.xdata.device_serial+
						', Status: '+this.xdata.status+
						'<br>X ID: '+this.xdata.id+
						', X Group: '+this.xdata.title+
						'<br>current value: '+this.xdata.datastreams[0].current_value
						);				
		this.mydiv.position(this.x, this.y);
		this.mydiv.size(300, 55);
		this.mydiv.style("color", "#000000");
//		this.mydiv.background(255, 0, 0, 100);
			// bind makes sure we can reference 'this' inside mousePressed
		this.mydiv.mousePressed(xfmousePressed.bind(this));
	} // function mydisplay

	XFeed.prototype.dispDiv = function()
	{
		noStroke();
		fill(this.boxColor);
		rect(this.x-10, this.y-10, 300, 55);
		this.mydiv.position(this.x, this.y);
	}

	// Called from XFeed.prototype.mydisplay = function()
	function xfmousePressed()
//	XFeed.prototype.mousePressed = function() // handle mousepressed for Xfeed
	{
		noStroke();
		print('in mousePressed: x: '+this.x+', y: '+this.y+', name: '+this.myname);
		if (this.boxon)
		{
		var c = color(0, 0, 255, 50);
		fill(c);
//		this.myrect = rect(this.x+300, this.y, 400, 70);
		rect(this.x+300, this.y-10, 400, 55);
		this.mydiv.html('Feed Name: '+this.xdata.device_serial+
						', Status: '+this.xdata.status+
						'<br>X ID: '+this.xdata.id+
						', X Group: '+this.xdata.title+
						'<br>current value: '+this.xdata.datastreams[0].current_value
						);
		} else
		{
		var t = new Date(this.xdata.datastreams[0].at);
		var c = color(0, 255, 255, 100);
		fill(c);
		rect(this.x+300, this.y-10, 400, 55);
		this.mydiv.html('Feed Name: '+this.xdata.device_serial+
						', Status: '+this.xdata.status+
//						'<br> Time: '+this.xdata.datastreams[0].at+
						'<br>'+t+
						'<br>current value: '+this.xdata.datastreams[0].current_value
						);
		}
		this.boxon = !this.boxon;
			
	} // function mousePressed

//_________________________________________________//
function touchStarted()
{
	print('^^Touch started');
}
//_________________________________________________//

//_________________________________________________//
/*
// Current value information
{"id":782253294,
"title":"Power Test",
"private":"true",
"tags":["20000c2a690885a3"],
"feed":"https://api.xively.com/v2/feeds/782253294.json",
"status":"live",
"updated":"2015-03-03T14:31:03.385572Z",
"created":"2015-01-20T06:42:00.094659Z",
"creator":"https://xively.com/users/knighthawk",
"version":"1.0.0",

"datastreams":[{
	"id":"bootcount",
	"current_value":"1520",
	"at":"2015-03-03T14:31:03.044467Z",
	"max_value":"3564.0",
	"min_value":"0.0"}],

"product_id":"if4ktGil5ZT0Bs282X3B",
"device_serial":"PowerTest101"}
*/
//_________________________________________________//
// Data dump for a channel
{"id":"bootcount","current_value":"15","at":"2015-03-05T16:49:04.246346Z","max_value":"3187.0","min_value":"0.0",
"datapoints":[{"value":"892","at":"2015-03-05T10:51:03.058165Z"},{"value":"893","at":"2015-03-05T10:53:04.362077Z"},
{"value":"894","at":"2015-03-05T10:55:03.595597Z"},{"value":"895","at":"2015-03-05T10:57:03.400887Z"},
{"value":"896","at":"2015-03-05T10:59:03.464678Z"},{"value":"897","at":"2015-03-05T11:01:03.128932Z"},
{"value":"898","at":"2015-03-05T11:03:02.920602Z"},{"value":"899","at":"2015-03-05T11:05:03.981708Z"},
{"value":"900","at":"2015-03-05T11:07:04.093320Z"},{"value":"901","at":"2015-03-05T11:09:04.013846Z"},
{"value":"902","at":"2015-03-05T11:11:03.943392Z"},{"value":"903","at":"2015-03-05T11:13:04.241676Z"},
{"value":"904","at":"2015-03-05T11:15:03.136252Z"},{"value":"905","at":"2015-03-05T11:17:06.025242Z"},
{"value":"906","at":"2015-03-05T11:19:05.328071Z"},{"value":"907","at":"2015-03-05T11:21:03.198729Z"},
{"value":"908","at":"2015-03-05T11:23:03.007931Z"},{"value":"909","at":"2015-03-05T11:25:03.271955Z"},
{"value":"910","at":"2015-03-05T11:27:02.428906Z"},{"value":"911","at":"2015-03-05T11:29:03.604450Z"},
{"value":"912","at":"2015-03-05T11:31:03.208890Z"},{"value":"913","at":"2015-03-05T11:33:03.244784Z"},
{"value":"914","at":"2015-03-05T11:35:02.399250Z"},{"value":"915","at":"2015-03-05T11:37:02.095253Z"},
{"value":"916","at":"2015-03-05T11:39:04.714541Z"},{"value":"917","at":"2015-03-05T11:41:03.494035Z"},
{"value":"918","at":"2015-03-05T11:43:03.792180Z"},{"value":"919","at":"2015-03-05T11:45:02.651532Z"},
{"value":"920","at":"2015-03-05T11:47:04.460461Z"},{"value":"921","at":"2015-03-05T11:49:03.664701Z"},
{"value":"922","at":"2015-03-05T11:51:03.472972Z"},{"value":"923","at":"2015-03-05T11:53:03.614927Z"},
{"value":"924","at":"2015-03-05T11:55:03.531370Z"},{"value":"925","at":"2015-03-05T11:57:02.603596Z"},
{"value":"926","at":"2015-03-05T11:59:03.531459Z"},{"value":"927","at":"2015-03-05T12:01:03.805760Z"},
{"value":"928","at":"2015-03-05T12:03:03.606885Z"},{"value":"929","at":"2015-03-05T12:05:02.985538Z"},
{"value":"930","at":"2015-03-05T12:07:03.918246Z"},{"value":"931","at":"2015-03-05T12:09:03.619429Z"},
{"value":"40","at":"2015-03-05T14:10:16.126514Z"},{"value":"41","at":"2015-03-05T14:12:05.566650Z"}],"version":"1.0.0"}

//_________________________________________________//
