package com.app.custom_excs;

//all booking related exceptions are handled here

public class RouteHandlingException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public RouteHandlingException(String errMessage) {
		super(errMessage);
	}
}
