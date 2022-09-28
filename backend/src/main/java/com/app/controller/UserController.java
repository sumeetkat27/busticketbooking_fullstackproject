package com.app.controller;

import java.io.IOException;
import java.util.Collection;
import java.util.Random;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.AuthResp;
import com.app.dto.LoginDTO;
import com.app.dto.OTPVerifyUpdatePassword;
import com.app.dto.UpdateInfoDTO;
import com.app.dto.UserDTO;
import com.app.entities.Role;
import com.app.entities.User;
import com.app.jwt_utils.JwtUtils;
import com.app.service.CustomSecurityUserDetails;
import com.app.service.IUserService;

import io.swagger.v3.oas.models.responses.ApiResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	@Autowired
	private IUserService userService;

	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	private AuthenticationManager manager;
	@Autowired
	private JwtUtils utils;

	private Collection<? extends GrantedAuthority> authorities;

//	@GetMapping("/add")
//	public ResponseEntity<?> showRegisterForm() {
//		return new ResponseEntity<>("Login Form Has been Displayed", HttpStatus.OK);
//	}

	@PostMapping("/add")
	public ResponseEntity<?> addUserDetails(@RequestBody @Valid UserDTO userdto, BindingResult br) {
		StringBuilder text = new StringBuilder();
		SimpleMailMessage mail = new SimpleMailMessage();

		UserDTO addedUser = userService.addUser(userdto);
		mail.setTo(addedUser.getEmail());
		mail.setSubject("Registration Mail");
		text.append("Hello " + addedUser.getFirstName() + " " + addedUser.getLastName()+" !!!");
		text.append("\nYour account has been created successfully!!!\nYou can use " + addedUser.getEmail()
				+ " this email to login\nHappy Traveling!!!");
		String msg = text.toString();
		mail.setText(msg);
		mailSender.send(mail);
		return new ResponseEntity<>(addedUser, HttpStatus.ACCEPTED);
	}

	@PutMapping("/editprofile")
	public ResponseEntity<?> updateUserDetails(@RequestBody @Valid UpdateInfoDTO userDto) {
		return new ResponseEntity<>(userService.updateUser(userDto), HttpStatus.CREATED);
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody @Valid LoginDTO request) {
		log.info(request.getEmail());
		log.info(request.getPassword());

		// Store incoming user details(not yet validated) into Authentication object
		// Authentication i/f ---> implemented by UserNamePasswordAuthToken
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(request.getEmail(),
				request.getPassword());
		log.info("auth token " + authToken);
		try {
			// authenticate the credentials
			Authentication authenticatedDetails = manager.authenticate(authToken);
			log.info("auth token again " + authenticatedDetails);
			User user = ((CustomSecurityUserDetails) authenticatedDetails.getPrincipal()).getUserDetails();
			Role userRole = ((CustomSecurityUserDetails) authenticatedDetails.getPrincipal()).getRole();
			// => auth succcess
			return ResponseEntity
					.ok(new AuthResp("Auth successful!", utils.generateJwtToken(authenticatedDetails), userRole, user));
		} catch (BadCredentialsException e) { // lab work : replace this by a method in global exc handler
			// send back err resp code
			System.out.println("err " + e);
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
		}

	}

	@GetMapping(value = "{userId}/image", produces = { MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_GIF_VALUE,
			MediaType.IMAGE_PNG_VALUE })
	public ResponseEntity<?> getImage(@PathVariable int userId) throws IOException {

		return ResponseEntity.ok(userService.restoreImage(userId));
	}

	@PostMapping(value = "{userId}/image", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<?> uploadImage(@PathVariable int userId, @RequestBody MultipartFile imgFile)
			throws IOException {
		try {
			return ResponseEntity.ok(userService.saveImage(userId, imgFile));
		} catch (RuntimeException e) {
			return new ResponseEntity<>(new ApiResponse(), HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/check")
	public ResponseEntity<?> checkUserExists(@RequestBody @Valid LoginDTO email) {
		return new ResponseEntity<>(userService.checkUser(email.getEmail()), HttpStatus.OK);
	}

	@PostMapping("/send_otp")
	public ResponseEntity<?> SendOTP(@RequestBody OTPVerifyUpdatePassword update) {
		String destEmail = update.getDestEmail();
		System.out.println("-----------sending otp-----------");
		System.out.println(" Email " + destEmail);
		SimpleMailMessage mesg = new SimpleMailMessage();
		mesg.setTo(destEmail);
		mesg.setSubject("OTP for verification");
		Random ramdom = new Random();
		int otp = ramdom.nextInt(999999);
		mesg.setText("Enter this OTP for verification : " + otp + "\nDo not share it with anyone !!!!!");
		mailSender.send(mesg);
		return ResponseEntity.status(HttpStatus.OK).body(otp);
	}

	@PostMapping("/changepass")
	public ResponseEntity<?> changePassword(@RequestBody UserDTO userDto) {
		if (userService.updatePass(userDto)) {
			String destEmail = userDto.getEmail();
			SimpleMailMessage msg = new SimpleMailMessage();
			msg.setTo(destEmail);
			msg.setSubject("Password Changed Successfully!!");
			msg.setText(
					"Hi You have successfully changed your password , now you can use new password to access the website \n"
							+ "\n If this is not done by you Please reply us or send email on royaltravelsbookings@gmail.com immediately.\n\n Happy Journey, Keep Traveling");
			mailSender.send(msg);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
	}
}
