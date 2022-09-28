package com.app.dto;

import java.time.LocalDate;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import com.app.entities.AuthStatus;
import com.app.entities.Role;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString

public class UserDTO {
	
	private int id;
	@NotBlank(message = "Name can not be empty")
	private String firstName;
	@NotBlank(message = "Name can not be empty")
	private String lastName;
	@NotBlank(message = "Email is required")
	@Length(min = 4, max = 40, message = "Invalid Email length")
	@Email(message = "Invalid email format")
	@Pattern(regexp = "[a-z0-9]+.*[@]+.*.[a-z]", message = "Invalid Email!")
	private String email;
	private AuthStatus authStatus;
	// @Pattern(regexp="((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})",message =
	// "Invalid password!")
	@JsonProperty(access = Access.WRITE_ONLY)
	private String password;
//	@Pattern(regexp = "/^([+]\\d{2})?\\d{10}$/\r\n", message = "Invalid mobile number")
	private String mobile;
	private char gender;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate dob;
	@Enumerated(EnumType.STRING)
	private Role role;
	private int zip;
	private String city;
	private String state;

}
