package com.app.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import javax.validation.constraints.NotBlank;

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

public class ScheduleDTO {
	
	//to get bus list
	private Integer id;
	private String source;
	private String destination;
	private LocalDate date;
	
	//this is to add schedule
	@NotBlank
	private int busNo;
	private int routeId;
	private LocalTime startTime;
	private LocalDate startDate;
	private String status;
	
	//pagination
	private int pageNo;

}
