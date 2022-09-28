package com.app.dto;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;

import com.app.entities.AcType;
import com.app.entities.BusType;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor

public class BusDTO {

	@Digits(integer = 10, fraction = 0)
	private int busNo;
	@Length(max = 50)
	@NotBlank
	private String busName;
	private int seatCapacity;
	@Enumerated(EnumType.STRING)
	private BusType type;
	@Enumerated(EnumType.STRING)
	private AcType acType;

}
