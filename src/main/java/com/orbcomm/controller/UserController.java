package com.orbcomm.controller;


import java.io.FileNotFoundException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.maven.model.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.orbcomm.param.ApiInfoParam;
import com.orbcomm.param.user.UserFormParam;
import com.orbcomm.param.user.UserParam;
import com.orbcomm.util.ApiUtil;






@Controller
public class UserController {
	
	
	
	
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	private static final String DEFAULT_PARAM = "/login/";
	
	@Autowired
	ApiUtil apiUtil;
	
	@Autowired
	ApiInfoParam accessParam;
	
	

	@RequestMapping(value = "/")
	public String index(Model model) {
	
		model.addAttribute("accessInfo", accessParam);
		
		//Device devices = DeviceUtils.getCurrentDevice(request);
		
		//System.out.println("tttt");
		return "index";
	
	}
	
	@RequestMapping(value = "/main.do")
	public String home(Model model) {
	
		String mapKey = "https://maps.google.com/maps/api/js?client=gme-seavantage&region=KR;language=ko&libraries=drawing,places,visualization,geometry&callback=initMap";
		model.addAttribute("mapKey", mapKey);
		
			
		
		return "fragments/mainWeb";
	
	}
	
	
	@RequestMapping(value = "/popup.do")
	public String vhclePopup() {
	
		
		//Device devices = DeviceUtils.getCurrentDevice(request);
		
		
		return "fragments/VhclePopup";
	
	}
	
	@RequestMapping(value = "/eez/PW_675_NE_1.geojson")
	public String eez_PW_675_NE_1() {
	
		
		ClassPathResource resource = new ClassPathResource("data/PW_675_NE_1.geojson");
		try {
			Path path = Paths.get(resource.getURI());
		
			//System.out.println(path.getFileName());
			
			List<String> content = Files.readAllLines(path);
			
			String data = "";
			for(String i : content) {
				data = data+i;
			}

			
		
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		
		return "fragments/mainWeb";
	
	}
	
	
	/*
	@RequestMapping(value = DEFAULT_PARAM+"loginCheck.do")
	@ResponseBody
	public String loginCheck(HttpServletRequest request,HttpServletResponse response,@ModelAttribute("param") UserParam param) {
		
		UserFormParam userForm = new Gson().fromJson(apiUtil.loginCheck(param), UserFormParam.class);
		Map<String, Object> map = new HashMap<String, Object>();
		
		if(!userForm.getError().isChecker()) {
			map.put("status", true);
			map.put("lastLogin", userForm.getUserInfo().getLastLogin());
		}else {
			map.put("status", false);
			map.put("errorId", userForm.getError().getErrorId());
			
		}
		
		
		
		return new Gson().toJson(map).toString();
	}
	*/

}
