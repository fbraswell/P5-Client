/*
var feedID, apiKey, chanName;
var feedNames = ['PowerTest08', 'PowerTest10', 'PowerTest13', 'PowerTest14', 
					'PowerTest15', 'PowerTest16', 'PowerTest17', 'PowerTest20', 
					'PowerTest100', 'PowerTest101'];
*/
var globalCity = 'Indianapolis';
globalCity = 'Upland';
var globalState = 'IN';


//______________________ preload ___________________________//
function preload()
{


} // function preload()

//______________________ setup ___________________________//
function setup() 
{
  		// send canvas size w, h, x, y
  	var ic = new myController(1000, 800, 0, 0);
  		
} // function setup() 

//______________________ draw ___________________________//
function draw() 
{
  
} // function draw()

//______________________ Functions ___________________________//


//______________________ ***** ___________________________//
//______________________ Model ___________________________//
//______________________ ***** ___________________________//


//____________________Weather Class Model_____________________________//
// fetch weather information
function weatherModel(city, state, callback)
{
	// initialize section
	this.city = city;
	this.state = state;
	this.angle; // wind direction
	this.speed; // wind speed
	this.temp; // temperature
	this.timeWeather; // time of weather report
//	callback.weather('cbloc', 'cbtemp', 'cbspeed', 'cbtime');
	this.callback = callback;
	
//	this.getWeatherData(); // get the first weather report
}
weatherModel.prototype.getWeatherData = function()
{
	loadJSON('http://api.openweathermap.org/data/2.5/weather?q='+this.city+','+this.state+'&units=imperial', this.weatherData.bind(this));
//	print('&&& fetch weather data');
//	this.callback.weather('cbloc', 'cbtemp', 'cbspeed', 'cbtime');
}
weatherModel.prototype.weatherData = function(result)
{
	this.timeWeather = new Date(); // most recent time weather checked
	this.angle = radians(Number(result.wind.deg));
	this.speed = Number(result.wind.speed);
	this.temp = floor(result.main.temp);
	this.callback.weather(this.city, this.temp, this.speed, this.timeWeather);
//	print('*** in weatherData city: '+this.city+' state: '+this.state+' temp: '+this.temp);
}

//____________________Special Data Class Model_____________________________//
// fetch Xively Special Data table which associates Imps with Xively feeds
function specialDataModel(callback)
{
	this.specialDataTable;
	this.callback = callback;
}
	// get the special data table from specific Xively feed (through Webscript interface)
specialDataModel.prototype.getSD = function()
{
		// fetch the table from a special Xively feed
		// see information at end of this file for table example
	var feedID = 1879147064; // Special Data
	var apiKey = "rOSourU7osPHSsLzveclcZGjVwhLek0GMhUPVhTfWwsMwY6v";
	var chanName = 'bootcount';
	loadJSON('https://som.webscript.io/xivelyget?feedID='+feedID+
				'&apiKey='+apiKey+
				'&xivelyChannelName='+chanName, this.sdCallback.bind(this), 'json');
}
	// callback function that receives Xively table data
specialDataModel.prototype.sdCallback = function(result)
{
	this.specialDataTable = result;	
		// call controller back with status
	this.callback.getFeeds('received'); // return status data
//	print('*** in sdCallback - name: '+result.title);
}
	// return information for specific feed
	// return feedID and api key from table
specialDataModel.prototype.sdGetKey = function(feedName)
{
	var re = new RegExp('('+feedName+'.+\n)','');
	var IMPinfo = this.specialDataTable.description.match(re);
	if (IMPinfo == null)
	{
		return {feedID: null, apiKey: null};
	} else // found info in table
	{
		var infoDetail = split(IMPinfo[1], ', ');
//		var feedID = infoDetail[1];
//		var apiKey = infoDetail[2];
		return {feedID: infoDetail[1], apiKey: infoDetail[2]};
	}
}
/*
	// nouse
specialDataModel.prototype.getFeed = function(accessInfo)
{
		// accessInfo =  {feedID: id, apiKey: key}
		// set up callback getFeed	
		var chanName = 'bootcount';						
	loadJSON('https://som.webscript.io/xivelyget?feedID=' +accessInfo.feedID
				+'&apiKey=' +accessInfo.apiKey
				+'&xivelyChannelName='+chanName, 
					// bind makes sure we can reference 'this' inside getFeed
				this.feedCallback.bind(this), 'json');
}
specialDataModel.prototype.feedCallback = function(result)
{
	
}
*/
//____________________Xively Feed Class Model_____________________________//
// fetch Xively feed and channel information
function feedModel()
{
	
}

