package siaa.www.common;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import lombok.extern.slf4j.Slf4j;
import siaa.www.user.UserDTO;

@Slf4j
public class GF extends config.custom.GF {
	public static UserDTO 로그인사용자(HttpSession session) {
		UserDTO clsLoginUser;
		
		try {
			HashMap<String, Object> 세션변수 = GF.get세션변수(session); // 세션변수 조회
			Object objUser = 세션변수.get(GC.세션KEY_로그인사용자);
			if (objUser != null) {
				clsLoginUser = (UserDTO)objUser;
			} else {
				clsLoginUser = new UserDTO();
			}
			
		} catch(Exception e) {
			clsLoginUser = new UserDTO();
			log.error("{}", e.toString());
		}
		
		return clsLoginUser;
	}
	public static UserDTO 로그인사용자(HttpServletRequest request) {
		return 로그인사용자(request.getSession());
	}
	
	public static boolean 로그인여부(HttpSession session) {
		return 로그인사용자(session).getUserCD() != 0;
	}
	public static boolean 로그인여부(HttpServletRequest request) {
		return 로그인사용자(request.getSession()).getUserCD() != 0;
	}
}