package com.orbcomm.param.user;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserParam {
	
	private String userId;
	@JsonInclude(JsonInclude.Include.NON_NULL)
	private String userPwd;
	@JsonInclude(JsonInclude.Include.NON_NULL)
	private String lastLogin;
	private String authKey;
	
	

}
