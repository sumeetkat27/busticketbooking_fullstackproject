package com.app.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_excs.UserHandlingException;
import com.app.dto.LoginDTO;
import com.app.dto.UpdateInfoDTO;
import com.app.dto.UserDTO;
import com.app.entities.Address;
import com.app.entities.User;
import com.app.respository.IAddressRepo;
import com.app.respository.IUserRepo;

import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class UserServiceImpl implements IUserService {
	@Autowired
	private ModelMapper mapper;

	@Autowired
	private IUserRepo userRepo;

	@Autowired
	private IAddressRepo addrRepo;

	@Value("${file.upload.location}")
	private String folderLocation;

	@Autowired
	private PasswordEncoder passEncoder;

	@Override
	public UserDTO addUser(UserDTO userdto) {

		User user = mapper.map(userdto, User.class);
		Address addr = mapper.map(userdto, Address.class);
		if (userRepo.existsByEmail(user.getEmail())) {
			throw new UserHandlingException("Email Already Exist");
		}
		user.setPassword(passEncoder.encode(userdto.getPassword()));
		User persistUser = userRepo.save(user);
		addr.setUser(persistUser);
		addrRepo.save(addr);
		return mapper.map(persistUser, UserDTO.class);
	}

	@Override
	public User validateUser(LoginDTO loginDto) {
		if (!userRepo.existsByEmail(loginDto.getEmail())) {
			throw new UserHandlingException("Email is not registered");
		}
		User user = userRepo.findByEmailAndPassword(loginDto.getEmail(), passEncoder.encode(loginDto.getPassword()));
		if (user == null) {
			throw new UserHandlingException("Incorrect Password");
		}
		return user;

	}

	@Override
	public String saveImage(int userId, MultipartFile imgFile) throws IOException {
		log.info(folderLocation + " " + userId);
		User user = userRepo.findById(userId).orElseThrow();
		log.info(user.toString());
		String path = folderLocation + File.separator + "user" + userId + imgFile.getOriginalFilename();
		log.info("path " + path);
		user.setProfile(path);// update query upon commit
		// Copy uploaded multipart file to server side folder
		// java.nio.file.Files : copy(InputStream in , Path dest, CopyOptions.. ops)
		// Paths.get(String path) ---> Path
		userRepo.save(user);
		Files.copy(imgFile.getInputStream(), Paths.get(path), StandardCopyOption.REPLACE_EXISTING);

		return "file saved successfully";
	}

	@Override
	public byte[] restoreImage(int userId) throws IOException {
		// TODO Auto-generated method stub
		User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("No User Found With This ID"));
		String path = user.getProfile();
		System.out.println("Path: " + path);
		// java.nio.file.Files : public byte[] readAllBytes(Path path) throws IOExc
		if (path != null)
			return Files.readAllBytes(Paths.get(path));

		// => image is not yet assigned --throw exc to alert front end
		throw new RuntimeException("Image not  yet assigned , for user " + user.getFirstName());
	}

	@Override
	public User updateUser(UpdateInfoDTO userDto) {
		User persistUser = userRepo.findById(userDto.getId()).orElseThrow(() -> new RuntimeException("User Not Found"));
		Address persistAddress = addrRepo.findById(userDto.getId()).orElseThrow(() -> new RuntimeException("User Not Found"));
		persistUser.setFirstName(userDto.getFirstName());
		persistUser.setLastName(userDto.getLastName());
		persistUser.setDob(userDto.getDob());
		persistUser.setMobile(userDto.getMobile());
		persistAddress.setState(userDto.getState());
		persistAddress.setCity(userDto.getCity());
		
		return persistUser;
	}

	@Override
	public String checkUser(String email) {
		String msg = "NO";
		if (userRepo.existsByEmail(email)) {
			msg = "YES";
		}
		return msg;
	}

	@Override
	public boolean updatePass(UserDTO userDto) {
		if (userRepo.updatePasswordByEmail(userDto.getEmail(), passEncoder.encode(userDto.getPassword())) == 1)
			return true;
		return false;
	}

}
