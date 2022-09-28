package com.app.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToOne;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString

@Entity
public class User extends BaseEntity {

	@Column(length = 40)
	private String firstName;
	@Column(length = 40)
	private String lastName;
	@Column(length = 50, unique = true)
	private String email;
	@Column(length = 800)
	private String password;
	@Column(length = 10)
	private String mobile;
	@Column(length = 15)
	@Enumerated(EnumType.STRING)
	private AuthStatus authStatus;
	@Enumerated(EnumType.STRING)
	private Role role;
	@Column(length = 1)
	private char gender;
	private LocalDate dob;
	private String profile;
	

}
