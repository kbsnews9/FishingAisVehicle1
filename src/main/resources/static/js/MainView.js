
var sidebarView = false;
var vhclePopupView = false;
var map;

var selectShip;

var selectShipData;

var vhcleHistoryList;

var docV = document.body;

var currentMarkerMap = {};
var currentMarkerList = [];
var histMarkerList = [];
var mapLocationList = [];
var mapLabelList= {};
var strokeColors = ["#FF5E00","#0100FF","#FFE400","#1DDB16","#FF007F"];
var poliLineList = [];

var currentTimer;


var histGetMmsi;
var historyInfoWindow;

var markerLabelChecker = false;
var currentMarkerChecker = true;
var historyLabelChecker = false;

var searchList = [];

var updateChecker = 0;

var hist_stop_checker=false;
var hist_slow_checker=false;
var hist_fast_checker=false;

var hist_stop_marker_list=[];
var hist_slow_marker_list=[];
var hist_fast_marker_list=[];



var current_stop_checker=true;
var current_slow_checker=false;
var current_fast_checker=false;

var current_stop_marker_list=[];
var current_slow_marker_list=[];
var current_fast_marker_list=[];

var makerWithLabel_curr_class = "marker-label";
var makerWithLabel_hist_class = "marker-label-event";

var geo_json_path = "/geoJson/";
var eez_12nm = "eez_12nm.geojson";
var eez_12nm_cheker = false;


var eez_200nm = "eez_200nm.geojson";
var eez_200nm_cheker = false;

var eez_24nm = "eez_24nm.geojson";
var eez_24nm_cheker = false;

var eez_24nm = "eez_24nm.geojson";
var eez_24nm_cheker = false;

var eez_others = "eez_others.geojson";
var eez_others_cheker = false;


var eezStyleMap = {"12NM":{"color":"red","fillColor":"red","strokeColor":"red","fillOpacity":0.3,"strokeOpacity":0.3,"strokeWeight":1},
		"24NM":{"color":"yellow","fillColor":"yellow","strokeColor":"yellow","fillOpacity":0.3,"strokeOpacity":0.3,"strokeWeight":1},
		"200NM":{"color":"blue","fillColor":"blue","strokeColor":"blue","fillOpacity":0.1,"strokeOpacity":0.1,"strokeWeight":1},
		"OTHER":{"color":"green","fillColor":"green","strokeColor":"green","fillOpacity":0.1,"strokeOpacity":0.1,"strokeWeight":1}};


var weather_checker = 0;
//var weather_type = {0:null,1:"clouds_new",2:"precipitation_new",3:"pressure_new",4:"wind_new",5:"temp_new"};
//var weather_name = {0:"Weather",1:"Cloud",2:"Precipitation",3:"Sea level pressure",4:"Wind speed",5:"Temperature"};
var weather_type = {0:null,1:"clouds_new",2:"wind_new",3:"temp_new"};
var weather_name = {0:"Weather",1:"Cloud",2:"Wind speed",3:"Temperature"};
var weather_value = [];
var weather_listener;

var weatherInfoWindow;

var mousedownEvent;
var mousetouch;

var moveEventListener;

var startClickTime;
var endClickTime;
var startZoomLevel;

var easyTouchChecker = false;

function openFullScreenMode() {
    if (docV.requestFullscreen)
        docV.requestFullscreen();
    else if (docV.webkitRequestFullscreen)
        docV.webkitRequestFullscreen();
    else if (docV.mozRequestFullScreen)
        docV.mozRequestFullScreen();
    else if (docV.msRequestFullscreen)
        docV.msRequestFullscreen();
}

