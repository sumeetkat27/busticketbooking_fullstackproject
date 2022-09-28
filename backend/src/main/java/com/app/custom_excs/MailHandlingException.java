package com.app.custom_excs;

public class MailHandlingException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public MailHandlingException(String errMessage) {
		System.out.println(errMessage);
	}
}
