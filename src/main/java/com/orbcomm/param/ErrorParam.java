package com.orbcomm.param;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ErrorParam {
	
	private boolean checker;
	private String errorId;
	private String errorDesc;

}
