package com.app.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

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

@Entity
@Table(name = "bookings",uniqueConstraints = @UniqueConstraint(columnNames = { "seatNum","schedule_id" }))
public class Booking extends BaseEntity {

	@ManyToOne
	@JoinColumn(name = "schedule_id")
	private Schedule scheduleId;
	@Column(length = 80)
	private String onBoard;
	@Column(length = 80)
	private String offBoard;
	private String fullName;
	private int seatNum;
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User userId;
	private String status;
	private int price;
	private String txnId;
}
