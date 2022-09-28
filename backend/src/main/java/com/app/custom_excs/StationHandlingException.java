package com.app.custom_excs;

public class StationHandlingException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public StationHandlingException(String errorMessage) {
		System.out.println(errorMessage);
	}
}
