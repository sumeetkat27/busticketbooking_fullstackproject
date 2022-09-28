package com.app.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString

public class LoginDTO {

//	@Pattern(regexp = "(?=.*[a-z])"+"(?=\\\\S+$)"+"[a-z0-9]+.*[@]+.*.[a-z]", message = "Invalid Email!")
	private String email;
//	@Pattern(regexp = "^(?=.*[0-9])" + "(?=.*[a-z])(?=.*[A-Z])" + "(?=.*[@#$%^&+=])"
//			+ "(?=\\S+$).{8,20}$", message = "Invalid Password!") 
	//commented just for testing, uncomment while deploying
	private String password;

}