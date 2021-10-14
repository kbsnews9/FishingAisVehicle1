

var accessInfo={};
var elem = document.documentElement;
jQuery(function(){
	
	
	
	//window.addEventListener("load", function(){ setTimeout(scrollTo, 0, 0, 1); }, false);
	
	
	var accessInfoArray = $("#accessInfo").serializeArray();
	
	for(var accessData of accessInfoArray){
		accessInfo[accessData.name] = accessData.value;
	}
		
	localStorage["accessInfo"] = JSON.stringify(accessInfo);
	
	
	$("#accessAreaModalClose").click(function(){
		$("#accessAreaModal").hide();
	});
	
	$("#sendMain").click(function(){
		
		var areaId=$("#areaSelector option:selected").val();
		var userData = {};
		userData["areaId"] = areaId;
		localStorage["userData"] = JSON.stringify(userData);
		
		location.replace("main.do");
		
	});
});

//async function login(){
$("#loginBtn").click(function(){
	var userId = $("#userId").val();
	var userPwd = $("#userPwd").val();
	
	var loginParam = {"userId":userId,"userPwd":userPwd};
	
		
	axios.request({ //some options 
		method : 'GET',
		url : (accessInfo.urls+accessInfo.getlogin),
		headers : {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'},
		params : loginParam
	}).then(response=>{ 
		const {data: responseBody, status: responseCode}= response; 
		
		if(response.data.error.checker){
			alert("Check your ID/Password");
		}else{
			console.log(response.data);
			
			
			var userInfo = response.data.userInfo;
			
			
			
			userInfo["userPwd"] = userPwd;
			
			$("#lastLoginVal").text("Last Login : "+userInfo.lastLogin.replace(".0","")+" UTC");
			
			var areaInfo = response.data.data.areaInfo;
			$("select#areaSelector option").remove();
			
			localStorage["accessAreaInfo"] = JSON.stringify(response.data);
			
			for(var area of areaInfo){
			
				var option = $("<option value='"+area.areaId+"' class='h6 text-gray-900 mb-4'>"+area.areaName+"</option>");
				
				$("#areaSelector").append(option);
				
			}
			
			
			$("#accessAreaModal").show();
			//alert("Last login : "+userInfo.lastLogin);
			localStorage["userInfo"] = JSON.stringify(userInfo);
			
			
			
			//console.log(localStorage["userInfo"]);
			
			
			
		};
		
	}).catch(e=>{ //then에서 예외가 발생했거나, response code가 400 이상인 경우(실패) 이쪽으로 넘어온다 
		console.error(e); 
		alert(e);
		alert("Connection is not smooth.");
		
	});
	
});



		
	