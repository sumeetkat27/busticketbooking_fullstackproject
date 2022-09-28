package com.app.dto;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor

public class RouteDTO {

	private Integer id;
	@Length(max = 50, message = "Cannot Be more than 50 letters")
	private String src;
	@Length(max = 50, message = "Cannot Be more than 50 letters")
	private String dest;
	private int pricePerKm;

}
