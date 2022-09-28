package com.app.config;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.app.filters.JWTRequestFilter;

@EnableWebSecurity // mandatory
@Configuration // mandatory
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig {

	@Autowired
	private JWTRequestFilter filter;

	// configure BCryptPassword encode bean
	@Bean
	public PasswordEncoder encoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		/*
		 * All end Points: Permit All- "/user/add",
		 * "/user/login","/user/send_otp","/user/changepass","/user/check",
		 * "/email/send_mail"
		 * 
		 * Permit to Customer and Manager
		 * "/user/{userId}/image","/user/editprofile","/route/getall",
		 * "/user/{userId}/image",""
		 * 
		 * Permit to Customer - "/hault/getsource","/hault/getdest/{srcHault}",
		 * 
		 * "/book/mybookings","/book/getbookedseats", "/book/cancel/{id}",
		 * "/schedule/get","/schedule/distance"
		 * 
		 *
		 * 
		 * Permit to Manager- "/schedule","/schedule/delete/{id}","/schedule/getfuture",
		 * "/route/add","/route/delete/{id}","/route/updateprice",
		 * "/bus/get/{busNo}","/bus/add","/bus/getall"
		 * "/book","/book/get/{pageNo}","/book/cancel/{id}","/book/search"
		 * 
		 * 
		 * 
		 */

		http.cors().and().csrf().disable().exceptionHandling().authenticationEntryPoint((request, response, ex) -> {
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, ex.getMessage());
		}).and().authorizeRequests()
				.antMatchers("/user/login", "/user/send_otp", "/user/changepass", "/user/check", "/user/add",
						"/email/**", "/swagger*/**", "/v*/api-docs/**")
				.permitAll()
				.antMatchers("/schedule", "/schedule/delete/{id}", "/schedule/getfuture", "/route/add",
						"/route/delete/{id}", "/route/updateprice", "/bus/get/{busNo}", "/bus/add", "/bus/getall",
						"/book/get/{pageNo}",  "/book/search", 
						"/user/editprofile", "/route/getall")
				.hasRole("MANAGER")
				.antMatchers("/hault/getsource", "/hault/getdest/{srcHault}", "/book/mybookings",
						"/book/getbookedseats", "/schedule/get", "/schedule/distance",
						 "/user/editprofile", "/book")
				.hasRole("CUSTOMER")
				.antMatchers("/user/editprofile","/user/{userId}/image","/book/cancel/{id}")
				.hasAnyRole("CUSTOMER","MANAGER")
				// enabling global
				// access to all
				// urls with
				// /auth
				// only required for JS clnts (react / angular)
				.antMatchers(HttpMethod.OPTIONS).permitAll().anyRequest().authenticated().and().sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
				.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	// configure auth mgr bean : to be used in Authentication REST controller
	@Bean
	public AuthenticationManager authenticatonMgr(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}

}
