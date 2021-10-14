/**
 * Define a property to hold the center state.
 * 
 * @private
 */
MapController.prototype.center_ = null;
/**
 * Gets the map center.
 * @return {?google.maps.LatLng}
 */
MapController.prototype.getCenter = function() {
  return this.center_;
};

/**
 * Sets the map center.
 * @param {?google.maps.LatLng} center
 */
MapController.prototype.setCenter = function(center) {
  this.center_ = center;
};

MapController.prototype.drwManamger=null;
MapController.prototype.distLine=null;
MapController.prototype.autocomplete=null;
MapController.prototype.placeMarker=null;
MapController.prototype.placeInfo=null;
MapController.prototype.distLabel=null;

var circleInShipMarkers = null;
var distanceCircle = null;
var distancePolyLines = null;
var distancePolyLineLabels = [];
var distancePolyLinePoints = [];
var distanceDrawingMode = false;
var circleInShipCntLimit = 1000;
var circleInShipDistLimit = 500000;


function getTimeStamp() {
	  var d = new Date();

	  var s =
	    leadingZeros(d.getFullYear(), 4)  +
	    leadingZeros(d.getMonth() + 1, 2) +
	    leadingZeros(d.getDate(), 2)+'_'+
	    leadingZeros(d.getHours(), 2)+
	    leadingZeros(d.getMinutes(), 2)+
	    leadingZeros(d.getSeconds(), 2);
	  return s;
	}