//____________________Map Class Model_____________________________//
// fetch Google Map information
function mapModel()
{
	
}
//______________________ ***** ___________________________//
//______________________ View  ___________________________//
//______________________ ***** ___________________________//

//____________________Canvas View Class_____________________________//
// Handle layout of the basic Canvas



//____________________Screen View Class_____________________________//
// Determines the initial layout of the main view for desktop/laptop
function myScreenView(w, h, x, y)
{
	// initialization section
	this.canvasW = w;
	this.canvasH = h;
	this.canvasX = x;
	this.canvasY = y;
	
	var canvas = createCanvas(this.canvasW, this.canvasH);
	canvas.position(this.canvasX, this.canvasY);
	background(0, 0, 255, 50);
	
//	textAlign(LEFT);
//	textSize(12);
//	textFont("Times");
	
	this.logoX = 20;
	this.logoY = 20;
	var img = createImg("SMLOGO.gif"); // load SOM Logo
	img.size(200, AUTO); // Use AUTO to have the height or width auto scale.
	img.position(this.logoX, this.logoY); // place SOM Logo
	
	// add weather location
	this.weatherX = 600;
	this.weatherY = 20
	this.weatherDiv = createDiv('');
	this.weather('Location NA', 'NA', 'NA', 'NA');
	
	// add map location
	this.mapX = 400;
	this.mapY = 100;
	
	// add special data
	this.sdX = 20;
	this.sdY = 80;
	this.sd = createDiv('');
	this.specialData('waiting');
	
	// add feed info boxes
		// this is thelocation of the first box
	this.infoX = 10;
	this.infoY = 210;
	
	this.inBoxX = 20;
	this.inBoxY = 180;
	// add input box
	this.inBox = createInput(); // input box
	this.inBox.position(this.inBoxX, this.inBoxY);
	this.inBox.value('PowerTest');
	
	this.inBoxButtonX = 160;
	this.inBoxButtonY = 180;
	// add input button
	this.inBoxButton = createButton('press'); // press button for input from box
	this.inBoxButton.position(this.inBoxButtonX, this.inBoxButtonY);	
}	// end function myScreenView(w, h, x, y)
	// Display weather info
myScreenView.prototype.weather = function(loc, temp, speed, time)
{
	this.weatherDiv.html(loc+
  					" Weather: Temp: "+
  					temp + 
  					'&deg;<br>Wind '+ speed + 
					' <small>MPH</small>'+
					'<br>Time: '+time
					);
//  tempDiv.position(400, 15);
  	this.weatherDiv.position(this.weatherX, this.weatherY);
}
	// display Special Data status info
myScreenView.prototype.specialData = function(status)
{
	// simple notification on screen that special data is avail
	this.sd.html(status+' SpecialData');
	this.sd.position(this.sdX, this.sdY);
}
myScreenView.prototype.initFeedLocation = function()
{
	return {x: this.infoX, y: this.infoY};
}
	// display feed info box
myScreenView.prototype.feedInfo = function(x, y, infoTable)
{
	// infoTable
	// boxColor, feedName, feedStatus, feedID, feedGroup, feedValue
	
}
// place the map
myScreenView.prototype.mapView = function(div)
{
	div.position(this.mapX, this.mapY);
}
//____________________Mobile View Class_____________________________//
// Determine the initial layout of the main view for phone

//____________________Pad View Class_____________________________//
// Determine the initial layout of the main view for pads


//____________________Data Feed Class_____________________________//
// Handle data and layout of the basic feed information
// boxNumber is the array position - can be used to locate
// feed boxes relative to each other
function dataFeed(initView, boxNumber)
{
		// request first box location
		// returns {x: this.infoX, y: this.infoY}
	this.loc = initView.initFeedLocation();	
		// which one of the dataFeed box objects is this
	this.boxNumber = boxNumber;
	this.myW = 300; // box width determined here
	this.myH = 55; // box height determined here
	this.myYGap = 4; // gap between boxes
		// calculate following box locations based
		// on location of first box
		// each box moves down by 1 box height
	this.myX = this.loc.x; // initial x location saved here
		// the y location is the initial x plus box height time boxNumber
		// the boxNumber increments by 1 for each new box created
	this.myY = this.loc.y + (this.boxNumber * (this.myH + this.myYGap)); // initial y location saved here
	
	this.myData; // data table
	this.myFeedDiv = createDiv('');
		// make div clickable
	this.myFeedDiv.mousePressed(this.myMousePressed.bind(this));
//	print('^^^ loc x: '+this.loc.x+' loc y: '+this.loc.y);
//	print('^^^ myX: '+this.myX+' myY: '+this.myY+' box#: '+this.boxNumber);
}
	// create the feed view
