package com.app.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class OTPVerifyUpdatePassword {
	private String destEmail;
	private int otp;
	private String newPass;

}
