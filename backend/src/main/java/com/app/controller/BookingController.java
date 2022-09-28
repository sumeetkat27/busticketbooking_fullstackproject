package com.app.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.BookedSeatListDTO;
import com.app.dto.BookingDTO;
import com.app.dto.BookingListDTO;
import com.app.entities.Booking;
import com.app.service.IBookingService;
import com.app.service.IScheduleService;

@RestController
@RequestMapping("/book")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {
	
	@Autowired
	private JavaMailSender mailSender;
	
	@Autowired
	private IBookingService bookingService;
	
	@Value("${text1}")
	private String text1;
	
	@Value("${text2}")
	private String text2;
	
	@PostMapping
	public ResponseEntity<?> bookUserTicket(@RequestBody @Valid BookingDTO bookingDto){
		System.out.println(bookingDto);
		List<Booking> bookedTicketsList=bookingService.bookTicket(bookingDto);
		SimpleMailMessage mail=new SimpleMailMessage();
		StringBuilder text = new StringBuilder();
		mail.setTo(bookedTicketsList.get(0).getUserId().getEmail());
		mail.setSubject("Ticket Booked");
		text.append("Hello " + bookedTicketsList.get(0).getUserId().getFirstName() + " " + bookedTicketsList.get(0).getUserId().getLastName()+" !!!");
		text.append("\n\nYou have booked tickets for \n\n");
		
		for(Booking b:bookedTicketsList) {
			text.append(" 		Passenger: "+b.getFullName() +"    Seat No: "+b.getSeatNum()+ "\n" );
		}
		text.append("\nBoarding Point : "+bookingDto.getOnBoard()+ " \nDropping Point : "+bookingDto.getOffBoard());
		text.append("\nBus Details : "+bookingDto.getScheduleId().getBusId().getBusNo()+"  "+bookingDto.getScheduleId().getBusId().getBusName());
		text.append("\nDate of Journey : "+bookingDto.getScheduleId().getStartDate());
		text.append("\nTotal Price is : ₹ "+bookingDto.getPrice());
		text.append("\n\nCongratulations, You have successfuly booked your ticket!! We are happy to serve you!!!\nPlease share your feedback on our website : http://localhost:3000/#/contactUs");
		text.append("\nHappy Journey !!!");
		String msg = text.toString();
		mail.setText(msg);
		mailSender.send(mail);
		return new ResponseEntity<>(bookedTicketsList,HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/mybookings")
	public ResponseEntity<?> getBookings(@RequestBody @Valid BookingListDTO bookingListDto ){
		return new ResponseEntity<>(bookingService.getBookingsList(bookingListDto),HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/get/{pageNo}")
	public ResponseEntity<?> getAllTickets(@PathVariable int pageNo){
		return new ResponseEntity<>(bookingService.getAllBookings(pageNo),HttpStatus.OK);
		// return ResponseEntity.ok(bookingService.getAllBookings());
	}
	
	@PostMapping("/getbookedseats")
	public ResponseEntity<?> getBookedSeatList(@RequestBody @Valid BookedSeatListDTO bookedSeatList){
		System.out.println(bookedSeatList);
		 return new ResponseEntity<>(bookingService.getBookedSeats(bookedSeatList.getId()),HttpStatus.OK);
	}
	
	@PostMapping("/search")
	public ResponseEntity<?> getBookingsDetailsByDate(@RequestBody @Valid BookingListDTO criteria){
		System.out.println(criteria);
		return ResponseEntity.ok(bookingService.findByDateAndId(criteria));
	}
	
	@PutMapping("/cancel/{id}")
	public ResponseEntity<?> cancelBookedSeat(@PathVariable int id){
		return ResponseEntity.ok(bookingService.cancelBooking(id));
	}
	
	
}