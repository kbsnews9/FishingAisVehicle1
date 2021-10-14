package com.orbcomm.util;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.orbcomm.param.ApiInfoParam;
import com.orbcomm.param.user.UserParam;

@Service
public class ApiUtil {
	
	@Autowired
	ApiInfoParam apiParam;
	
	private static final Logger logger = LoggerFactory.getLogger(ApiUtil.class);
	
	public String loginCheck(UserParam param) {
	
		String returnVal = null;
		
		try {
			
			URL url = null;
			
			String sendUrl = apiParam.getUrls()+apiParam.getGetlogin();
			sendUrl = sendUrl+"?userId="+param.getUserId();
			sendUrl = sendUrl+"&userPwd="+param.getUserPwd();
			
			//System.out.println(sendUrl);
			url = new URL(sendUrl);
			
			returnVal = restApiCon(url);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		
		return returnVal;
	}
	
	
	public String restApiCon(URL url) {
			
			String returnApi = null;
			
			try {
				
				HttpURLConnection conn = (HttpURLConnection) url.openConnection();
				
				conn.setConnectTimeout(5000);
				conn.setReadTimeout(5000);
				conn.setRequestMethod("GET");
				
				StringBuilder sb = new StringBuilder();
				
				if(conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
					BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));
					String line;
					while ((line = br.readLine()) != null) {
						sb.append(line).append("\n");
					}
					br.close();
					returnApi = sb.toString();
					logger.info("Response : "+returnApi);
					conn.disconnect();
				}
				
			} catch (Exception e) {
				e.printStackTrace();
			}
			return returnApi;
		}
	
	}
