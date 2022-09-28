package com.app.dto;

import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@AllArgsConstructor


public class HaultDTO {
	
	private Integer id;
	@Length(max = 80, message = "Cannot be more than 80 chars")
	@NotBlank
	private String station;

	private int routeId;
	private int distance;

}
