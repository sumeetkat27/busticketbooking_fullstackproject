package com.app.service;

import java.util.Arrays;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.app.entities.Role;
import com.app.entities.User;

@SuppressWarnings("serial")
public class CustomSecurityUserDetails implements UserDetails {
	private User authUserDetails;

	public CustomSecurityUserDetails(User authUserDetails) {
		super();
		this.authUserDetails = authUserDetails;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		//Map   role   -----> Collection : GrantedAuthority <----SimpleGrantedAuthority(String authority)		
		return Arrays.asList(new SimpleGrantedAuthority(authUserDetails.getRole().name()));
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return authUserDetails.getPassword();
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return authUserDetails.getEmail();
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
	
	public Role getRole() {
		return authUserDetails.getRole();
	}
	
	public User getUserDetails() {
		return authUserDetails;
	}
	
	}
