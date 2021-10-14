/**
 * 
 */
function accessAreaShow(data){
	
	
	var userInfo = data.userInfo;
	
	
	
	userInfo["userPwd"] = userPwd;
	
	$("#lastLoginVal").text("Last Login : "+userInfo.lastLogin.replace(".0","")+" UTC");
	
	var areaInfo = data.data.areaInfo;
	$("select#areaSelector option").remove();
	
	localStorage["accessAreaInfo"] = JSON.stringify(data);
	
	for(var area of areaInfo){
	
		var option = $("<option value='"+area.areaId+"' class='h6 text-gray-900 mb-4'>"+area.areaName+"</option>");
		
		$("#areaSelector").append(option);
		
	}
	
	
	$("#accessAreaModal").show();
	//alert("Last login : "+userInfo.lastLogin);
	localStorage["userInfo"] = JSON.stringify(userInfo);
}