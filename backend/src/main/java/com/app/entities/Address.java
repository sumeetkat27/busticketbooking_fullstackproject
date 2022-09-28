package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
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
public class Address extends BaseEntity{

	@Column(length = 30)
	private String city;
	@Column(length = 30)
	private String state;
	@Column(length = 6)
	private int zip;
	@OneToOne
	@JoinColumn(name = "user_id",nullable = false)
	@MapsId
	private User user;

}
