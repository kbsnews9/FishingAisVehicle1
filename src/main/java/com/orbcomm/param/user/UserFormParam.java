package com.orbcomm.param.user;

import java.util.Map;

import com.orbcomm.param.ErrorParam;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserFormParam {
	
	private UserParam userInfo;
	private ErrorParam error;

}
