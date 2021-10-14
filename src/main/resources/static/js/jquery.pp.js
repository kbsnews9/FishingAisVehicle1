//;(function ($, undef) {

/**
 * CursorControl 클래스
 * 
 * @constructor
 */
var CursorControl = function(map) {
	
	
	
	//init();
	/**
	 * 지도에 위경도를 표시하는 컨트롤박스를 표시한다.
	 * 
	 * @param {google.maps.ControlPosition}
	 *            position ex)google.maps.ControlPosition.BOTTOM_LEFT
	 */
	
	var thisPosition = google.maps.ControlPosition.RIGHT_BOTTOM;
	var latlondiv = document.getElementById("LatLonTxt");
	if (latlondiv === undefined || latlondiv === null) {
		
		google.maps.event.addListener(map, "mouseover", function() {
			showControls();
		});
		google.maps.event.addListener(map, "mouseout", function(event) {
			if (!map.getBounds().contains(event.latLng))
				hideControls();
		});
		MapCursorControl(thisPosition);
	}
	

	function MapCursorControl(position) {
		var container = document.createElement("div");
		var ptr = document.createElement("div");
		ptr.id = "LatLonTxt";
		ptr.style.padding = "3px";
		container.appendChild(ptr);
		var tim = 0;
		google.maps.event
				.addListener(
						map,
						"mousemove",
						function(event) {
							var tim2 = new Date;
							if (tim2.getTime() > tim) {
								var ws = fixedLlString(event.latLng.lat(),
										event.latLng.lng());
								if (map.getMapTypeId() == google.maps.MapTypeId.HYBRID
										|| map.getMapTypeId() == google.maps.MapTypeId.SATELLITE)
									ptr.style.color = "White";
								else
									ptr.style.color = "Black";
								ptr.innerHTML = ws;
								tim = tim2.getTime() + 50;
							}
						});
		map.controls[eval(position)].push(container);
		return container;
	}
	;

	var fixedLlString = function(la, lo) {
		var s = "N";
		var w = "E";
		if (la < 0) {
			la = -la;
			s = "S";
		}
		if (lo < 0) {
			lo = -lo;
			w = "W";
		}
		var lai = Math.floor(la);
		var laf = Math.round((la - lai) * 1E4);
		var lais = lai.toString();
		while (lais.length < 2)
			lais = "0" + lais;
		var lafs = laf.toString();
		while (lafs.length < 4)
			lafs = "0" + lafs;
		var loi = Math.floor(lo);
		var lof = Math.round((lo - loi) * 1E4);
		var lois = loi.toString();
		while (lois.length < 3)
			lois = "0" + lois;
		var lofs = lof.toString();
		while (lofs.length < 4)
			lofs = "0" + lofs;
		var lamin = Math.floor((la - lai) * 60);
		var lasec = ((la - lai) * 60 - lamin) * 60;
		var laseci = Math.floor(lasec);
		var lasecf = Math.floor((lasec - laseci) * 100);
		if (lamin.toString().length == 1)
			lamin = "0" + lamin;
		if (laseci.toString().length == 1)
			laseci = "0" + laseci;
		if (lasecf.toString().length == 1)
			lasecf = "0" + lasecf;
		var lomin = Math.floor((lo - loi) * 60);
		var losec = ((lo - loi) * 60 - lomin) * 60;
		var loseci = Math.floor(losec);
		var losecf = Math.floor((losec - loseci) * 100);
		if (lomin.toString().length == 1)
			lomin = "0" + lomin;
		if (loseci.toString().length == 1)
			loseci = "0" + loseci;
		if (losecf.toString().length == 1)
			losecf = "0" + losecf;
		var res = "";
		res = s + lais + "&deg;" + lamin + "'" + laseci + "." + lasecf
				+ '"<br/>';
		res += w + lois + "&deg;" + lomin + "'" + loseci + "." + losecf
				+ '"<br/>';
		res += "(" + (s == "S" ? "-" : "") + lais + "." + lafs + ", "
				+ (w == "W" ? "-" : "") + lois + "." + lofs + ")";
		return res;
	};

	var showControls = function() {
		map.setOptions({
			//streetViewControl : true, // 스트리트 뷰
			//zoomControl : true
		});
		var latlondiv = document.getElementById("LatLonTxt");
		if (latlondiv)
			latlondiv.style.visibility = "visible";
		// if (adUnitDiv) adUnitDiv.style.display = "block";
	};

	var hideControls = function() {
		map.setOptions({
			zoomControl : false,
			streetViewControl : false
		// 스트리트 뷰
		});
		var latlondiv = document.getElementById("LatLonTxt");
		if (latlondiv)
			latlondiv.style.visibility = "hidden";
		// if (adUnitDiv) adUnitDiv.style.display = "none";
	};
};

// });
