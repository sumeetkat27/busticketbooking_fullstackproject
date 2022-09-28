package com.app.service;

import java.io.IOException;

import javax.validation.Valid;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.LoginDTO;
import com.app.dto.UpdateInfoDTO;
import com.app.dto.UserDTO;
import com.app.entities.User;

public interface IUserService {

	UserDTO addUser(UserDTO userdto);

	User validateUser(LoginDTO loginDto);

	byte[] restoreImage(int patId) throws IOException;

	String saveImage(int userId, MultipartFile imgFile) throws IOException;

	User updateUser(UpdateInfoDTO userDto);

	String checkUser( String email);

	boolean updatePass(UserDTO userDto);
}
