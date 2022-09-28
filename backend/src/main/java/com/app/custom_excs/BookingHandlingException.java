package com.app.custom_excs;

public class BookingHandlingException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public BookingHandlingException(String errMesg) {
		super(errMesg);
	}
}
