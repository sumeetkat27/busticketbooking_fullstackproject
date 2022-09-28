package com.app.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.app.dto.BookingDTO;
import com.app.dto.BookingListDTO;
import com.app.entities.Booking;
import com.app.entities.Schedule;
import com.app.entities.User;
import com.app.respository.IBookingRepo;
import com.app.respository.IScheduleRepo;
import com.app.respository.IUserRepo;

import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class BookingServiceImpl implements IBookingService {

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private IScheduleRepo scheduleRepo;

	@Autowired
	private IUserRepo userRepo;

	@Autowired
	private IBookingRepo bookingRepo;

	@Override
	public List<Booking> bookTicket(BookingDTO bookDto) {
		log.info(bookDto.toString());
		Schedule schedule = scheduleRepo.findById(bookDto.getScheduleId().getId())
				.orElseThrow(() -> new RuntimeException("You Have Selected Wrong Schedule"));
		User persistUser = userRepo.findById(bookDto.getUserId().getId())
				.orElseThrow(() -> new RuntimeException("You are not valid user"));
		List<Booking> bookingList = new ArrayList<>();
		for (int i = 0; i < bookDto.getSeatNo().size(); i++) {
			Booking book = mapper.map(bookDto, Booking.class);
			book.setSeatNum(bookDto.getSeatNo().get(i));
			book.setScheduleId(schedule);
			book.setUserId(persistUser);
			book.setPrice(bookDto.getPrice()/(bookDto.getSeatNo().size()));
			book.setFullName(bookDto.getNameList().get(bookDto.getSeatNo().get(i)));
			book.setStatus("BOOKED");
			bookingList.add(book);
			
		}
		List<Booking> persistBookings = bookingRepo.saveAll(bookingList);
		

		return persistBookings;
	}

	@Override
	public List<Booking> getAllBookings(int pageNo) {
		int pageSize=20;
		String property="id";
		
		Pageable request=PageRequest.of(pageNo,pageSize,Direction.DESC,property);
		Page<Booking> bookingsList=bookingRepo.findAll(request);
		return bookingsList.getContent();
	}
	
	

	@Override
	public List<Integer> getBookedSeats(int bookedSeatList) {
		
		List<Booking> seatList = bookingRepo.findByScheduleId(scheduleRepo.findById(bookedSeatList).orElse(null));
		return seatList.stream().map(x -> x.getSeatNum()).collect(Collectors.toList());
	}

	@Override
	public List<Booking> getBookingsList(BookingListDTO bookingDto) {
		User user = userRepo.findById(bookingDto.getId())
				.orElseThrow(() -> new RuntimeException("Sorry You are not user"));
		int pageSize = 5;
		String property = "id";
		Pageable request = PageRequest.of(bookingDto.getPageNo(), pageSize, Direction.DESC, property);
		Page<Booking> page = bookingRepo.findByUserId(user, request);
		return page.getContent();
	}

	@Override
	public List<Booking> findByDateAndId(BookingListDTO criteria) {
		
		if(criteria.getId()!=null&& criteria.getId()>0) {	
		return Arrays.asList( bookingRepo.findById(criteria.getId()).orElseThrow(() -> new RuntimeException("Cannot Find Id")));
		}
		System.out.println("getting list by date");
		System.out.println(bookingRepo.findByDate(criteria.getFromDate(),criteria.getToDate()));
		return bookingRepo.findByDate(criteria.getFromDate(),criteria.getToDate());
	}

	@Override
	public String cancelBooking(int id) {
		System.out.println(id);
		Booking booking=bookingRepo.findById(id).orElseThrow(() -> new RuntimeException("Invalid Id, No Booking Found"));
		booking.setStatus("CANCELED");
		bookingRepo.save(booking);
		System.out.println(id);
		return "CANCELED";
	}

}
