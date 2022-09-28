package com.app.custom_excs;

//all user related exceptions are handled here

public class UserHandlingException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public UserHandlingException(String errMessage) {
		super(errMessage);
	}
}