dataFeed.prototype.makeFeedView = function(infoTable)
{
	// infoTable
	// boxColor, feedName, feedStatus, feedID, feedGroup, feedValue
	this.feedName = infoTable.feedName; 
	noStroke();
	fill(infoTable.boxColor);
	rect(this.myX, this.myY, this.myW, this.myH);
	
	this.myFeedDiv.html('Feed Name: '+infoTable.feedName+
						', Status: '+infoTable.feedStatus+
						'<br>X ID: '+infoTable.feedID+
						', X Group: '+infoTable.feedGroup+
						'<br>current value: '+infoTable.feedValue
						);				
		this.myFeedDiv.position(this.myX, this.myY);
		this.myFeedDiv.size(this.myW, this.myH);
		this.myFeedDiv.style("color", "#000000"); // black type
}

	// get the feed data
dataFeed.prototype.getFeedData = function(accessInfo)
{
		// accessInfo =  {feedID: id, apiKey: key}
		// set up callback getFeed	
	var chanName = 'bootcount';						
	loadJSON('https://som.webscript.io/xivelyget?feedID=' +accessInfo.feedID
				+'&apiKey=' +accessInfo.apiKey
				+'&xivelyChannelName='+chanName, 
					// bind makes sure we can reference 'this' inside getFeed
				this.feedCallback.bind(this), 'json');
}

dataFeed.prototype.feedCallback = function(result)
{
	this.myFeedData = result;
	// infoTable:  boxColor, feedName, feedStatus, feedID, feedGroup, feedValue
/*
	print('Feed Name: '+this.myFeedData.device_serial+
						', Status: '+this.myFeedData.status+
						'<br>X ID: '+this.myFeedData.id+
						', X Group: '+this.myFeedData.title+
						'<br>current value: '+this.myFeedData.datastreams[0].current_value
						);
*/
	var red = color(255, 0, 0, 200);
	var green = color(0, 255, 0, 25);
	this.makeFeedView({boxColor: this.myFeedData.status == 'live'?green:red,
							feedName: this.myFeedData.device_serial,
							feedStatus: this.myFeedData.status,
							feedID: this.myFeedData.id,
							feedGroup: this.myFeedData.title,
							feedValue: this.myFeedData.datastreams[0].current_value});
}

dataFeed.prototype.myMousePressed = function()
{
	print('### mouse pressed '+this.feedName);
}


//____________________Map View Class_____________________________//
// Handle layout of the basic Map data


//____________________Special Data View Class_____________________________//
// Handle layout of the basic Special data



//____________________Weather View Class_____________________________//
// Handle layout of the basic Weather data



//____________________Logo View Class_____________________________//
// Handle layout of the basic Logo data


//______________________ ********** ___________________________//
//______________________ Controller ___________________________//
//______________________ ********** ___________________________//


