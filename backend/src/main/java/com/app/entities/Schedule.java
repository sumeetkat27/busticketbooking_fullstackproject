package com.app.entities;

import java.time.LocalDate;
import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor

@Entity
@Table(name = "schedules")
public class Schedule extends BaseEntity {

	@ManyToOne
	@JoinColumn(name = "bus_id")
	private Bus busId;
	private LocalTime startTime;
	private LocalDate startDate;
	@ManyToOne
	@JoinColumn(name = "route_id")
	private Route routeId;
	private String status;
}
