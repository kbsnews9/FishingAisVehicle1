package com.orbcomm.param;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@Configuration
@Service
public class ApiInfoParam {

	
	
	@Value("${fishing.urls}")
	private String urls;
	@Value("${fishing.getlogin}")
	private String getlogin;
	@Value("${fishing.getCurrent}")
	private String getCurrent;
	@Value("${fishing.getHistory}")
	private String getHistory;
	@Value("${fishing.getWeatherPoint}")
	private String getWeatherPoint;
	@Value("${fishing.getWeatherTile}")
	private String getWeatherTile;
	
	
}