function MapController(controlDiv, map,autocompleteDiv) {
	// We set up a variable for this since we're adding event listeners later.
	var control = this;
	var fontSize = '1.8em';
	// Set the center property upon construction
	control.center_ = map.getCenter();
	controlDiv.style.clear = 'both';

	// Set CSS for the control border
	var mapControllerBox = $(document.createElement('p'));
	$(controlDiv).append(mapControllerBox);

	var fullButton = $(document.createElement('button'));
	fullButton.addClass( 'btn');
	fullButton.addClass('btn-white'); 
    fullButton.addClass('btn-sm');
    fullButton.addClass('btn-primary');
    fullButton.css('border',' 1px solid #D5D5D5');
    mapControllerBox.append(fullButton);
    
	var fullIcon = $(document.createElement('i'));
	fullIcon.addClass( 'ace-icon');
	fullIcon.addClass('glyphicon');
	fullIcon.addClass('glyphicon-fullscreen');
	fullIcon.css('font-size',fontSize);
	fullIcon.css('margin-right','0');
	//아이콘 색상 변경
	//fullIcon.css('color','#D5D5D5');
	
	fullButton.append(fullIcon);
	
	/*if(pageId=="SAIS"){
		var distCircleButton = $(document.createElement('button'));
		distCircleButton.addClass( 'btn');
		distCircleButton.addClass('btn-white');
		distCircleButton.addClass('btn-sm');
		distCircleButton.addClass('btn-primary');
		distCircleButton.css('border',' 1px solid #D5D5D5');
		mapControllerBox.append(distCircleButton);
		
		var distCircleIcon = $(document.createElement('img'));
		distCircleIcon.attr('src',rootCntext+ "/resources/img/icon/icon_distance_circle.png");
		distCircleIcon.css('width',"23px");
		distCircleIcon.css('height',"23px");
		distCircleButton.append(distCircleIcon);
		
		 Circle In Distance InfoBox Option 
		var infoBoxMarker = null;
		var ib = null;
		var ibOptions = {
				disableAutoPan: false
				,maxWidth: 0
				,pixelOffset: new google.maps.Size(-40, 5)
				,zIndex: null
				,boxStyle: {
				padding: "0px 0px 0px 0px",
				width: "100px",
				height: "40px",
				backgroundColor: "rgba(0,0,0,0)",
				borderColor: "rgba(0,0,0,0) !important",	
				},
				closeBoxURL : "",
				infoBoxClearance: new google.maps.Size(1, 1),
				isHidden: false,
				pane: "floatPane",
				enableEventPropagation: false
				};
		var source   = $("#infobox-template").html();
	    var template = Handlebars.compile(source);
	    var boxText = document.createElement("div");
	    boxText.style.cssText = "margin-top: 8px; background-color: rgba(0,0,0,0); padding: 0px;";
	}*/
	
	var distButton = $(document.createElement('button'));
	distButton.addClass( 'btn');
	distButton.addClass('btn-white');
	distButton.addClass('btn-sm');
	distButton.addClass('btn-primary');
	distButton.css('border',' 1px solid #D5D5D5');
	mapControllerBox.append(distButton);
	
	var distIcon = $(document.createElement('img'));
	distIcon.attr('src',"/img/icon/icon_distance.png");
	distIcon.css('width',"23px");
	distIcon.css('height',"23px");
	distButton.append(distIcon);
	
	var trashButton = $(document.createElement('button'));
	trashButton.addClass( 'btn');
	trashButton.addClass('btn-white');
	trashButton.addClass('btn-sm');
	trashButton.addClass('btn-primary');
	trashButton.css('border',' 1px solid #D5D5D5');
	mapControllerBox.append(trashButton);
	
	var trashIcon = $(document.createElement('i'));
	trashIcon.addClass( 'ace-icon');
	trashIcon.addClass('glyphicon');
	trashIcon.addClass('glyphicon-trash');
	trashIcon.css('font-size',fontSize);
	trashIcon.css('margin-right','0');
	trashButton.append(trashIcon);
	
	var captureButton = $(document.createElement('button'));
	captureButton.addClass( 'btn');
	captureButton.addClass('btn-white');
	captureButton.addClass('btn-sm');
	captureButton.addClass('btn-primary');
	captureButton.css('border',' 1px solid #D5D5D5');
	mapControllerBox.append(captureButton);
	
	var captureIcon = $(document.createElement('i'));
	captureIcon.addClass( 'ace-icon');
	captureIcon.addClass('glyphicon');
	captureIcon.addClass('glyphicon-camera');
	captureIcon.css('font-size',fontSize);
	captureIcon.css('margin-right','0');
	if(pageId=="SAIS"){
		/* Circle In Distance InfoBox Option */
		var infoBoxMarker = null;
		var ib = null;
		var ibOptions = {
				disableAutoPan: false
				,maxWidth: 0
				,pixelOffset: new google.maps.Size(-40, 5)
				,zIndex: null
				,boxStyle: {
				padding: "0px 0px 0px 0px",
				width: "100px",
				height: "40px",
				backgroundColor: "rgba(0,0,0,0)",
				borderColor: "rgba(0,0,0,0) !important",	
				},
				closeBoxURL : "",
				infoBoxClearance: new google.maps.Size(1, 1),
				isHidden: false,
				pane: "floatPane",
				enableEventPropagation: false
				};
		var source   = $("#infobox-template").html();
	    var template = Handlebars.compile(source);
	    var boxText = document.createElement("div");
	    boxText.style.cssText = "margin-top: 8px; background-color: rgba(0,0,0,0); padding: 0px;";
	}
	captureButton.append(captureIcon);
	captureButton.click(function(){
		//captureHtml($('#mainRow'),'test');
		html2canvas($('body'),{
			useCORS: true,
			onrendered:function(canvas){
				var dataUrl= canvas.toDataURL('image/png');
				 var a = document.createElement('a');
				 a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
			        a.download = 'CommTrace_'+getTimeStamp()+'.jpg';
			        a.click();
			    $("#tracking>.gm-style>div:first>div").css({
			      left:0,
			      top:0,
			    })
			    
			}
		
		});
	});
	
	fullButton.click(function() {
		var currentCenter = control.getCenter();
		if(map.getZoom()>3){
			map.setCenter(currentCenter);
			map.setZoom(3);
		}
	});
	
	var circle = null;
	var circleChgRad = null;
	var circleEditRad = null;
	var circleEditCen = null;
	if(pageId=="SAIS"){
		distCircleButton.click(function() {
			
			clearDrawObject();
			control.drwManager.setDrawingMode(google.maps.drawing.OverlayType.CIRCLE) ;
		});
	}
	var rad = function(x) {
	  return x * Math.PI / 180;
	};
	var getDistance = function(p1, p2) {
	  var R = 6378137; // Earth’s mean radius in meter
	  var dLat = rad(p2.lat() - p1.lat());
	  var dLong = rad(p2.lng() - p1.lng());
	  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
	    Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
	    Math.sin(dLong / 2) * Math.sin(dLong / 2);
	  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	  var d = R * c;
	  return d; // returns the distance in meter
	};
	
	map.addListener('click', addLatLng);
    map.addListener('rightclick', function(){
    	distanceDrawingMode = false;
    	map.setOptions({draggableCursor:'grab'});
    	_setRectanglesClickable(!distanceDrawingMode);
    	_setShipMarkersClickable(!distanceDrawingMode);
    });
    
	distButton.click(function() {
		control.drwManager.setDrawingMode(null);
		control.drwManager.drawingStatus = null;
		
		clearDrawObject();
		if(distanceDrawingMode){
			distanceDrawingMode = false;
			map.setOptions({draggableCursor:'grab'});
			_setRectanglesClickable(!distanceDrawingMode);
			_setShipMarkersClickable(!distanceDrawingMode);
		}else{
			distanceDrawingMode = true;
			map.setOptions({draggableCursor:'crosshair'});
			_setRectanglesClickable(!distanceDrawingMode);
			_setShipMarkersClickable(!distanceDrawingMode);
		}
		
//		control.drwManager.setDrawingMode(google.maps.drawing.OverlayType.POLYLINE);
		distancePolyLines = new google.maps.Polyline({
			editable: false,
        	strokeColor: 'red',
    		strokeOpacity: 0.8,
    		strokeWeight: 2,
    		zIndex : 2000,
    		editable: false,
	        });
		distancePolyLines.setMap(map);
		// Add a listener for the click event
	});
	
	 // Handles click events on a map, and adds a new point to the Polyline.
    function addLatLng(event) {
    	
    	if(!distanceDrawingMode){	
    		return;
    	}; 
      var path = distancePolyLines.getPath();

      // Because path is an MVCArray, we can simply append a new coordinate
      // and it will automatically appear.
      path.push(event.latLng);
      
      control.distLine = distancePolyLines;
      
      var paths = control.distLine.getPath().getArray();
		var distNumTotal = 0;
		var distNum = [];
		if(paths.length >1){
			for(var i=0;i<paths.length-1;i++){
				distNumTotal += distanceKm(paths[i],paths[i+1]);
				distNum[i] = distanceKm(paths[i],paths[i+1]);
			}
			
			/*if(distNum<1){
				distNumTotal = distNumTotal*1000;
				distNumTotal = distNumTotal.toFixed(2)+"m";
			}else {
				distNumTotal = distNumTotal.toFixed(2)+"km";
			}*/
			distNumTotal = userUnit.getDistance({distance:distNumTotal,source:'KM',decimalPoint:1});
			//console.log(distNum.length);
			for(var i=0;i<distNum.length;i++){
				//alert(userUnit.getDistance({distance:distNum[i],source:'KM',decimalPoint:1}));
				
				distNum[i] = userUnit.getDistance({distance:distNum[i],source:'KM',decimalPoint:1}).split(" ")[0];
			}
			
			var text = "";
			if(distNum.length>1){
				text = "    "+distNum[distNum.length-1]+" ("+distNumTotal+")";
			}else{
				text = "    "+distNumTotal;
			}
			
			var distLabel = new MapLabel({
		        text: text,
		        position: paths[paths.length-1],
		        fontSize: 14,
		        strokeWeight :3,
		        map:map,
		        align: 'left',
		        zIndex : 2000,
		    });
			
			distancePolyLineLabels.push(distLabel);
		}
		var circlebrIcon = new google.maps.MarkerImage('/img/circlebr10.png', 
				new google.maps.Size(12, 12), null,
				new google.maps.Point(5, 5)
		);	
		
		var distancePolyLinePoint = new google.maps.Marker({
        	position:paths[paths.length-1],
        	clickable: false,
        	cursor: 'crosshair',
        	map:map, 
        	icon:circlebrIcon,
	    });
		
		distancePolyLinePoints.push(distancePolyLinePoint);
		
    }
	
	trashButton.click(function() {
		control.drwManager.setDrawingMode(null);
		control.drwManager.drawingStatus = null;
		
		clearDrawObject();
		map.setOptions({ draggableCursor: 'grab' });
	});
	
	control.drwManager  = new google.maps.drawing.DrawingManager({
        drawingControl: false,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
                google.maps.drawing.OverlayType.POLYLINE,
                google.maps.drawing.OverlayType.CIRCLE,
            ]
        },
        polylineOptions: { 
        	editable: false,
        	strokeColor: 'red',
    		strokeOpacity: 0.8,
    		strokeWeight: 4,
    		zIndex : 2000,
    		editable: true,
        },
        circleOptions: { 
        	editable: true,
        	strokeColor: 'red',
    		strokeOpacity: 0.8,
    		strokeWeight: 2,
    		zIndex : 2000,
    		suppressUndo: true,
        },
    });
	
	control.drwManager.setMap(map);
	control.drwManager.setDrawingMode(null);
	
	
	/*
	google.maps.event.addListener(polygon.getPath(), 'insert_at', function() {
		  displayDrawingInfo(polygon);
		});
	*/
    /* Get Distance Draw End Event */
	google.maps.event.addListener( control.drwManager, "overlaycomplete", function(e){	
		switch(e.type){
		case "polyline" :
			control.distLine = e.overlay;
			control.drwManager.setDrawingMode(null);
			
			var paths = control.distLine.getPath().getArray();
			var distNum = 0;
			
			if(paths.length >1){
				for(var i=0;i<paths.length-1;i++){
					distNum += distanceKm(paths[i],paths[i+1]);
				}
				/*if(distNum<1){
					distNum = distNum*1000;
					distNum = distNum.toFixed(2)+"m";
				}else {
					distNum = distNum.toFixed(2)+"km";
				}*/
				distNum = userUnit.getDistance({distance:distNum,source:'KM',decimalPoint:1});
				
				control.distLabel = new MapLabel({
			        text: "    "+distNum,
			        position: paths[paths.length-1],
			        fontSize: 12,
			        strokeWeight :3,
			        map:map,
			        align: 'left',
			    });
				
			}
			break;
		case "circle" :
			if(e.overlay.getRadius()>circleInShipDistLimit){	// 원 크기제한
				e.overlay.setRadius(circleInShipDistLimit);
			}
			control.distLine = e.overlay;
			control.drwManager.setDrawingMode(null);

			var distNum = 0;
			distNum = userUnit.getDistance({distance:control.distLine.radius/1000,source:'KM',decimalPoint:1});
			/*
			   control.distLabel = new MapLabel({			// Create Ship's Distance In Circle Label
			       text: "    "+distNum,
			       position: control.distLine.center,
			       fontSize: 12,
			       strokeWeight :3,
			       map:map,
			       align: 'left',
			       zIndex: -10,
			});
			*/
			getCircleInShipCnt(control.distLine.center);
//			getCircleInShipMarkers(shipMarkers, control.distLine.center);	// get Ships In Circle Markers
			/*
			console.dir(circleInShipMarkers);
			
			for(var i = 0 ; i<circleInShipMarkers.length ; i++){
				if(circleInShipMarkers[i].cog) circleInShipMarkers[i].cog = circleInShipMarkers[i].cog.toFixed(1);
				if(circleInShipMarkers[i].sog) circleInShipMarkers[i].sog = circleInShipMarkers[i].sog.toFixed(1);
			}
			*/
			infoBoxMarker = new google.maps.Marker({
	             position: control.distLine.center,
	             icon: {
	                 path: google.maps.SymbolPath.CIRCLE,
	                 scale: 0,
	             },
	             map: map
	           });
			
	        boxText.innerHTML = template({distNum: distNum});
	        ibOptions.content = boxText
	        ib = new InfoBox(ibOptions);
	      	ib.open(map, infoBoxMarker);
	        map.panTo(ib.getPosition());
				
			
	        
			google.maps.event.addListener(control.distLine, 'bounds_changed', function(){
//				$('img[src$="undo_poly.png"]').hide() 
				if(e.overlay.getRadius()>500000){	// 원 크기제한
					e.overlay.setRadius(500000);
				}
				
				if(infoBoxMarker != null){
					infoBoxMarker.setMap(null);
					$('.infobox').css({width:"0",height:"0"});
				}
				if (circleInShipMarkers != null){
					circleInShipMarkers = null;
				}
				if(ib!=null){
		        	ib=null;
		        }
				distNum = userUnit.getDistance({distance:control.distLine.radius/1000,source:'KM',decimalPoint:1});		
				getCircleInShipCnt(control.distLine.center);
//				getCircleInShipMarkers(shipMarkers, control.distLine.center);	// get Ships In Circle Markers
				infoBoxMarker = new google.maps.Marker({
		             position: control.distLine.center,
		             icon: {
		                 path: google.maps.SymbolPath.CIRCLE,
		                 scale: 0,
		             },
		             map: map
		           });
				boxText.innerHTML = template({distNum: distNum});
		        ibOptions.content = boxText;
		        ib = new InfoBox(ibOptions);
		      	ib.open(map, infoBoxMarker);
		        map.panTo(ib.getPosition());
			});
			
			distanceCircle = e;
			
			map.setOptions({draggableCursor:'grab'});
			break;
		}
		
		
	} );
	
	control.autocomplete = new google.maps.places.SearchBox(autocompleteDiv);
	control.autocomplete.bindTo('bounds', map);
	
	control.placeInfo = new google.maps.InfoWindow({zIndex:1000});
	control.placeMarker = new google.maps.Marker({
		map: map,
	    anchorPoint: new google.maps.Point(0, -29),
	    zIndex : 1000
	});
	
	google.maps.event.addListener(control.placeInfo,'closeclick',function(){
		if(control.placeMarker != null){
			control.placeMarker.setMap(null); 
		}
	});
	
	google.maps.event.addListener(control.autocomplete, 'places_changed', function() {
		control.placeInfo.close();
		control.placeMarker.setVisible(false);
	    var place = control.autocomplete.getPlaces()[0];
	    if (!place.geometry) {
	    	showGritter( $.i18n.t("TEXT_0_00289"),"w");
	    	return;
	    }
	    // If the place has a geometry, then present it on a map.
	    if (place.geometry.viewport) {
	      map.fitBounds(place.geometry.viewport);
	    } else {
	      map.setCenter(place.geometry.location);
	      map.setZoom(17);  // Why 17? Because it looks good.
	    }
	    control.placeMarker.setIcon(/** @type {google.maps.Icon} */({
	    	url: place.icon,
	        size: new google.maps.Size(35, 35),
	        origin: new google.maps.Point(0, 0),
	        anchor: new google.maps.Point(8, 17),
	        scaledSize: new google.maps.Size(17, 17)
	    }));
	    control.placeMarker.setPosition(place.geometry.location);
	    control.placeMarker.setVisible(true);
	    var address = '';
	   
	    if (place.address_components) {
	    	address = [
	    	           (place.address_components[2] && place.address_components[2].long_name || ''),
	    	           (place.address_components[1] && place.address_components[1].long_name || ''),
	    	           (place.address_components[0] && place.address_components[0].long_name || ''),
	        ].join(' ');
	    }
	    control.placeMarker.setMap(map); 
	    control.placeInfo.setContent('<div><strong>' + place.name + '</strong><br>' + address);
	    control.placeInfo.open(map, control.placeMarker);

	});
	
	function getCircleInShipCnt(distLineCenter){
		var url = rootCntext+"/sadm/json/getCircleInShipCnt.do?pageId=SAIS";
		var param = {lat:distLineCenter.lat().toFixed(4), lng:distLineCenter.lng().toFixed(4), distance:(control.distLine.radius/1000).toFixed(4)}
		var count = 0;
		
		var selectedClassViewNode = $('#layer_ClassViewJstree').jstree("get_selected");
		
		if( $.inArray('CLASS_A', selectedClassViewNode) >=0 && $.inArray('CLASS_B', selectedClassViewNode) >= 0){
			param.classType = 'ALL';
		}else if( $.inArray('CLASS_A', selectedClassViewNode) >=0 ){
			param.classType = 'CLASS_A';
		}else if($.inArray('CLASS_B', selectedClassViewNode) >=0 ){
			param.classType = 'CLASS_B';
		}else{
			param.classType = 'NO'; //아무것도 체크 안된 경우
		}
		
		param.shipTyCds = unSelectedVesselType.toString();

		$.ajax({
			url : url,
		    type: 'POST',
		    data : param,
		    async: true,
		    dataType: 'json',
		    success: function (result) {
				count = result.count;
				$('#circleInShipCnt').text(count)
		    },
		    error: function (data) {
		    	$('#circleInShipCnt').text("Error")
		    }
		    ,beforeSend: function(){
		    	$('#loading').addClass('loading');
		    }
		    ,complete: function(){
		    	$('#loading').removeClass('loading');
		    	$('#circleInShipsDown').click(function(){getCircleInShipMarkers(distLineCenter)});
		    }
		})
	}
	
	function getCircleInShipMarkers(distLineCenter){
		circleInShipMarkers = []
		var shipCategorys = ["Cargo","Tanker","Tug & SpecialCraft","Passenger","Fishing","High Speed Craft","	Pleasure Craft","Other Vessels","Unknown Vessels"];
		var url = rootCntext+"/sadm/json/getCircleInShipMarkers.do?pageId=SAIS";
		var param = {lat:distLineCenter.lat().toFixed(4), lng:distLineCenter.lng().toFixed(4), distance:(control.distLine.radius/1000).toFixed(4)}
		var csvCircleInShips = [];
		var count = 0;
		var selectedClassViewNode = $('#layer_ClassViewJstree').jstree("get_selected");
		if( $.inArray('CLASS_A', selectedClassViewNode) >=0 && $.inArray('CLASS_B', selectedClassViewNode) >= 0){
			param.classType = 'ALL';
		}else if( $.inArray('CLASS_A', selectedClassViewNode) >=0 ){
			param.classType = 'CLASS_A';
		}else if($.inArray('CLASS_B', selectedClassViewNode) >=0 ){
			param.classType = 'CLASS_B';
		}else{
			param.classType = 'NO'; //아무것도 체크 안된 경우
		}
		param.shipTyCds = unSelectedVesselType.toString();
		
		var circleInShipCnt = $('#circleInShipCnt').text()
		if(circleInShipCnt > circleInShipCntLimit){
			showGritter( $.i18n.t("TEXT_0_00422",{"shipCntLimit":circleInShipCntLimit}),"w");
			return;
		}else if(circleInShipCnt=="Loading"){
			
			showGritter( $.i18n.t("TEXT_0_00421"),"w");
			return;
		}else if(circleInShipCnt=="Error"){
			showGritter( $.i18n.t("TEXT_0_00252"),"w");
			return;
		}
		
		$.ajax({
			url : url,
		    type: 'POST',
		    data : param,
		    async: true,
		    dataType: 'json',
		    success: function (result) {
		    	circleInShipMarkers = result.results;
//		    	count = result.count;
		    },
		    error: function (data) {
		    	$('#circleInShipCnt').text("Error")
		    }
		    ,beforeSend: function(){
		    	$('#loading').addClass('loading');
		    }
		    ,complete: function(){
		    	$('#loading').removeClass('loading');
		    	
		    	var csvCircleInShips = [];
		    	circleInShipMarkers.forEach(function(circleInShipMarker){
					var csvCircleInShip = {};
					if(circleInShipMarker.shipName==null||circleInShipMarker.shipName==""){
						circleInShipMarker.shipName = "UNKNOWN";
					}
					if(circleInShipMarker.destination==null||circleInShipMarker.destination==""){
						circleInShipMarker.destination = "UNKONWN";
					}
					if(circleInShipMarker.cog) circleInShipMarker.cog = circleInShipMarker.cog.toFixed(1);
					if(circleInShipMarker.sog) circleInShipMarker.sog = circleInShipMarker.sog.toFixed(1);
					
					csvCircleInShip.shipName = replaceAll(replaceAll(circleInShipMarker.shipName,',',' '),'\"','');
					csvCircleInShip.flag = circleInShipMarker.flag;
					csvCircleInShip.mmsi = circleInShipMarker.mmsi;
					csvCircleInShip.shipTypeName = shipCategorys[circleInShipMarker.shipTypeName-1];
					csvCircleInShip.destination = replaceAll(replaceAll(circleInShipMarker.destination,',',' '),'.',' ');
					csvCircleInShip.latitude = circleInShipMarker.latitude;
					csvCircleInShip.longitude = circleInShipMarker.longitude;
					csvCircleInShip.heading = circleInShipMarker.heading;
					csvCircleInShip.length = circleInShipMarker.length;
					csvCircleInShip.width = circleInShipMarker.width;
					csvCircleInShip.rot = circleInShipMarker.rot;
					csvCircleInShip.sog = circleInShipMarker.sog;
					csvCircleInShip.cog = circleInShipMarker.cog;
					csvCircleInShip.aisRcvDt = circleInShipMarker.aisRcvDt;
					
					csvCircleInShips.push(csvCircleInShip);
		    	})
		    	
		    	$('#circleInShipCnt').text(circleInShipMarkers.length)
		    	downloadCSV({filename:moment().format('YYYYMMDDHHmmss_'+circleInShipMarkers.length)+'.csv'}, csvCircleInShips)
		    }
		})
	}

	function replaceAll(str, searchStr, replaceStr) {
	  return str.split(searchStr).join(replaceStr);
	}
	
	function clearDrawObject(){
		if(control.distLine != null){
			control.distLine.setMap(null);
			control.distLine = null;
		}
		if(control.distLabel != null){
			control.distLabel.setMap(null);
			control.distLine = null;
		}
		
		distanceDrawingMode = false;
		
		_setRectanglesClickable(!distanceDrawingMode);
		_setShipMarkersClickable(!distanceDrawingMode);
		
		if(distancePolyLineLabels!=null){
			distancePolyLineLabels.forEach(function(distancePolyLineLabel){
				distancePolyLineLabel.setMap(null);
			})
			distancePolyLineLabels=[];
		}
		
		if(distancePolyLinePoints!=null){
			distancePolyLinePoints.forEach(function(distancePolyLinePoint){
				distancePolyLinePoint.setMap(null);
			})
			distancePolyLinePoints=[];
		}
		
		if(circle != null){
			circle.setMap(null);
			circle = null;
			distanceCircle = null;
		}
		
		if(ib!=null){
			ib.close();
        	ib=null;
        }
		if(infoBoxMarker != null){
			infoBoxMarker.setMap(null);
			$('.infobox').css({width:"0",height:"0"});
		}
		if (circleInShipMarkers != null){
			circleInShipMarkers = null;
		}
		if (distanceCircle != null) {
			distanceCircle = null;
		}
		
	}
}