$(document).ready(function() {
	
	
	
	localStorage.removeItem("vhclecurrentMap"); 
//	console.log(localStorage["accessAreaInfo"]);
	/*
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty("--vh", `${vh}px`);
	
	window.addEventListener("resize", () => {
		  console.log("resize");
		  let vh = window.innerHeight * 0.01;
		  document.documentElement.style.setProperty("--vh", `${vh}px`);
		});
	*/
	
	if('undefined'== typeof localStorage["userInfo"]){
		alert("User Data is empty!\nPlease reconnect.");
		location.replace("/");
	}
	
	//localStorage.removeItem("vhclecurrentMap");
	var refreshMin = (JSON.parse(localStorage["userInfo"]).refreshMin)*60*1000;
	//console.log(refreshMin);
	getRestApiCurrent();
	currentTimer = setInterval(function(){
		updateChecker=1;
		getRestApiCurrent();
	},refreshMin);
	
	setTimeout(function(){
		currentLabelHide($(".sog_stop"),current_stop_checker);
		currentLabelHide($(".sog_slow"),current_slow_checker);
		currentLabelHide($(".sog_fast"),current_fast_checker);
	},2000);
	
	// $("#vhclePopup").show();
	$("#sidebarModal").hide();
	
	/*$("#labelOnOff_btn").addEventListener("click",(e)={
	
		
	});*/
	
	$("#fullScreenBtn").click(function (e) {
		
		
		function openFullscreen() {
		  if (elem.requestFullscreen) {
		    elem.requestFullscreen();
		  } else if (elem.webkitRequestFullscreen) { /* Safari */
		    elem.webkitRequestFullscreen();
		  } else if (elem.msRequestFullscreen) { /* IE11 */
		    elem.msRequestFullscreen();
		  }
		}
		
		
	});
	
	$("#searchEraser").click(function(e){
		$("#searchInput").val("");
	});
	
	$("#logoutBtn").click(function (e) {
		
		var logoutCheck = confirm('Do you want Logout?');
//		console.log(logoutCheck);
		if(logoutCheck==true){
			localStorage.removeItem("accessInfo");
			localStorage.removeItem("userInfo");
			localStorage.removeItem("userData");
			location.replace("/");
		}
		
		
		
	});
	
	$("#shipSelectBtn").click(function(e){
		//console.log( $(".marker-label").length);
		
		$("input:checkbox[id='curr_stop_checkbox']").prop("checked",current_stop_checker);
		$("input:checkbox[id='curr_slow_checkbox']").prop("checked",current_slow_checker);
		$("input:checkbox[id='curr_fast_checkbox']").prop("checked",current_fast_checker);			
		
		$("#shipSelectorModal").show();
		//$("#sidebarModal").hide();
	});
	
	
	
	$("#settingBtn").click(function(e){
		//console.log( $(".marker-label").length);		
		
		$("input:checkbox[id='setting_easyTouch_checkbox']").prop("checked",easyTouchChecker);	
		
		
		$("#settingSelectorModal").show();
		//$("#sidebarModal").hide();
	});
	
	$("#settingSelectorModalClose").click(function(e){
		$("#settingSelectorModal").hide();
	});
	
	
	$("input:checkbox[id='setting_easyTouch_checkbox']").click(function(e){
		easyTouchChecker = $("input:checkbox[id='setting_easyTouch_checkbox']").is(":checked");
		
		if(easyTouchChecker){
			moveEventMaker();
		}else{
			google.maps.event.removeListener(moveEventListener);
		}
	});
	
	
	$("input:checkbox[id='curr_stop_checkbox']").click(function(e){
		current_stop_checker= $("input:checkbox[id='curr_stop_checkbox']").is(":checked");
		
		current_marker_speed_hide(current_stop_marker_list,current_stop_checker);
		currentLabelHide($(".sog_stop"),current_stop_checker);
	});
	
	$("input:checkbox[id='curr_slow_checkbox']").click(function(e){
		current_slow_checker = $("input:checkbox[id='curr_slow_checkbox']").is(":checked");

		current_marker_speed_hide(current_slow_marker_list,current_slow_checker);
		currentLabelHide($(".sog_slow"),current_slow_checker);
	});
	
	$("input:checkbox[id='curr_fast_checkbox']").click(function(e){
		
		
		current_fast_checker = $("input:checkbox[id='curr_fast_checkbox']").is(":checked");		
		
		
		current_marker_speed_hide(current_fast_marker_list,current_fast_checker);
		currentLabelHide($(".sog_fast"),current_fast_checker);
	});
	
	
	
	
	$("#shipSelectorModalClose").click(function(e){
		
		$("#shipSelectorModal").hide();
	});
	
	$("#eezBtn").click(function(e){
		
		
		$("#eezSelectorModal").show();
		/*var infos = JSON.parse(localStorage["userData"]);
		console.log(infos);
		fetch("/geoJson/PapuaNewguinea_area.geojson")
		  .then(response => response.json())
		  .then(json => console.log(json));
		//var promise = $.getJSON("/geoJson/json/PapuaNewguinea_area.geojson");
		map.data.loadGeoJson(
				geo_json_path+infos.areaId+"/"+eez_12nm
			  );*/
	});
	
	$("#otherAreaBtn").click(function(e){
		
		accessAreaView(JSON.parse(localStorage["accessAreaInfo"]));
		
	});
	$("#sendMain").click(function(e){
		
		var areaId=$("#areaSelector option:selected").val();
		var userData = {};
		userData["areaId"] = areaId;
		localStorage["userData"] = JSON.stringify(userData);
		
		location.replace("main.do");
	});
	
	$("#accessAreaModalClose").click(function(){
		$("#accessAreaModal").hide();
	});
	
	$("input:checkbox[id='eez_other_checkbox']").click(function(e){
		
		eez_other_cheker = $("input:checkbox[id='eez_other_checkbox']").is(":checked");
		var infos = JSON.parse(localStorage["userData"]);
		var geoPath = geo_json_path+infos.areaId+"/"+eez_others;
		
		eezReturn(geoPath,infos.areaId,$("input:checkbox[id='eez_other_checkbox']").val(),eez_other_cheker);
		
		
	});
	
	$("input:checkbox[id='eez_200nm_checkbox']").click(function(e){
		
		eez_200nm_cheker = $("input:checkbox[id='eez_200nm_checkbox']").is(":checked");
		var infos = JSON.parse(localStorage["userData"]);
		var geoPath = geo_json_path+infos.areaId+"/"+eez_200nm;
		
		eezReturn(geoPath,infos.areaId,$("input:checkbox[id='eez_200nm_checkbox']").val(),eez_200nm_cheker);
		
		
	});
	
	$("input:checkbox[id='eez_24nm_checkbox']").click(function(e){
		
		eez_24nm_cheker = $("input:checkbox[id='eez_24nm_checkbox']").is(":checked");
		var infos = JSON.parse(localStorage["userData"]);
		var geoPath = geo_json_path+infos.areaId+"/"+eez_24nm;
		
		eezReturn(geoPath,infos.areaId,$("input:checkbox[id='eez_24nm_checkbox']").val(),eez_24nm_cheker);
		
		
	});
	
	$("input:checkbox[id='eez_12nm_checkbox']").click(function(e){
		
		eez_12nm_cheker = $("input:checkbox[id='eez_12nm_checkbox']").is(":checked");
		var infos = JSON.parse(localStorage["userData"]);
		var geoPath = geo_json_path+infos.areaId+"/"+eez_12nm;
		
		eezReturn(geoPath,infos.areaId,$("input:checkbox[id='eez_12nm_checkbox']").val(),eez_12nm_cheker);
		
		
	});
	
	$("#eezSelectorModalClose").click(function(e){
		$("#eezSelectorModal").hide();
	});
	
	$("#weatherBtn").click(function (e) {
		
		
		weather_checker++;
		if(weather_checker>3){
			weather_checker=0;
		}
		
		 map.overlayMapTypes.setAt( 0, null);
		var weatherType = weather_type[weather_checker];
		
		if(weatherType!=null){
			var myMapType;
			
			
			if("undefined"==typeof weather_value[weatherType]){
				
				var userInfo = JSON.parse(localStorage["userInfo"]);
				var accessInfo = JSON.parse(localStorage["accessInfo"]);
				
				myMapType = new google.maps.ImageMapType({
				      getTileUrl: function(coord, zoom) {
				    	 var urls =accessInfo.urls+accessInfo.getWeatherTile+"?userId="+userInfo.userId+"&userPwd="+userInfo.userPwd+"&authKey="+userInfo.authKey;
				    	 urls = urls +"&tileType="+weatherType+"&zoom="+zoom+"&coordx="+coord.x+"&coordy="+coord.y;			        
				    	 return urls;
				    	 
				    	//return "https://tile.openweathermap.org/map/"+weatherType+"/" + 
					    //          zoom + "/" + coord.x + "/" + coord.y + ".png?appid="+open_weather_key;
				      },
				      tileSize: new google.maps.Size(256, 256),
				      maxZoom: 9,
				      minZoom: 0,
				      name: 'mymaptype'
				    });

				weather_value[weatherType] = myMapType; 
				
			}else{
				myMapType = weather_value[weatherType];
			}
			map.overlayMapTypes.insertAt(0, myMapType);
		}
//		console.log(weather_name[weather_checker]);
		$("#weather_tag").html(weather_name[weather_checker]);
		
		//console.log(weather_checker);
		if(weather_checker==0){
			if(weatherInfoWindow!=null && ("undefined" != typeof weatherInfoWindow)){
				weatherInfoWindow.close();
				
			}
			//console.log("Test");
			if(easyTouchChecker){
				moveEventMaker();
			}
			
			google.maps.event.removeListener(weather_listener);
		}else if(weather_checker==1){
			google.maps.event.removeListener(moveEventListener);
			
			var userInfo = JSON.parse(localStorage["userInfo"]);
			var accessInfo = JSON.parse(localStorage["accessInfo"]);
			//console.log(accessInfo);
			
			
			//if("undefined" ==typeof whether_listener){
			weather_listener = google.maps.event.addListener(map, 'click', function(event) {

									
								    //marker = new google.maps.Marker({position: event.latLng, map: map});
									
									var weatherPointParam = {"userId":userInfo.userId,"userPwd":userInfo.userPwd,"authKey":userInfo.authKey,"lon":event.latLng.lng(),"lat":event.latLng.lat()};
								//	console.log(weatherPointParam);
								//	console.log(accessInfo.urls+accessInfo.getWeatherPoint);
				
				
									//var urls = "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat="+event.latLng.lat()+"&lon="+event.latLng.lng()+"&appid="+open_weather_key;
//									console.log(urls);
									axios.request({ // some options
										method : 'GET',
										url : (accessInfo.urls+accessInfo.getWeatherPoint),
										headers : {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'},
										params : weatherPointParam
									}).then(response=>{ 
										//console.log(response);
										const {data: responseBody, status: responseCode}= response; 
										
										//console.log(response.data);
										
										if(weatherInfoWindow!=null && ("undefined" != typeof weatherInfoWindow)){
											weatherInfoWindow.close();
										};
										
										weatherInfoWindow = new google.maps.InfoWindow();
										weatherInfoWindow.setContent(setWeatherTitle(response.data.weatherPointData,"<br/>")+"Data Source : <a href=\"https://openweathermap.org\">OpenWeather</a>");
										weatherInfoWindow.setPosition(weatherLatLng(response.data.weatherPointData));
										weatherInfoWindow.open(map);
										
									}).catch(e=>{ // then에서 예외가 발생했거나, response code가 400 이상인 경우(실패) 이쪽으로 넘어온다
										console.error(e); 
										
										
									});
				
								});
			//}else{
			//	google.maps.event.addListener(whether_listener);
			//}
			
		}
		
		
		
		    
	});
	
	
	
	
	$('#markerLabelshow').click(function (e) {
		
		//console.log(markerLabelChecker);
		//console.log($(".marker-label"));
		//console.log(currentMarkerChecker);
		if(currentMarkerChecker){
			
			
			if(markerLabelChecker){
				
				
				$("#markerLabelshow").children('.fas').removeClass("fa-toggle-on");
				$("#markerLabelshow").children('.fas').addClass("fa-toggle-off");
				$("#markerLabelshow").children('span').html("Label off");
				markerLabelChecker=false;
				
				currentLabelHide($(".sog_stop"),current_stop_checker);
				currentLabelHide($(".sog_slow"),current_slow_checker);
				currentLabelHide($(".sog_fast"),current_fast_checker);
			}else{
				
				$("#markerLabelshow").children('.fas').removeClass("fa-toggle-off");
				$("#markerLabelshow").children('.fas').addClass("fa-toggle-on");
				$("#markerLabelshow").children('span').html("Label on");
				markerLabelChecker=true;
				
				currentLabelHide($(".sog_stop"),current_stop_checker);
				currentLabelHide($(".sog_slow"),current_slow_checker);
				currentLabelHide($(".sog_fast"),current_fast_checker);
			}
			
		}
//		console.log(markerLabelChecker);
		
		//console.log($(".marker-label").attr("disabled"));
		
	});
	
	$("#labelOnOff_btn").click(function (e){
		
//		console.log(historyLabelChecker);
		historyLabelChecker = !historyLabelChecker;
		if(historyLabelChecker){
			
			$("#labelOnOff_btn").removeClass("btn-secondary");
			$("#labelOnOff_btn").addClass("btn-success");
			$("#labelOnOff_btn").children().removeClass("fa-toggle-off");
			$("#labelOnOff_btn").children().addClass("fa-toggle-on");
			$(".marker-label-event").css("display","block");
			$(".marker-label-event").attr("disabled",false);
			
			
			
			
		}else{
			
			$("#labelOnOff_btn").removeClass("btn-success");
			$("#labelOnOff_btn").addClass("btn-secondary");
			$("#labelOnOff_btn").children().removeClass("fa-toggle-on");
			$("#labelOnOff_btn").children().addClass("fa-toggle-off");
			$(".marker-label-event").css("display","none");
			$(".marker-label-event").attr("disabled",true);
			
		}
		
		histLabelHide($(".sog_hist_stop"),hist_stop_checker);
		histLabelHide($(".sog_hist_slow"),hist_slow_checker);
		histLabelHide($(".sog_hist_fast"),hist_fast_checker);
	});
	
		
	$("#hist_stop_btn").mousedown(function(e){
		
		
		hist_stop_checker = histBtnChange($("#hist_stop_btn"),!hist_stop_checker,"danger");
		hist_marker_speed_hide(hist_stop_marker_list,hist_stop_checker);
		histLabelHide($(".sog_hist_stop"),hist_stop_checker);
		
	});
	
	$("#hist_slow_btn").mousedown(function(e){
		hist_slow_checker = histBtnChange($("#hist_slow_btn"),!hist_slow_checker,"warning");
		//console.log(hist_stop_checker);
		hist_marker_speed_hide(hist_slow_marker_list,hist_slow_checker);
		histLabelHide($(".sog_hist_slow"),hist_slow_checker);
		
	});
	
	
	
	$("#hist_fast_btn").mousedown(function(e){
		
		hist_fast_checker = histBtnChange($("#hist_fast_btn"),!hist_fast_checker,"success");
		hist_marker_speed_hide(hist_fast_marker_list,hist_fast_checker);
		histLabelHide($(".sog_hist_fast"),hist_fast_checker);
		
		
		
		
	});
	
	//console.log("stop : "+hist_stop_marker_list.length);
	//console.log("slow : "+hist_slow_marker_list.length);
	//console.log("faster : "+hist_faster_marker_list.length);
	//console.log("over : "+hist_over_marker_list.length);
	
	
	$("#currentMarkerOnOff_btn").click(function (e){
		
		currentMarkerChecker = !currentMarkerChecker;
		//console.log(markerLabelChecker);
		if(currentMarkerChecker){
			
			$("#currentMarkerOnOff_btn").removeClass("btn-secondary");
			$("#currentMarkerOnOff_btn").addClass("btn-success");
			$("#currentMarkerOnOff_btn").children().removeClass("fa-toggle-off");
			$("#currentMarkerOnOff_btn").children().addClass("fa-toggle-on");
			//$(".marker-label-event").css("display","block");
			if(markerLabelChecker){
				$(".marker-label").css("display","block");		
				$(".marker-label").attr("disabled",false);
			}
		}else{
			
			$("#currentMarkerOnOff_btn").removeClass("btn-success");
			$("#currentMarkerOnOff_btn").addClass("btn-secondary");
			$("#currentMarkerOnOff_btn").children().removeClass("fa-toggle-on");
			$("#currentMarkerOnOff_btn").children().addClass("fa-toggle-off");
			$(".marker-label").css("display","none");
			$(".marker-label").attr("disabled",true);
			//$(".marker-label-event").css("display","none");
			
		}
		
		
		
		
		for(curVhcleKey in currentMarkerMap){
			
			currentMarkerMap[curVhcleKey].setVisible(currentMarkerChecker);
			currentMarkerMap[curVhcleKey].setClickable(!currentMarkerChecker);
		}
		
		
	});
	
	$('#vhclePopupModalClose').click(function (e) {
		
		historyLabelChecker= false;
		currentMarkerChecker = true;
		$("#vhclePopup").hide();
		$(".marker-label-event").css("display","none");
		$(".marker-label-event").attr("disabled",true);
		
		/*currentMarkerList.forEach(function(value,index,arr){
			value.setVisible(true);
		});*/
		
		$("#currentMarkerOnOff_btn").removeClass("btn-success");
		$("#currentMarkerOnOff_btn").addClass("btn-secondary");
		$("#currentMarkerOnOff_btn").children().removeClass("fa-toggle-on");
		$("#currentMarkerOnOff_btn").children().addClass("fa-toggle-off");
		
		$("#labelOnOff_btn").removeClass("btn-success");
		$("#labelOnOff_btn").addClass("btn-secondary");
		$("#labelOnOff_btn").children().removeClass("fa-toggle-on");
		$("#labelOnOff_btn").children().addClass("fa-toggle-off");
		
		for(curVhcleKey in currentMarkerMap){
			//currentMarkerChecker = true;
			
			setcurrMarkerLabelOn(currentMarkerMap[curVhcleKey]);
			//console.log(currentMarkerMap[curVhcleKey].metadata);
			//currentMarkerMap[curVhcleKey].setVisible(true);
			//currentMarkerMap[curVhcleKey].setClickable(true);
			//console.log(currentMarkerMap[curVhcleKey].metadata);
			//marker.setOpacity(markerOpacity(value));
			currentMarkerMap[curVhcleKey].setOpacity(markerOpacity(currentMarkerMap[curVhcleKey].metadata));
		}
		//setcurrMarkerLabelOn();
		/*
		if(markerLabelChecker){
			
			$(".marker-label").css("display","block");
			$(".marker-label").attr("disabled",false);
		}
		*/
		//console.log(currentMarkerChecker);
		if(currentMarkerChecker){
			
			if(markerLabelChecker){
				
				
				
				currentLabelHide($(".sog_stop"),current_stop_checker);
				currentLabelHide($(".sog_slow"),current_slow_checker);
				currentLabelHide($(".sog_fast"),current_fast_checker);
			}else{
				
				currentLabelHide($(".sog_stop"),current_stop_checker);
				currentLabelHide($(".sog_slow"),current_slow_checker);
				currentLabelHide($(".sog_fast"),current_fast_checker);
			}
			
		}
		
		
		histMarkerList.forEach(function(value,index,arr){
			value.setVisible(false);
			value.setMap(null);
		});
		
		poliLineList.forEach(function(value,index,arr){
			value.setVisible(false);
		});
		
		poliLineList = [];
		histMarkerList = [];
		
		if(historyInfoWindow!=null && ("undefined" != typeof historyInfoWindow)){
			historyInfoWindow.close();
		}
		
		infoEmpty();
	});
	
	/*$('#popupId').click(function (e) {
		console.log(selectShip.mmsi);
		
	});*/
	
	$('#vhcleHist').click(function (e) {
		
			
		$(".marker-label").css("display","none");
		$(".marker-label").attr("disabled",true);
		
		if(histMarkerList.length==0){
			
			//List 방식
			/*currentMarkerList.forEach(function(value,index,arr){
				value.setVisible(false);
			});*/
			//object 방식
			for(curVhcleKey in currentMarkerMap){
				currentMarkerChecker = false;
				currentMarkerMap[curVhcleKey].setVisible(false);
				currentMarkerMap[curVhcleKey].setOpacity(0.5);
			}
			
			poliLineList = [];
			mapLocationList = [];
			historyInfoWindow = new google.maps.InfoWindow();
			
			
			var vhcleChecker = 1;
			//$("#hist_dataCount").text(selectShipData.dataCount);
			vhcleHistoryList.forEach(function(value,index,arr){
				
				var setFlag = 1;
				if(vhcleChecker==1){
					setFlag = 6;
					$("#hist_startDt").text(value.eventDate);
					if(selectShipData.dataCount==1){
						$("#hist_endDt").text(value.eventDate);
					}
					
					setLiMarker($("#hist_startDt_icon"),getShipIcon2(value,setFlag));
				}else if(vhcleChecker==selectShipData.dataCount){
					setFlag = 4;
					$("#hist_endDt").text(value.eventDate);
				}
				vhcleChecker++;
				var shipPosition = new google.maps.LatLng(value.latitude,value.longitude);
				
				var labelClass = sogHistClassReturn(makerWithLabel_hist_class,value.sog);
//				console.log(labelClass);
				var markerLabel = new MarkerWithLabel({
					 id : value.eventDate,
					 metadata : value,	
					 position : shipPosition,	
					 title : setHistoryTitle(value,"\n"),
					 map : map,
					 icon : getShipIcon2(value,setFlag),
					 zindex : 2000,
					 labelContent:value.eventDate,				 
					 labelClass: labelClass,
					 labelAnchor : new google.maps.Point(5, -15),
					 labelVisible : false,
					 labelStyle : {opacity:0}
				 });
				mapLocationList.push(shipPosition);
				
				
				
				/*google.maps.event.addListener(markerLabel, 'click', (function (markerLabel) {
		            return function(){
		                  
		            }
					console.log("TEST");
		        })(markerLabel));*/
				
				markerLabel.addListener("click",()=>{
					 
					 
					historyInfoWindow.setContent(setHistoryTitle(markerLabel.metadata,"<br>"));
					historyInfoWindow.setPosition(markerLabel.getPosition());
					historyInfoWindow.open(map);
				});
				
				if(mapLocationList.length>1){
					var latLngList = [];
					
					for(var i=(mapLocationList.length-2);i<mapLocationList.length;i++){
						latLngList.push(mapLocationList[i]);
						
					}
					
					var polyline = new google.maps.Polyline({
			 	 	    path: latLngList,
			 	 	    strokeColor: strokeColors[0],
			 	 	    strokeOpacity: 1.0,
			 	 	    strokeWeight: 1,
			 	 	    geodesic: true,
			 	 	    icons: [{
			 	 	        icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW},
			 	 	        offset: '100%',
			 	 	        repeat: '40px'
			 	 	    }]
			 	 	});
					polyline.setMap(map);
					poliLineList.push(polyline);
				}
				
				
				histMarkerList.push(markerLabel);
				hist_speed_marker_hide(markerLabel,setFlag);
				
				
			});
		}
		
		//$(".marker-label-event").attr("disabled",true);
		//console.log("stop : "+hist_stop_marker_list.length);
		//console.log("slow : "+hist_slow_marker_list.length);
		//console.log("faster : "+hist_faster_marker_list.length);
		//console.log("over : "+hist_over_marker_list.length);
		
		
    });

	
	//$(".marker-label").attr("disabled",true);
	//console.log($(".marker-label").attr("disabled"));
    // load first tab content
 /* $('#tab1').load($('.nav-link.active').attr("data-url"), function (result) {
    });*/
	
	
	
	
	
	
	

    $("#searchInput").autocomplete({
    	max:10,
        source: function(request,response){
        	var results = $.ui.autocomplete.filter(searchList, request.term);

            response(results.slice(0, 10));
        },

        select: function(event, ui) {

            //console.log(ui.item);
            vhclePopupMake(currentMarkerMap[ui.item.value],$("#vhclePopup"));
        },

        focus: function(event, ui) {

            return false;

            //event.preventDefault();

        }

    }).autocomplete('instance')._renderItem - function(ul,item){
    	
    };

    $(".marker-label").attr("disabled","disabled");
	//console.log($(".marker-label").length);
	
    
    
});




	


