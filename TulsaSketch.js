var img;
var canvas;
var ii = 0;
var is = 10;
var mapDiv;
var clickX=500;
var clickY=100;
var specialData;
var inp;
var button;
var greeting;
var useDiv;
var feedID, apiKey, chanName;
var hfh, hfv;
var feedDisplay; // array of displayed channels
var useDivPT13;
var useDivPT16;
var useDivPT100;
var useDivPT101;
var useDivPTxx;
var feed13, feed16, feed100, feed101, feedxx;
var xivelyFeeds;


//______________________ preload ___________________________//
function preload()
{


} // function preload()

//______________________ setup ___________________________//
function setup() 
{
  	canvas = createCanvas(800, 800);
	canvas.position(10, 10);
  	
  	// Request the data from openweathermap
	loadJSON('http://api.openweathermap.org/data/2.5/weather?q=Tulsa,ok&units=imperial', gotWeather);
 	
  	feedID = 1879147064; // Special Data
	apiKey = "rOSourU7osPHSsLzveclcZGjVwhLek0GMhUPVhTfWwsMwY6v";
	chanName = 'bootcount';
	loadJSON('https://som.webscript.io/xivelyget?feedID='+feedID+
				'&apiKey='+apiKey+
				'&xivelyChannelName='+chanName, handleSD, 'json');

	img = createImg("SMLOGO.gif"); // load SOM Logo
	img.size(200, AUTO); // Use AUTO to have the height or width auto scale.
	img.position(20, 20); // place SOM Logo
	
	mapDiv = createDiv("<iframe src=\"https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1559232.7164557346!2d-78.72334648750007!3d40.245165495742405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1423505008092\" width=\"600\" height=\"450\" frameborder=\"1\" style=\"border:0\"></iframe>"); 
	mapDiv.position(400, 70);
	
	inp = createInput(); // input box
	inp.position(10, 180);
	inp.value('PowerTest');
	button = createButton('press'); // press button for input from box
	button.position(150, 180);
	
//	useDivPT13 = createDiv('PT13');
//	useDivPT16 = createDiv('PT16');
//	useDivPTxx = createDiv('PTxx');
	
	textAlign(LEFT);
	fill(0);
	textSize(18);
	textFont("Times");
	
} // function setup() 

//______________________ draw ___________________________//
function draw() 
{
  button.mousePressed(getTxt);




} // function draw()

//______________________ Functions ___________________________//
function gotWeather(weather) 
{
  // Get the angle (convert to radians)
  var angle = radians(Number(weather.wind.deg));
  // Get the wind speed
  var windmag = Number(weather.wind.speed);
  
  // Display as HTML elements
  var tempDiv = createDiv(weather.name+
  					" Weather<br>Temp: "+
  					floor(weather.main.temp) + 
  					'&deg;');
  tempDiv.position(400, 10);
  var windDiv = createDiv("Wind " + windmag + " <small>MPH</small>");
  windDiv.position(400, 50);  
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
	feed13 = new XFeed(indent, vert, 'PowerTest13');
//	feed13.mygetdata( );

	feed16 = new XFeed(indent, vert+=vspace, 'PowerTest16');
//	feed16.mygetdata( );

	feed100 = new XFeed(indent, vert+=vspace, 'PowerTest100');
//	feed100.mygetdata( );
	
	feed101 = new XFeed(indent, vert+=vspace, 'PowerTest101');
//	feed101.mygetdata( );
	
} // function handleSD(result) 
//_________________________________________________//
/*
function handleFeed(result) // handle Xively Feed 
{
	var vpos = hfv;
	var hpos = hfh;
//	var vhei = 15;
//	noStroke();
//	colorMode(RGB, 255);
//	var c = color(200, 200);
//	fill(c);

	useDiv.html('Feed result'+
						'<br>ID: '+result.id+
						', Title: '+result.title+
						'<br>Feed Name: '+result.device_serial+
						', Status: '+result.status);
	useDiv.position(hpos, vpos);

} // function handleFeed(result) 
*/
//_________________________________________________//
function getTxt()
{
	
	feedxx = new XFeed(10, 100, inp.value());
//	push();
//	useDiv = useDivPTxx;
//	getFeedInfo(inp.value(), 10, 400);
//	pop();	
}
//_________________________________________________//
/*
function getFeedInfo(feednum, hpos, vpos)
{

	hfv = vpos;
	hfh = hpos;
	if(specialData === undefined)
	{
		return;
	}
	var re = new RegExp('('+feednum+'.+\n)','');

	var IMPinfo = specialData.description.match(re);
	fill(0);
	textSize(15);
	textFont("Helvetica");
	var infoDetail;
	if(IMPinfo == null)
	{
//		text("no match for IMPinfo", hpos, vpos); vpos += vhei;
		useDiv.html('no match for IMPinfo');
		useDiv.position(hpos, vpos);
	} else
	{

		print("line from description: "+IMPinfo[1]);
		infoDetail = split(IMPinfo[1], ', ');
		feedID = infoDetail[1];
		apiKey = infoDetail[2]
		loadJSON('https://som.webscript.io/xivelyget?feedID='+feedID+'&apiKey='+apiKey+'&xivelyChannelName='+chanName, handleFeed, 'json');
	}
}
*/
//_________________________________________________//
// XFeed Class
function XFeed(xpos, ypos, feedname)
{
	this.x = xpos; // remember x
	this.y = ypos; // remember y
	this.myname = feedname; // name of feed: PowerTestxxx
	this.mydiv = createDiv('');
	this.myblock = 0; 
	this.id = 'IDxx';
	this.title = 'titlexx';
	this.status = 'statusxx';
	this.device_serial = 'device_serialxx';
	this.xdata
	
	print('begin name: '+this.myname+'; x: '+this.x+'; y: '+this.y);
	this.mygetdata();
	
} // XFeed Class	
	
	XFeed.prototype.mygetdata = function()
	{
		// Can't display until after callback is done loading JSON data
//		if(this.myblock == 1)
//		{
//			return;
//		}
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
												
			loadJSON('https://som.webscript.io/xivelyget?feedID=' +feedID
						+'&apiKey=' +apiKey
						+'&xivelyChannelName='+chanName, 
						this.getFeed.bind(this), 'json');
						
/*			print('mygetdata name: '+'https://som.webscript.io/xivelyget?feedID=' +feedID
						+'&apiKey=' +apiKey
						+'&xivelyChannelName='+chanName);
*/
		}
	} // this.mygetdata
	
	// callback for loadJSON
	XFeed.prototype.getFeed = function(result) // handle Xively Feed 
	{
//		print('getFeed name: '+this.myname+'; x: '+this.x+'; y: '+this.y+'; ID: '+result.id);
//		this.id = result.id;
//		this.title = result.title;
//		this.status = result.status;
//		this.device_serial = result.device_serial;
		this.xdata = result;
		
		this.mydisplay();		
	} // getFeed

	XFeed.prototype.mydisplay = function()
	{
//		print('mydisplay name: '+this.myname+'; x: '+this.x+'; y: '+this.y+'; ID: '+this.id);
						
		this.mydiv.html('Feed Name: '+this.xdata.device_serial+
						', Status: '+this.xdata.status+
						'<br>X ID: '+this.xdata.id+
						', X Group: '+this.xdata.title+
						'<br>current value: '+this.xdata.datastreams[0].current_value
						);				
		this.mydiv.position(this.x, this.y);
		this.myblock = 0; // unblock
	} // function mydisplay

//_________________________________________________//

//_________________________________________________//

//_________________________________________________//
