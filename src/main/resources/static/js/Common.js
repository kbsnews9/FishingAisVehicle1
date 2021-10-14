/**
 * 
 */


var MidShipImage = '/images/marker/ship_medium.png';
/*
function sendRequest(url,method,param){
	
	return new Promise(resolve=>{
		var returnData;
		var returnCheck = false;
		axios.request({ //some options 
			method : method,
			url : url,
			headers : {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'},
			params : param
		}).then(response=>{ 
			returnData = {};
			const {data: responseBody, status: responseCode}= response; 
			console.log(response.data);
			returnData["value"] = response.data;
			returnData["status"] = response.status;
			returnCheck = true;
			
		}).catch(e=>{ //then에서 예외가 발생했거나, response code가 400 이상인 경우(실패) 이쪽으로 넘어온다 
			console.error(e);
			returnData = {};
			returnData["errorCheck"] = true;
			returnData["errorDesc"] = "Connection is not smooth.";
			returnCheck = true;
			
			
		});
		
		
		while(returnCheck==false){
			setTimeout(() => {}, 500);
		}
		resolve(returnData);
		  
	});
		
}

*/

function toggleFullScreen() {
	  var doc = window.document;
	  var docEl = doc.documentElement;

	  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
	  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

	  if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
	    requestFullScreen.call(docEl);
	  }
	  else {
	    cancelFullScreen.call(doc);
	  }
	}


function getShipIcon2(value,flag){
	var getHeading = value.heading;
	if((getHeading==511 || getHeading==0) && (value.cog!=0 && value.cog!=511)){
		
		//getHeading = 0.0;
		getHeading = value.cog;
		
		/*
		if(flag==1){
			flag = 7;
		}
		*/
		
	}
	if(flag!=4 && flag!=6){
		//console.log(value.sog);
		if(value.sog>5.0){
			flag =3;
		}else if(value.sog>1.8){
			flag =2;
		}
		
		
		//console.log(flag);
	}
	
	
	var heading = getHeading == null ||getHeading == 0.0 ? 36 : Math.floor(getHeading/10);
	var setPoint = 1;
	
	
	
	var icon;
	icon = new google.maps.MarkerImage(MidShipImage, 
            new google.maps.Size(24 , 24), 
            new google.maps.Point(24 * flag, 24 * heading ),
            new google.maps.Point(12, 12 )
      );
	return icon;
}

function getShipIcon3(value){
	var getHeading = value.heading;
	var setPoint = 1;
	if((getHeading==511 || getHeading==0) && (value.cog!=0 && value.cog!=511)){
		getHeading = value.cog;
		
		//setPoint = 7;
	}
		
	if(value.sog>5.0){
		setPoint =3;
	}else if(value.sog>1.8){
		setPoint =2;
	}
	var heading = getHeading == null ||getHeading == 0.0 ? 36 : Math.floor(getHeading/10);
	
	
	
	var icon;
	icon = new google.maps.MarkerImage(MidShipImage, 
            new google.maps.Size(24 , 24), 
            new google.maps.Point(24 * setPoint, 24 * heading ),
            new google.maps.Point(12, 12 )
      );
	return icon;
}

function markerOpacity(value){
	
	var now = new Date();
	var nowMil = now.getTime()/1000;
	var valueDateMil = Date.parse(value.eventDate + " UTC")/1000;
	
	var retrunVal = 1.0;
	
	if(valueDateMil<nowMil-(60*60*24)){
		retrunVal = 0.3;
	}else if(valueDateMil<nowMil-(60*60*12)){
		retrunVal = 0.5;
	}else if(valueDateMil<nowMil-(60*60*6)){
		retrunVal = 0.75;
	}
	
	
	
	
	return retrunVal;
}

function lastDateTimeSpan(value){
	
	var now = new Date();
	var nowMil = Math.floor(now.getTime()/1000);	
	;
	var valueDateMil = Math.floor(Date.parse(value + " UTC")/1000);
	
	var timeSpan = nowMil - valueDateMil;
	//console.log(nowMil);
	//console.log(valueDateMil);
	//console.log(nowMil-valueDateMil);
	
	
	var retrunVal;
	if(timeSpan<60){
		retrunVal = Math.floor(timeSpan)+" sencond";
	}else if(timeSpan<(60*60)){
		returnVal = Math.floor(timeSpan/60)+" minute";
	}else if(timeSpan<(60*60*24)){
		var hour =  Math.floor(timeSpan/(60*60));
		var min = Math.floor((timeSpan-(60*60)*hour)/60);
		returnVal = Math.floor(timeSpan/(60*60))+" hour ";
		if(min>0){
			returnVal = returnVal+ min+ " minute ";
		}
	}else{
		var day = Math.floor(timeSpan/(60*60*24));
		
		var hour = Math.floor((timeSpan- (60*60*24*day))/(60*60));
		
		var min = Math.floor((timeSpan-((60*60*24*day)+(60*60*hour)))/60);
		returnVal = day+" day ";
		if(hour>0){
			returnVal = returnVal+ hour+ " hour ";
		}
		if(min>0){
			returnVal = returnVal+ min+ " minute ";
		}
	}
	
	
	return returnVal+"ago";
}

function fullScreenBtn() {
	var elem = document.documentElement;
	
  if (elem.requestFullscreen) {
//	  console.log("chrome");
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
//	  console.log("Safari");
	  elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
//	  console.log("IE11");
    elem.msRequestFullscreen();
  }
}

function histBtnChange(btn,checker,changeStrap){
	
	
	
	if(checker){
//		console.log(changeStrap+" : "+checker);
//		console.log("btn-"+changeStrap);
		btn.removeClass("btn-outline-"+changeStrap);
		btn.addClass("btn-"+changeStrap);
	}else{
//		console.log(changeStrap+" : "+checker);
//		console.log("btn-outline-"+changeStrap);
		btn.removeClass("btn-"+changeStrap);
		btn.addClass("btn-outline-"+changeStrap);
	}
	
	return checker;
}

function hist_marker_speed_hide(markerList,checkValue){
	
	markerList.forEach(function(value,index,arr){
		value.setVisible(checkValue);
		value.setLabelVisible(checkValue);
	});
	
}


function current_marker_speed_hide(markerList,checkValue){
	
	markerList.forEach(function(value,index,arr){
		value.setVisible(checkValue);
		value.setLabelVisible(checkValue);
	});
	
}