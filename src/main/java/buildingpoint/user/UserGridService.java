package buildingpoint.user;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserGridService {
	
	@Autowired
	private UserGridMapper userGridMapper;
	
	public ArrayList<UserDTO> searchUserList(HashMap<String, Object> mapParam) throws Exception {
		ArrayList<UserDTO> arrReturn = new ArrayList<UserDTO>();
		try {
			ArrayList<UserDTO> listUser = userGridMapper.searchUserList(mapParam);
			arrReturn = listUser;
		} catch(Exception e) {
			log.error("{}", e.toString());
		}
		return arrReturn;
	}

	public int searchUserTotalCount(HashMap<String, Object> mapParam, HttpServletRequest request) throws Exception {
		int userTotalCount = 0;
		try {
			userTotalCount = userGridMapper.searchUserTotalCount(mapParam);
		} catch(Exception e) {
			log.error("{}", e.toString());
		}
		return userTotalCount;
	}

	public int createUserList(HashMap<String, Object> mapParam, HttpServletRequest request) throws Exception {
		int result = 0;
		try {
			result = userGridMapper.createUserList(mapParam);
		} catch(Exception e) {
			log.error("{}", e.toString());
		}
		return result;
	}

	public int updateUserList(HashMap<String, Object> mapParam, HttpServletRequest request) throws Exception {
		int result = 0;
		try {
			result = userGridMapper.updateUserList(mapParam);
		} catch(Exception e) {
			log.error("{}", e.toString());
		}
		return result;
	}
}