//____________________Init myController Class_____________________________//
// init view and view elements
// initial canvas width, height, x and y
function myController(w, h, x, y)
{
	// init screen
	this.mySView = new myScreenView(w, h, x, y);
	
	// get sd
	this.mySData = new specialDataModel(this);
	this.sdController(); // fetch special data
	
	// individual feed information happens after 
	// special data is fetched
	
	// get weather
	this.weather = new weatherModel(globalCity, globalState, this.mySView);
	this.weatherController();
	
	this.feedNames = ['PowerTest08', 'PowerTest10', 'PowerTest13', 'PowerTest14', 
					'PowerTest15', 'PowerTest16', 'PowerTest17', 'PowerTest20', 
					'PowerTest100', 'PowerTest101'];
	this.allFeedObjs = []; // array of feed objects
	for (var i = 0; i<this.feedNames.length; i++)
	{
			// init objects
		feedObj = new dataFeed(this.mySView, i);
			// keep array of feed objects
		this.allFeedObjs.push(feedObj);
			// infoTable:  boxColor, feedName, feedStatus, feedID, feedGroup, feedValue
			// display init feed box
		feedObj.makeFeedView({boxColor: color(0, 255, 0, 100),
							feedName: this.feedNames[i],
							feedStatus: 'NA',
							feedID: 'NA',
							feedGroup: 'NA',
							feedValue: 'NA'});
	}
	
	// get map
	this.mapController();
	
	// DEBUG need to figure out how to handle this context when called
		// update feeds every 10 min - 10*60000
// 	setInterval("this.getFeeds", 10000);
 	
 	// update weather every 60 seconds - 10*60000
// 	setInterval("loadJSON(\'http://api.openweathermap.org/data/2.5/weather?q=\'+city+\',\'+state+\'&units=imperial\', weather.getWeatherData)", 10000);

	print('CodeName: '+navigator.appCodeName+' appName: '+navigator.appName+' online: '+navigator.onLine);
	print('Platform: '+navigator.platform+' version: '+navigator.appVersion);
	print('User Agent Header: '+navigator.userAgent);
	print('Cookies enables: '+navigator.cookieEnabled+' Language: '+navigator.language);
} // end function myController(w, h, x, y)

	// get map & display
myController.prototype.mapController = function()
{
	this.mapDiv = createDiv("<iframe src=\"https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1559232.7164557346!2d-78.72334648750007!3d40.245165495742405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1423505008092\" width=\"600\" height=\"450\" frameborder=\"1\" style=\"border:0\"></iframe>"); 
	this.mySView.mapView(this.mapDiv);
	print('@@@ in mapController2');
}

myController.prototype.weatherController = function()
{
	// initiate request for weather data
	this.weather.getWeatherData();
	print('@@@ in weatherController');
}

myController.prototype.sdController = function()
{
	// initiate request for Special Data
	this.mySData.getSD();
}

	// the feeds cannot be gotten until the
	// special data is returned
	// this procedure is called(back) after special data is fetched
myController.prototype.getFeeds = function(status)
{
	this.mySView.specialData(status); // display status data from SD read
	
	// now we can fetch info from table
	// get feed information	
	
	for (var i = 0; i<this.feedNames.length; i++)
	{
			// first get the Xively feedID and api key from special data table
			// accessInfo =  {feedID: id, apiKey: key}
		var accessInfo = this.mySData.sdGetKey(this.feedNames[i]);
		print('Feed Name: '+this.feedNames[i]+', Feed ID: '+accessInfo.feedID+', apiKey: '+accessInfo.apiKey);
		
			// next send that off to fetch data from model
		this.allFeedObjs[i].getFeedData(accessInfo);
	}
		
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
/*
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
*/
//_________________________________________________//
// Data from the Xively Special Data feed
// This feed links Xively Feeds with specific Imp modules
/*
ImpID,       XivelyName,  XivelyFeed,      XivelyApiKey,   IMP_SAMPLE_PER, IMP_XMIT_PER, IMP_MODE, IMP_ANALOG1_THRESHOLD, IMP_ANALOG1_RANGE

anyimp, SpecialData,   1879147064, rOSourU7osPHSsLzveclcZGjVwhLek0GMhUPVhTfWwsMwY6v

235e9deb6e4936ee, WM235e9,   1932829324, 8HqPPy2ymRbzqZhT2TtdWM5h193oJmf8uQhoSdvtfxc9bAYA

23219ab236a7c9ee, WM23219, 343437348, WlnQANSpdLKnerPxm62yhaxVVwEojtBjQT0Okru4zt7WDKwh

232fb6eb6e4936ee, WM232fb, 319480845, imq2EHlYF7DzOtT66QUM9GY7CvgIA8kFXSzHhVldfXhpfVd7

2336a--aeb6e4936ee, FMB2336a,  34180263, M66WzsVccVCQzVjY8p27OREmZmNJ6Pjq0eW8TsPnofAAmHBw

2334c--0eb6e4936ee, FMB2334c, 1927826986, Ndm0VPSECC7fZXCJDybhuE518iqtqRtZOMd9U2kd4seeejdv

23748beb6e4936ee, PowerTest, 114901326, gEb1KKXaYAzW4oDiZyC54wTDw1EZEel0IVGAFaoapoVwLKAa, 10, 60, 0
*/
//_________________________________________________//


