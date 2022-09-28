package com.app.service;

import java.util.List;

import javax.validation.Valid;

import com.app.dto.BookingDTO;
import com.app.dto.BookingListDTO;
import com.app.entities.Booking;

public interface IBookingService {
	
	List<Booking> bookTicket(BookingDTO bookDto);

	List<Booking> getAllBookings(int pageNo);

	//List<Integer> getBookedSeats(BookedSeatListDTO bookedSeatList);
	
	

	List<?> getBookedSeats(int id);

	List<Booking> getBookingsList(BookingListDTO bookingListDto);

	List<Booking> findByDateAndId( BookingListDTO criteria);

	String cancelBooking(int id);
}
