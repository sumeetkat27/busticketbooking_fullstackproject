package com.app.dto;

import java.util.List;
import java.util.Map;

import com.app.entities.Schedule;
import com.app.entities.User;

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

public class BookingDTO {

	private int bookingId;
	private Schedule scheduleId;
	private String onBoard;
	private String offBoard;
	private List<Integer> seatNo;
	private List<String> nameList;
	private User userId;
	private String status;
	private int price;
	private String txnId;

}