package com.app;

import java.io.File;
import java.util.Properties;

import javax.annotation.PostConstruct;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class BusTicketBookingSystemApplication {
	
	@Value("${spring.mail.protocol}")
	private String protocol;
	
	@Value("${spring.mail.username}")
	private String userName;
	
	@Value("${spring.mail.password}")
	private String password;

	public static void main(String[] args) {
		SpringApplication.run(BusTicketBookingSystemApplication.class, args);
	}
	
	
	@Bean
    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);
        
        mailSender.setUsername(userName);
        mailSender.setPassword(password);
        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", protocol);
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");
        
        return mailSender;
    }

	// @Value implies to SPELL expression language -->"${file.upload.location}"
	@Value("${file.upload.location}")
	private String folderName;

	@Bean // equivalent to <bean> tag in xml file
	public ModelMapper mapper() {
		System.out.println("in mapper");
		return new ModelMapper();
	}

//	@Bean
//	public PasswordEncoder encoder()
//	{
//		return new BCryptPasswordEncoder();
//	}

	@PostConstruct
	public void anyInit() {
		// chk if folder exists -- if not create one
		// java.io.File--> repersents abstract path to a file/folder
		File folder = new File(folderName);
		if (!folder.exists()) {
			folder.mkdirs();
			System.out.println("folder created");

		} else
			System.out.println("folder exist already");
	}

}