function convertArrayOfObjectsToCSV(args, options) {  
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;
    options = options || {};
    data = args.data || null;
    if (data == null || !data.length) {
        return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';
    
    keys = Object.keys(data[0]);
    
    result = '';
    
    result += options.keys||keys.join(columnDelimiter);
    
    result += lineDelimiter;

    data.forEach(function(item) {
        ctr = 0;
        keys.forEach(function(key) {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
}

function downloadCSV(args, stockData) {  
    var data, filename, link;
    var csv = convertArrayOfObjectsToCSV({
        data: stockData,
    },{
    	keys:["Name,Flag,MMSI,Type,Destination,Latitude(degree),Longitude(degree),Heading(degree),Length(m),Width(m),Turn(ROT),Speed(knot),Course(COG),Timestamp(UTC)"]
    });
    if (csv == null) return;

    filename = args.filename || 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
}

function _changeCircleRadius(status){
	switch(status){
	case 0:
		$("#info-box-text-wrap-view").css("display","");
		$("#info-box-text-wrap-text").css("display","none");
		var radius = $("#info-box-text-wrap-input").val();
		if(radius!=""&&radius!=null){
			
			radius = userUnit.getDistance({distance:radius,source:userUnit.distanceUnit,resultUnit:'M',decimalPoint:1}).split(" ")[0];
			distanceCircle.overlay.setRadius(parseFloat(radius));
		}
		break;
	case 1:
		$("#info-box-text-wrap-view").css("display","none");
		$("#info-box-text-wrap-text").css("display","");
		break;
	}
}
 function _changeCircleRadiusKeyUp(){
	 if (window.event.keyCode == 13) {
		 // 엔터키가 눌렸을 때 실행할 내용
		 _changeCircleRadius(0);
	 }
 }

function _setRectanglesClickable(flag){
	rectangles.forEach(function(rectangle){
		rectangle.clickable = flag;
	});
	rectangles.forEach(function(rectangle){
		rectangle.setMap(null);
	});
	rectangles.forEach(function(rectangle){
		rectangle.setMap(map);
	});
}

function _setShipMarkersClickable(flag){
	shipMarkers.forEach(function(shipMarker){
		shipMarker.setClickable(flag);
	});
}