function getRestApiCurrent(){
	
	// window.addEventListener("load", function(){ setTimeout(scrollTo, 0, 0,
	// 1); }, false);
	// $('#page-top').fullscreen();
	
	
	
	var accessInfo = JSON.parse(localStorage["accessInfo"]);
	var userInfo = JSON.parse(localStorage["userInfo"]);
	var userData = JSON.parse(localStorage["userData"]);
	
	
	
	
	//console.log(userInfo);
	//console.log(userData);
	
	
	var getCurrentParam = {"userId":userInfo.userId,"userPwd":userInfo.userPwd,"authKey":userInfo.authKey,"areaId":userData.areaId};
	
	/*
	 * if(userData.lastUpate!=null){ updateChecker = 1;
	 * getCurrentParam["lastUpate"] = userData.lastUpate; }
	 */
	getCurrentParam["updateChecker"] = updateChecker;
	
	if(updateChecker>0){
		//console.log(userData);
		getCurrentParam["lastUpdate"] = userData.lastUpdate;
	}
	
	//console.log(getCurrentParam);
	
	
	axios.request({ // some options
		method : 'GET',
		url : (accessInfo.urls+accessInfo.getCurrent),
		headers : {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'},
		params : getCurrentParam
	}).then(response=>{ 
		const {data: responseBody, status: responseCode}= response; 
		
//		console.log(response.data);
		
		if(response.data.error.checker){
			
			var errorInfo = response.data.error;
			if(errorInfo.errorId=='Check authKey'){
				alert(errorInfo.errorDesc);
				location.replace("/");
			}
			
		}else{
			userData["lastUpdate"] = response.data.lastUpdate;
			var userDataParam = response.data.userDataParam;
			//console.log(userDataParam);
			var areaDataMap;
			if(userData["areaDataMap"]==null){
				areaDataMap = {};
			}else{
				areaDataMap = userData["areaDataMap"];
			}
			
			areaDataMap[userDataParam.areaId] = userDataParam;
			userData["areaDataMap"] = areaDataMap;
			
			if(updateChecker==0){
				
				map.setCenter(new google.maps.LatLng(userDataParam.centerLat,userDataParam.centerLong));
				
				
				
				if(window.innerWidth<800){
					map.setZoom(4);
					startZoomLevel = 4;
				}else if(window.innerWidth<1300){
					map.setZoom(5);
					startZoomLevel = 5;
				}else{
					map.setZoom(5);
					startZoomLevel =5;
				}
				
				
				/*moveEventListener = google.maps.event.addListener(map, 'click', function(event) {
					
						console.log(event);
						map.panTo(event.latLng);					    
					 
				});*/
				
				
				google.maps.event.addListener(map, 'mousedown', function(event){
					startClickTime = new Date().getTime();           
				});
				        
				/*moveEventListener =	google.maps.event.addListener(map, 'mouseup', function(event){
					endClickTime = new Date().getTime();
					var subTime = endClickTime - startClickTime;
				    longpress = ( subTime < 300) ? false : true; 
				    if(longpress){
				    	//console.log(map.getZoom());
				    	if(subTime>1000){
				    		
				    		map.setCenter(new google.maps.LatLng(userDataParam.centerLat,userDataParam.centerLong));
				    		
				    		if(window.innerWidth<800){
								map.setZoom(4);
								startZoomLevel = 4;
							}else if(window.innerWidth<1300){
								map.setZoom(5);
								startZoomLevel = 5;
							}else{
								map.setZoom(5);
								startZoomLevel =5;
							}
				    		
				    	}else{
				    		map.panTo(event.latLng);
					    	if(map.getZoom()>startZoomLevel){
					    		map.setZoom(map.getZoom()-1);
					    	}
				    	}
				    	
				    	
				    }else{
				    	map.panTo(event.latLng);
				    }
				});	*/
					
				
				
			}
			
			
			
			var vhcleDataParam = response.data.vhcleDataParam;
			
//			console.log(userData);
			localStorage["userData"] = JSON.stringify(userData);
			

			
			
			var vhcleDataChecker = vhcleDataCheck(vhcleDataParam);
			
			
			vhcleMarkerMap(vhcleDataChecker);
			//vhcleMarkerList(vhcleDataChecker);
			
		};
		
		eezStartShow();
	}).catch(e=>{ // then에서 예외가 발생했거나, response code가 400 이상인 경우(실패) 이쪽으로 넘어온다
		console.error(e); 
		alert("Connection is not smooth.");
		
	});
	
	
}

function moveEventMaker(){
	//console.log("moveEventMaker");
	moveEventListener = google.maps.event.addListener(map, 'mouseup', function(event){
		endClickTime = new Date().getTime();
		var subTime = endClickTime - startClickTime;
		
		var userData = JSON.parse(localStorage["userData"]);
		var centerLat = userData.areaDataMap[userData.areaId].centerLat;
		var centerLong = userData.areaDataMap[userData.areaId].centerLong;
		
		//console.log(centerLat);
	    longpress = ( subTime < 300) ? false : true; 
	    if(longpress){
	    	//console.log(map.getZoom());
	    	if(subTime>1000){
	    		
	    		map.setCenter(new google.maps.LatLng(centerLat,centerLong));
	    		
	    		if(window.innerWidth<800){
					map.setZoom(4);
					startZoomLevel = 4;
				}else if(window.innerWidth<1300){
					map.setZoom(5);
					startZoomLevel = 5;
				}else{
					map.setZoom(5);
					startZoomLevel =5;
				}
	    		
	    	}else{
	    		map.panTo(event.latLng);
		    	if(map.getZoom()>startZoomLevel){
		    		map.setZoom(map.getZoom()-1);
		    	}
	    	}
	    	
	    	
	    }else{
	    	map.panTo(event.latLng);
	    }
	});	
}

function vhcleDataCheck(vhcleData){
	
	
	
	var currentMarkerMaps={};
	
	
	
	if(typeof localStorage["vhclecurrentMap"]!="undefined"){
		
		currentMarkerMaps = JSON.parse(localStorage["vhclecurrentMap"]);
	}
	
	
		
	for(var i=0;i<vhcleData.length;i++){
		
		currentMarkerMaps[vhcleData[i].mmsi] = vhcleData[i];
		//searchList
		//console.log(vhcleData[i]);
		
	}
		
	//console.log(currentMarkerMaps);
	localStorage["vhclecurrentMap"] = JSON.stringify(currentMarkerMaps);
	
	
	
	return currentMarkerMaps;
	
}

function setHistoryTitle(value,enterVal){
	
	var returnValue = "Latitude : "+value.latitude.toFixed(6)+enterVal+"Longitude : "+value.longitude.toFixed(6)+enterVal;
	returnValue = returnValue+"Heading : "+value.heading+enterVal+"Speed : "+value.sog+enterVal+"Course : "+value.cog+enterVal;
	returnValue = returnValue+"Last Updated : "+ value.eventDate;
	
	return returnValue;
	
}

function weatherLatLng(data){
	return new google.maps.LatLng(data.coord.lat,data.coord.lon);
}

function setWeatherTitle(data,spaceMarker){
	//"undefined" != typeof vhcleInfoData? (vhcleInfoData.mmsi):(selectShip.mmsi)
	//흐림,%
	var cloud_all = data.clouds.all;
	//조회 위경도
	var weather_lat_lon = data.coord.lat+"/"+data.coord.lon;
	//반환시간 UTC
	var weather_dt = unix_timestamp(data.dt);
	//체감온도 C
	var feels_like = kelvinToCelsius(data.main.feels_like);
	//지면 기압 hPa
	var ground_level = data.main.grnd_level;
	//해수면 기압 hPa
	var sea_level = data.main.sea_level;
	//기온 C
	var temp = kelvinToCelsius(data.main.temp);
	//대기압 hPa
	var pressure = data.main.pressure;
	//습도 %
	var humidity = data.main.humidity;
	//최저기온 C
	var temp_min = kelvinToCelsius(data.main.temp_min);
	//최고기온 C
	var temp_max = kelvinToCelsius(data.main.temp_max);
	//Station Info
	var station_name = data.name;
	var base = data.base;

	//지역정보
	var country = "undefined" != typeof data.sys.country? (data.sys.country):("undefined");
	
	//일출
	var sunrise = unix_timestamp(data.sys.sunrise);
	//일몰
	var sunset = unix_timestamp(data.sys.sunset);
	
	//timezone
	var timezone = data.timezone;
	//localDate
	var localDate = unix_timestamp((data.dt+timezone));
	//time sub
	var time_sub = timeZoneSet(timezone);
	//weather Info
	var weather_description = "undefined" != typeof data.weather[0].description? (data.weather[0].description):(null);
	//weather icon
	var weather_icon = "undefined" != typeof data.weather[0].icon? (data.weather[0].icon):(null);
	//weather main
	var weather_main = "undefined" != typeof data.weather[0].icon? (data.weather[0].main):(null);
	
	//wind deg degree
	var wind_deg = "undefined" != typeof data.wind.deg? (data.wind.deg):(null);
	//wind gust(돌풍) m/s
	var wind_gust = "undefined" != typeof data.wind.deg? (data.wind.gust):(null);
	//wind speed m/s
	var wind_speed = "undefined" != typeof data.wind.speed? (data.wind.speed):(null);
	
	//console.log(typeof data.rain["1h"].value);
	//rain 1Hour mm
	var rain_1h = null;
	
	//rain 3Hour mm
	var rain_3h = null;
		
	if("undefined"!=typeof data.rain){
		rain_1h = "undefined" != typeof data.rain["1h"]? (data.rain["1h"]):(null);
		rain_3h = "undefined" != typeof data.rain["3h"]? (data.rain["3h"]):(null);
	}
	
	//snow 1Hour mm
	var snow_1h = null;
	
	//snow 3Hour mm
	var snow_3h = null;
	
	
	if("undefined"!=typeof data.snow){
		snow_1h = "undefined" != typeof data.snow["1h"]? (data.snow["1h"]):(null);
		snow_3h = "undefined" != typeof data.snow["3h"]? (data.snow["3h"]):(null);
	}
	
	/*
	var returnValue;
	returnValue = "lat/lon : "+weather_lat_lon;
	if(""!=station_name){
		returnValue = returnValue+"("+station_name+")"+spaceMarker;
	}else{
		returnValue = returnValue+spaceMarker;
	}
	returnValue = returnValue+"date(UTC) : "+weather_dt+spaceMarker;
	returnValue = returnValue+"date(Local) : "+localDate+spaceMarker;
	returnValue = returnValue+"----------------------------"+spaceMarker;
	returnValue = returnValue+"WEATHER : "+weather_main +"["+weather_description +"("+cloud_all+"%)"+"]"+spaceMarker;
	returnValue = returnValue+"TEMP "+spaceMarker;
	returnValue = returnValue+"temp : "+temp.toFixed(2)+"C , min temp : "+temp_min.toFixed(2) +"C, max temp :"+temp_max.toFixed(2)+"C, feel like : "+feels_like.toFixed(2)+"C"+spaceMarker;
	returnValue = returnValue+"Humidity : "+humidity +"%"+spaceMarker;
	returnValue = returnValue+"Pressure "+spaceMarker;
	returnValue = returnValue+"pressure : "+pressure +"hPa, sea : "+sea_level +"hPa, ground : "+ground_level +"hPa "+spaceMarker;
	returnValue = returnValue+"Wind "+spaceMarker;
	returnValue = returnValue+"speed : "+wind_speed  +"m/s, degree : "+wind_deg;
	if(wind_gust!=null){
		returnValue = returnValue+"wind gust : "+wind_gust+"m/s";
	}
	returnValue = returnValue+spaceMarker;
	console.log(rain_1h);
	if(rain_1h!=null){
		returnValue = returnValue+"Rain "+spaceMarker;
		returnValue = returnValue+"1 Hour fall : "+rain_1h   +"mm";
		if(rain_3h!=null){
			returnValue = returnValue+", 3 Hour fall : "+rain_3h   +"mm";
		}
		returnValue = returnValue+spaceMarker;
	}
	
	if(snow_1h!=null){
		returnValue = returnValue+"Snow "+spaceMarker;
		returnValue = returnValue+"1hour fall : "+snow_1h   +"mm";
		if(snow_3h!=null){
			returnValue = returnValue+", 3hour fall : "+snow_3h   +"mm";
		}
		returnValue = returnValue+spaceMarker;
	}
	returnValue = returnValue+"----------------------------"+spaceMarker;
	returnValue = returnValue+"Sunrise : "+sunrise+spaceMarker;
	returnValue = returnValue+"Sunset : "+sunset +spaceMarker;
	
	
	console.log(returnValue);
	*/
	
	var $div = $("<div/>");
	$div.attr("id","weather_infobox");
	var $header_tbl =$("<table/>");
	$header_tbl.attr("border",1);
	$("<tr/>",{
		html : "<td colspan=\"2\"><font size=\"3px\">"+weather_main +" ["+weather_description +"(cloud : "+cloud_all+"%)"+"] "+"</font></td>"
	}).appendTo($header_tbl);
	$("<tr/>",{
		html : "<td>UTC</td>"+"<td>"+weather_dt+"</td>"
	}).appendTo($header_tbl);
	$("<tr/>",{
		html : "<td>Local("+time_sub+")</td>"+"<td>"+localDate+"</td>"
	}).appendTo($header_tbl);
	$("<tr/>",{
		html : "<td>LAT/LON</td>"+"<td>"+weather_lat_lon+ (""!=station_name?("("+station_name+")"):("")) +"</td>"
	}).appendTo($header_tbl);
	
	$("<tr/>",{
		html : "<td>Temp(C)</td>"+"<td>"+temp.toFixed(2)+"</td>"
	}).appendTo($header_tbl);
	
	$("<tr/>",{
		html : "<td>Humidity(%)</td>"+"<td>"+humidity+"</td>"
	}).appendTo($header_tbl);
	
	$("<tr/>",{
		html : "<td>Pressure(hPa)</td>"+"<td>"+pressure+"</td>"
	}).appendTo($header_tbl);
	
	
	$("<tr/>",{
		html : "<td>WIND Speed(m/s)</td>"+"<td>"+wind_speed+"</td>"
	}).appendTo($header_tbl);
	$("<tr/>",{
		html : "<td>WIND Degree</td>"+"<td>"+wind_deg+"</td>"
	}).appendTo($header_tbl);
	
	
	
	if(rain_1h!=null){
				
		$("<tr/>",{
			html : "<td>Rain(1 Hour :mm)</td>"+"<td>"+rain_1h+"</td>"
		}).appendTo($header_tbl);
	}
	
	if(snow_1h!=null){		
		
		$("<tr/>",{
			html : "<td>Snow(1 Hour :mm)</td>"+"<td>"+snow_1h+"</td>"
		}).appendTo($header_tbl);
	}
	$("<tr/>",{
		html : "<td>Sunrise(UTC)</td>"+"<td>"+sunrise+"</td>"
	}).appendTo($header_tbl);
	$("<tr/>",{
		html : "<td>Sunset(UTC)</td>"+"<td>"+sunset+"</td>"
	}).appendTo($header_tbl);
		
	
	/*
	var $mid_tr = $("<tr/>");
	
	var $temp_td = $("<td/>");
	
	$temp_td.attr("rowspan",2);
	
	var $temp_tbl =$("<table/>");
	$temp_tbl.attr("border",1).css({
		width:"100%",
		height : "100%"
	});
	$("<tr/>",{
		html : "<td colspan=\"2\"><font size=\"4px\">Temp</font>(C)</td>"
	}).appendTo($temp_tbl);
	$("<tr/>",{
		html : "<td>temp</td>"+"<td> "+temp.toFixed(2)+"</td>"
	}).appendTo($temp_tbl);
	$("<tr/>",{
		html : "<td>min</td>"+"<td> "+temp_min.toFixed(2)+"</td>"
	}).appendTo($temp_tbl);
	$("<tr/>",{
		html : "<td>max</td>"+"<td> "+temp_max.toFixed(2)+"</td>"
	}).appendTo($temp_tbl);
	$("<tr/>",{
		html : "<td>feel</td>"+"<td> "+feels_like.toFixed(2)+"</td>"
	}).appendTo($temp_tbl);
	
	$temp_tbl.appendTo($temp_td);
	$temp_td.appendTo($mid_tr);
	
	
	var $humid_td = $("<td/>");
	var $humid_tbl =$("<table/>");
	$humid_tbl.attr("border",1).css({
		width:"100%"
	});
	$("<tr/>",{
		html : "<td style=\"width:30%\"><font size=\"4px\">humid</font>(%)</td>"+"<td>"+humidity+"</td>"
	}).appendTo($humid_tbl);
	$humid_tbl.appendTo($humid_td);
	$humid_td.appendTo($mid_tr);
	
	//$header_tbl.appendTo($mid_tr);
	$mid_tr.appendTo($header_tbl);
	
	
	
	
	var $pressure_td = $("<td/>");
	var $pressure_tbl =$("<table/>");
	$pressure_tbl.attr("border",1).css({
		width:"100%"
	});
	$("<tr/>",{
		html : "<td colspan=\"2\"><font size=\"4px\">Pressure</font>(hPa)</td>"
	}).appendTo($pressure_tbl);
	$("<tr/>",{
		html : "<td>pressure</td>"+"<td>"+pressure+"</td>"
	}).appendTo($pressure_tbl);
	$("<tr/>",{
		html : "<td>sea</td>"+"<td>"+sea_level+"</td>"
	}).appendTo($pressure_tbl);
	$("<tr/>",{
		html : "<td>ground</td>"+"<td>"+ground_level+"</td>"
	}).appendTo($pressure_tbl);
	$pressure_tbl.appendTo($pressure_td);
	
	$pressure_td.appendTo($("<tr/>").appendTo($header_tbl));
	
	
	
	
	
	var $wind_tbl =$("<table/>");
	$wind_tbl.attr("border",1).css({
		width:"100%"
	});
	$("<tr/>",{
		html : "<td colspan=\"6\"><font size=\"4px\">Wind</font>(m/s)</td>"
	}).appendTo($wind_tbl);
	$("<tr/>",{
		html : "<td>speed</td>"+"<td>"+wind_speed+"</td>"+"<td>degree</td>"+"<td>"+wind_deg+"</td>"+(wind_gust!=null?("<td>wind_gust</td>"+"<td>"+wind_gust+"</td>"):"")
	}).appendTo($wind_tbl);
	$wind_tbl.appendTo($("<td colspan=\"2\"></td>").appendTo("<tr/>").appendTo($header_tbl));
	
	
	
	
	
	if(rain_1h!=null){
		returnValue = returnValue+"Rain "+spaceMarker;
		returnValue = returnValue+"1 Hour fall : "+rain_1h   +"mm";
		if(rain_3h!=null){
			returnValue = returnValue+", 3 Hour fall : "+rain_3h   +"mm";
		}
		returnValue = returnValue+spaceMarker;
	}
	
	
	if(rain_1h!=null){
		var $rain_tbl =$("<table/>");
		$rain_tbl.attr("border",1).css({
			width:"100%"
		});
		$("<tr/>",{
			html : "<td colspan=\"2\"><font size=\"4px\">Rain</font>(mm)</td>"
		}).appendTo($rain_tbl);
		$("<tr/>",{
			html : "<td>1 Hour</td>"+"<td>"+rain_1h+"</td>"
		}).appendTo($rain_tbl);
		if(rain_3h!=null){
			("<tr/>",{
				html : "<td>3 Hour</td>"+"<td>"+rain_3h+"</td>"
			}).appendTo($rain_tbl);
		}
		$rain_tbl.appendTo($("<td colspan=\"2\"></td>").appendTo("<tr/>").appendTo($header_tbl));
	}
	
	
	
	*/
//	console.log($div.html());
	$header_tbl.appendTo($div);
	

return $div.html();

}


function unix_timestamp(t,stringTimeZone){
	//var localDate = new Date(t*1000);
	
	var date = new Date(t*1000);
	
	
	return date.toISOString().replace(/T/, ' ').replace(/\..+/, '')+("undefined"!=typeof stringTimeZone?(" ("+stringTimeZone+")"):"");
}

function timeZoneSet(timeZone){
	var setTimeZone = ((timeZone/60)/60);
	var returnVal = setTimeZone +"H";
	
	if(timeZone>0){
		returnVal = "+"+returnVal;
	}
	
	
	return returnVal;
}

function kelvinToCelsius(kelvin){
	
	return kelvin - 273.15;
}






function initMap(){
	map = new google.maps.Map(document.getElementById('map'), {
 		center : {
 			lat : 37.0,
 			lng : 130.0
 		},
 		zoom : 6,
 		scrollwheel: true,
 		zoomControl: false,
 		mapTypeControl: true,
 		mapTypeControlOptions: {
 			style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
 	        position: google.maps.ControlPosition.TOP_RIGHT,
 	      },
 		scaleControl: true,
 		streetViewControl: false,
 		rotateControl: false,
 		fullscreenControl: false
 	});
	
	
	
	// map.setDraggable(true);
	
	/*
	 * google.maps.event.addListener(map, 'mousemove', function (event) {
	 * 
	 * });
	 */
	
	CursorControl(map);
	
	
}

function sideBarModal(){
	
	
	if(!sidebarView){
		$("#sidebarModal").show(); 
		sidebarView = true;
	}else{
		$("#sidebarModal").hide();
		sidebarView = false;
	}
	
	//console.log(sidebarView);
	
}


/*
function vhcleMarkerList(vhcleMap){
	
	currentMarkerList.forEach(function(value,idx,err){
		value.setMap(null);
	});
		
		
	
	
	
	for(var key in vhcleMap){
		var value = vhcleMap[key];
		
		

		var marker = new MarkerWithLabel({
			id : value.mmsi,
		    position:new google.maps.LatLng(value.latitude,value.longitude),
		    metadata : value,		   
		    map: map,
		    zindex : 501,
		    icon : getShipIcon3(value),
		    labelContent: value.vhcleName, // can also be HTMLElement
		    labelAnchor: new google.maps.Point(-25, -20),
		    labelClass: "marker-label", // the CSS class for the label
		    labelStyle: { opacity: 0},
		    labelVisible: false
		    
		    
		});
		
		google.maps.event.addListener(marker, 'click', (function (marker) {
            return function(){
                  // marker.info.open(map, marker);
            	
                var shipData = marker.metadata;
                console.log(shipData);
                  
                  
                  
                  selectShip = shipData;
                  
                  //map.setCenter(new google.maps.LatLng(shipData.latitude,shipData.longitude));
                  
                  
                 
                  setBounce(marker);
                 
                  $('a[href="#info"]').tab('show');
                  
                 
                 
                  vhclePopupMake(marker,$("#vhclePopup"));
            }
        })(marker));
		//$(".marker-label").css("display","block");
		//$(".marker-label").attr("disabled",false);
		
		
		currentMarkerList.push(marker);
		
		
		
		
	};
	
	
	
	
	
}
*/



function vhcleMarkerMap(vhcleMap){
	
	/*for(var key in currentMarkerMap){
		console.log("check");
		currentMarkerMap[key].setMap(null);
	}*/
	
	//fullScreenBtn();
	var ch = 0;
	for(var key in vhcleMap){
		
		var value = vhcleMap[key];
		if('undefined'!=typeof currentMarkerMap[key]){
			//console.log(currentMarkerMap[key].get("metadata").eventDate);
			//console.log(currentMarkerMap[key].get("metedata"));
			//console.log(value.eventDate);
			if(currentMarkerMap[key].get("metadata").eventDate==value.eventDate){
				//console.log("uYu");
			}else{
				//console.log(value);
				//console.log(currentMarkerMap[key].metadata);
				
				currentMarkerMap[key].set("metadata",value);			
				currentMarkerMap[key].set("position",new google.maps.LatLng(value.latitude,value.longitude));
				currentMarkerMap[key].set("icon",getShipIcon3(value));
				currentMarkerMap[key].set("labelContent",sogClassReturn(makerWithLabel_curr_class,value.sog));
				//console.log(currentMarkerMap[key].metadata);
				//currentMarkerMap[key].set("labelClass","marker-label");
				//console.log(currentMarkerMap[key].get("labelClass"));
				//console.log("uu");
				
				//console.log(currentMarkerMap[key].metadata);
			}
			
			
		}else{
			
			var labelClass = sogClassReturn(makerWithLabel_curr_class,value.sog);
			
			var marker = new MarkerWithLabel({
				id : value.mmsi,
			    position:new google.maps.LatLng(value.latitude,value.longitude),
			    metadata : value,		   
			    map: map,
			    zindex : 100,
			    icon : getShipIcon3(value),
			    labelContent: value.vhcleName, // can also be HTMLElement
			    labelAnchor: new google.maps.Point(-25, -20),
			    labelClass: labelClass, // the CSS class for the label
			    labelStyle: { opacity: 1},
			    labelVisible: false
			    
			    
			});
			
			
			
			
			//console.log(marker.get("labelClass"));
			google.maps.event.addListener(marker, 'click', (function (marker) {
	            return function(){
	                  // marker.info.open(map, marker);
	            	
	            	
	                  var shipData = marker.metadata;
	                  //console.log(marker.metadata.mmsi);
	                  //console.log(shipData);
//	                  console.log(marker.metadata.latitude);
//	                  console.log(marker.metadata.longitude);
	                  map.setCenter(new google.maps.LatLng(value.latitude,value.longitude));
	                 
	                  if(map.getZoom()<8){
	                	  map.setZoom(8);
	                  }
	                  
	                  
	                  //if(vhclecurrentPopupChecker==false){
		                  vhclePopupMake(marker,$("#vhclePopup"));
		                  vhclecurrentPopupChecker = true;
	                  //}
	            }
	        })(marker));
			
			//console.log(markerOpacity(value));
			
			marker.setOpacity(markerOpacity(value));
			
			//console.log(marker);
			
			
			currentMarkerMap[value.mmsi]=marker;
			
			
			searchListAdd(value);
			
			
		}
		current_speed_marker_hide(currentMarkerMap[key]);
		//test
		
		
	};
	
	currentLabelHide($(".sog_stop"),current_stop_checker);
	currentLabelHide($(".sog_slow"),current_slow_checker);
	currentLabelHide($(".sog_fast"),current_fast_checker);
	//document.getElementById("my-btn")[0].click();
	//$("#fullScreenBtn").get(0).click();
}


function searchListAdd(data){
	//console.log(data);
	var nameSearch = {"label":data.vhcleName,"value":data.mmsi};
	var imoSearch = {"label":(data.imoNumber+"(imo)"),"value":data.mmsi};
	var callSearch = {"label":(data.callSign+"(call)"),"value":data.mmsi};
	var mmsiSearch = {"label":(data.mmsi+"(mmsi)"),"value":data.mmsi};
	searchList.push(nameSearch);
	searchList.push(imoSearch);
	searchList.push(callSearch);
	searchList.push(mmsiSearch);
	
}

function setBounce(marker){
	map.setCenter(new google.maps.LatLng(marker.metadata.latitude,marker.metadata.longitude));
	marker.setAnimation(google.maps.Animation.BOUNCE);
	setTimeout(function(){marker.setAnimation(null);},2000);
}


function vhclePopupMake(marker,modal){
	
	/*sidebarView = false;
	$("#sidebarModal").hide();*/
	selectShip = marker.metadata;
	
	//console.log(selectShip);
	setBounce(marker);  
	
	
	
	
	// alert (location.hash);
    //$('a[href="#locate"]').tabs();
	//$('a[href="#detail"]').removeClass('active');
	//$('a[href="#history"]').removeClass('active');
	//$('a[href="#locate"]').addClass('active');
    //console.log($('a[href="#locate"]').attr("class"));
    
	
	var accessInfo = JSON.parse(localStorage["accessInfo"]);
	var userInfo = JSON.parse(localStorage["userInfo"]);
	var userData = JSON.parse(localStorage["userData"]);
	var updateChecker = 0;
//	console.log(userInfo);
	
	var getCurrentParam = {"userId":userInfo.userId,"userPwd":userInfo.userPwd,"authKey":userInfo.authKey,"mmsi":selectShip.mmsi};
	
	//console.log(data);
	//console.log(selectShip);
	//console.log(selectShipData);
	if(selectShip!=null && selectShipData!=null && histGetMmsi!=null && histGetMmsi==selectShip.mmsi){
		
		vhcleHistory(selectShipData);
		
	}else{
		histGetMmsi = selectShip.mmsi;
		axios.request({ // some options
			method : 'GET',
			url : (accessInfo.urls+accessInfo.getHistory),
			headers : {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'},
			params : getCurrentParam
		}).then(response=>{ 
			const {data: responseBody, status: responseCode}= response; 
			
			//console.log(response.data);
			
			if(response.data.error.checker){
				
				var errorInfo = response.data.error;
				if(errorInfo.errorId=='Check authKey'){
					alert(errorInfo.errorDesc);
					location.replace("/");
				}
				
			}else{
				
				selectShipData = response.data;
				vhcleHistory(selectShipData);
							
				
			};
			
			
		}).catch(e=>{ // then에서 예외가 발생했거나, response code가 400 이상인 경우(실패) 이쪽으로 넘어온다
			console.error(e); 
			alert("Connection is not smooth.");
			
		});
	}
	
	//$("#page-top").attr('class','');	
	
	$("#popupId").text(selectShip.vhcleName);
	//$("#vhclePopup").draggable({ handle: ".modal-header" });
	vhclePopupView = true;
	$("#vhclePopup").show();
	
	
	//$("#vhclePopup").show();
	//$("#vhclePopup").draggable();
	//$("#vhclebottom").draggable();
	
}

function vhcleHistory(shipData){
	
	vhcleHistoryInfo(shipData.vhcleInfo);
	vhcleHistoryList=shipData.vhcleDataParam;
}

function vhcleHistoryInfo(vhcleInfoData){
	infoEmpty();
	
	$("#hist_latLon").text(selectShip.latitude.toFixed(4)+" / "+selectShip.longitude.toFixed(4));
	
	$("#hist_sog").text(selectShip.sog);
	var hist_heading = selectShip.heading == 511? "N/A":selectShip.heading;	
	var hist_cog = selectShip.cog>= 360 ? "N/A":selectShip.cog;
	var hist_headingCog = hist_heading +" / "+ hist_cog;
	$("#hist_headingCog").text(hist_headingCog);
	$("#hist_eventDt").text(selectShip.eventDate);	
	$("#hist_fromNow").text(lastDateTimeSpan(selectShip.eventDate));	
	$("#hist_mmsi").text("undefined" != typeof vhcleInfoData? (vhcleInfoData.mmsi):(selectShip.mmsi));
	$("#hist_imo").text("undefined" != typeof vhcleInfoData? (vhcleInfoData.imoNumber==null? "N/A":vhcleInfoData.imoNumber):(selectShip.imoNumber=="undefined"?"N/A":selectShip.imoNumber));
	$("#hist_callSign").text("undefined" != typeof vhcleInfoData? (vhcleInfoData.callSign==""? "N/A":vhcleInfoData.callSign):(selectShip.callSign=="undefined"?"N/A":selectShip.callSign));
	/*$("#hist_callSign").text("undefined" != typeof vhcleInfoData? (vhcleInfoData.callSign):(selectShip.callSign));*/
	$("#hist_eventInfoDt").text(selectShip.eventDate);
	
	//console.log(typeof vhcleInfoData);
	if("undefined" != typeof vhcleInfoData && "undefined" != typeof vhcleInfoData.destination && vhcleInfoData.destination!=null){
		//console.log($("#info_sub1").children(0));
		
		var destination = "<ul><li class=\"col_header\">Destination : </li><li id=\"hist_callSign\">"+vhcleInfoData.destination+"</li></ul>";				
		$("#info_sub1").children('nav').append(destination);
	}
	
	
}


function hist_speed_marker_hide(marker,flag){
	
	var value = marker.metadata;
	
	if(flag!=4 && flag!=6){
		
		var index_check = 0;
		
		if(value.sog>5.0){
			
			hist_fast_marker_list.push(marker);
		}else if(value.sog>1.8){
			index_check =1;
			hist_slow_marker_list.push(marker);
		}else{
			hist_stop_marker_list.push(marker);
		}
		
		
	}
	
}


function current_speed_marker_hide(marker){
	
	var value = marker.metadata;
	
	
		
		speedType_Remove(value.mmsi);
		var index_check = 0;
		
		if(value.sog>5.0){
			
			current_fast_marker_list.push(marker);
			if(!current_fast_checker){
				marker.setVisible(false);
				marker.setLabelVisible(false);
			}
			
			
		}else if(value.sog>1.8){
			index_check =1;
			current_slow_marker_list.push(marker);
			if(!current_slow_checker){
				marker.setVisible(false);
				marker.setLabelVisible(false);
			}
			
		}else{
			current_stop_marker_list.push(marker);
			if(!current_stop_checker){
				marker.setVisible(false);
				marker.setLabelVisible(false);
			}
			
		}
		
		
	
	
}

function speedType_Remove(mmsi){
	
	var idx = current_fast_marker_list.findIndex(function(item){return item.mmsi===mmsi});	
	if(idx >-1){ current_fast_marker_list.splice(idx,1)};
	idx = current_slow_marker_list.findIndex(function(item){return item.mmsi===mmsi});
	if(idx >-1){ current_slow_marker_list.splice(idx,1)};
	idx = current_stop_marker_list.findIndex(function(item){return item.mmsi===mmsi});
	if(idx >-1){ current_slow_marker_list.splice(idx,1)};
}

function sogClassReturn(mainClass,sog){
	
	var returnVal = "";
	if(sog>5.0){		
		returnVal = (mainClass+" "+"sog_fast");
	}else if(sog>1.8){
		returnVal = (mainClass+" "+"sog_slow");
	}else{
		returnVal = (mainClass+" "+"sog_stop");
	}
	
	return returnVal;
}

function sogHistClassReturn(mainClass,sog){
	
	var returnVal = "";
	if(sog>5.0){		
		returnVal = (mainClass+" "+"sog_hist_fast");
	}else if(sog>1.8){
		returnVal = (mainClass+" "+"sog_hist_slow");
	}else{
		returnVal = (mainClass+" "+"sog_hist_stop");
	}
	
	return returnVal;
}

function infoEmpty(){
	
	
	$('a[href="#detail"]').removeClass('active');
	$("#detail").removeClass('active show');
	$('a[href="#history"]').removeClass('active');
	$("#history").removeClass('active show');
	$('a[href="#locate"]').addClass('active');
	$('#locate').addClass('active show');
	
	
	
	hist_fast_checker = histBtnChange($("#hist_fast_btn"),true,"success");
	hist_slow_checker = histBtnChange($("#hist_slow_btn"),true,"warning");
	hist_stop_checker = histBtnChange($("#hist_stop_btn"),true,"danger");
	
	
	hist_stop_marker_list=[];
	hist_slow_marker_list=[];	
	hist_fast_marker_list=[];
	
	
	$("#hist_lat").text();
	$("#hist_long").text();
	$("#hist_sog").text();
	$("#hist_cog").text();
	$("#hist_heading").text();
	$("#hist_eventDt").text();	
	$("#hist_mmsi").text();
	$("#hist_imo").text();
	$("#hist_callSign").text();
	$("#hist_eventInfoDt").text();
	
	$("#info_sub1").children('nav').children('ul:eq(4)').remove();
}

function setLiMarker(setImg,value){
	
	//console.log(value);
	$("#hist_startDate_a").css("background-image","url("+value.url+")");
	$("#hist_startDate_a").css("background-repeat","no-repeat");
	$("#hist_startDate_a").css("background-position","10% 100px;");
	/*$("#hist_startDt_icon").attr('src',value.url);
	$("#hist_startDt_icon").attr('width',"24px");
	$("#hist_startDt_icon").attr('height',"24px");
	
	$("#hist_startDt_icon").css('top',value.origin.y);*/
	
	
	
	
	
}
function currentLabelHide(value,checker){
	
	//console.log(markerLabelChecker);
	//console.log(checker);
	
	
	
				
	if(!markerLabelChecker){
		
		value.css("display","none");
		value.attr("disabled",true);
		//console.log(value);
	}else{
		if(!checker){
			value.css("display","none");
			value.attr("disabled",true);
		}else{
			value.css("display","block");
			value.attr("disabled",false);
		}
		
	}
	
		
	
}

function histLabelHide(value,checker){
	
	//console.log(markerLabelChecker);
	//console.log(checker);
	
	
//	console.log(historyLabelChecker);
				
	if(!historyLabelChecker){
//		console.log("display 1");
		value.css("display","none");
		value.attr("disabled",true);
	}else{
		if(!checker){
//			console.log("display 2");
			value.css("display","none");
			value.attr("disabled",true);
		}else{
//			console.log("display 3");
			value.css("display","block");
			value.attr("disabled",false);
		}
		
	}
	
		
	
}

function setcurrMarkerLabelOn(marker){
	var sog = marker.metadata.sog;
	
	if(sog>5.0){
		
		marker.setVisible(current_fast_checker);
		marker.setClickable(true);
	}else if(sog>1.8){
		marker.setVisible(current_slow_checker);
		marker.setClickable(true);
	}else{
		marker.setVisible(current_stop_checker);
		marker.setClickable(true);
	}
}

function eezReturn(path,areaId,eezType,checker){
	
	//console.log(eezStyleMap[eezType]);
	
	
	if(checker){
		
//		console.log(path);
		map.data.loadGeoJson(
				path
		  );
		
		/*map.data.forEach(function(feature){
			//console.log(feature.i);
			if(feature.i.areaId==areaId && feature.i.eez_check == eezType){
				feature.setStyle({
				    fillColor: eezStyle.fillColor,
				    fillOpacity : eezStyle.fillOpacity,
				    strokeColor : eezStyle.strokeColor,
				    strokeWeight: eezStyle.strokeWeight,
				    strokeOpacity : eezStyle.strokeOpacity
				    
				  });
			}
		});*/
		
		
		 map.data.setStyle(function(feature) {

//			 console.log(feature.j);
			 var eezStyle = eezStyleMap[mapFeatureCheck(feature).eez_check];
//			 console.log(feature.i.eez_check);
//			 console.log(eezStyle);
			 return {
			    fillColor: eezStyle.fillColor,
			    fillOpacity : eezStyle.fillOpacity,
			    strokeColor : eezStyle.strokeColor,
			    strokeWeight: eezStyle.strokeWeight,
			    strokeOpacity : eezStyle.strokeOpacity,
			    clickable:false
			 }
			  });
		
	}else{
		//eez_12nm_value.hide();
		//console.log(data
		map.data.forEach(function(feature){
//			console.log(feature.i);
			if(mapFeatureCheck(feature).areaId==areaId && mapFeatureCheck(feature).eez_check == eezType){
				 map.data.remove(feature);
			}
		});
	}
	
}


function accessAreaView(accessAreaData){
	
	
	
	var userInfo = accessAreaData.userInfo;
	
	var areaId =  JSON.parse(localStorage["userData"]).areaId;
	
	
	$("#lastLoginVal").text("Last Login : "+userInfo.lastLogin.replace(".0","")+" UTC");
	
	var areaInfo = accessAreaData.data.areaInfo;
	$("select#areaSelector option").remove();
	
	
	
	for(var area of areaInfo){
		
		if(area.areaId != areaId){

			var option = $("<option value='"+area.areaId+"' class='h6 text-gray-900 mb-4'>"+area.areaName+"</option>");
			
			$("#areaSelector").append(option);
		}
	
		
	}
	
	$("#accessAreaModal").show();
}


function mapFeatureCheck(feature){
	
	var returnVal = feature.j;
	
	if(typeof returnVal =="undefined"){
		returnVal = feature.i;
	}
	
	
	return returnVal;
}

function eezStartShow(){
	
	var infos = JSON.parse(localStorage["userData"]);
	var geoPath = "";
	
	eez_other_cheker = $("input:checkbox[id='eez_other_checkbox']").is(":checked");
	geoPath = geo_json_path+infos.areaId+"/"+eez_others;
	eezReturn(geoPath,infos.areaId,$("input:checkbox[id='eez_other_checkbox']").val(),eez_other_cheker);
	
	eez_200nm_cheker = $("input:checkbox[id='eez_200nm_checkbox']").is(":checked");
	geoPath = geo_json_path+infos.areaId+"/"+eez_200nm;
	eezReturn(geoPath,infos.areaId,$("input:checkbox[id='eez_200nm_checkbox']").val(),eez_200nm_cheker);
	
	
	eez_24nm_cheker = $("input:checkbox[id='eez_24nm_checkbox']").is(":checked");
	geoPath = geo_json_path+infos.areaId+"/"+eez_24nm;
	eezReturn(geoPath,infos.areaId,$("input:checkbox[id='eez_24nm_checkbox']").val(),eez_24nm_cheker);
	
	eez_12nm_cheker = $("input:checkbox[id='eez_12nm_checkbox']").is(":checked");
	geoPath = geo_json_path+infos.areaId+"/"+eez_12nm;
	eezReturn(geoPath,infos.areaId,$("input:checkbox[id='eez_12nm_checkbox']").val(),eez_12nm_cheker);
	
}
