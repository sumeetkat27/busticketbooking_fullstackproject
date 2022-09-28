package com.app.custom_excs;

public class BusHandlingException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public BusHandlingException(String errMesg) {
		super(errMesg);
	}
}
