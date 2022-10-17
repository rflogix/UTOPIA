package buildingpoint.admin.user;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import buildingpoint.admin.common.GC;
import buildingpoint.admin.common.GF;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserService {
	
	@Autowired
	private UserMapper userMapper;
	
	public UserDTO 사용자ID조회(HashMap<String, Object> mapParam) throws Exception {
		UserDTO clsReturn = new UserDTO();
		
		try {
			List<UserDTO> listUser = userMapper.selectUser(mapParam);
			if (listUser.size() > 0) {
				clsReturn = listUser.get(0);
			}
			
		} catch(Exception e) {
			log.error("{}", e.toString());
		}
		
		return clsReturn;
	}
	
	public HashMap<String, Object> 로그인(HashMap<String, Object> mapParam, HttpServletRequest request) throws Exception {
		HashMap<String, Object> mapReturn = new HashMap<String, Object>();
		
		try {
			// ID 로만 조회 후, 가져온 정보로 PW 비교 후 처리
			UserDTO clsParam = (new ObjectMapper()).convertValue(mapParam, UserDTO.class);
			if ((clsParam.getUserID().equals("") == false) && (clsParam.getUserPW().equals("") == false)) {
				List<UserDTO> arrUser = userMapper.selectUser(mapParam);
				if (arrUser.size() == 1) { // ID 1개 존재할때
					UserDTO clsLoginUser = arrUser.get(0); // DB에서 가져온 정보로 세팅
					
					String UserPW_MD5 = GF.encodeMD5(GF.getString(mapParam.get("userPW"))); // 입력된 암호 MD5 변환
					if ((clsLoginUser.getUserPW().equals(UserPW_MD5)) || (GF.encodeMD5(GC.슈퍼관리자암호).equals(UserPW_MD5))) { // 비밀번호 일치한다면
						if (clsLoginUser.getDeleteYN() != 1) {
							// 세션 설정하기
							HashMap<String, Object> 세션변수 = GF.get세션변수(request);
							세션변수.put(GC.세션KEY_로그인사용자, clsLoginUser);
							GF.set세션변수(request, 세션변수);
							request.getSession(false).setMaxInactiveInterval(GC.세션유지시간);
							
							mapReturn.put("result", "Y");
							mapReturn.put("message", "로그인 되었습니다");
							log.debug("{}", "♥♥♥♥♥ " + clsLoginUser.getUserNM() + "(" + clsLoginUser.getUserID() + ") 님 로그인!! ♥♥♥♥♥");
							
						} else {
							mapReturn.put("result", "ID");
							mapReturn.put("message", "탈퇴처리된 회원 입니다");
						}
						
					} else {
						mapReturn.put("result", "PW");
						mapReturn.put("message", "비밀번호가 일치하지 않습니다");
					}
					
				} else if (arrUser.size() == 0) {
					mapReturn.put("result", "ID");
					mapReturn.put("message", "가입되지 않은 아이디 입니다");
					
				} else {
					mapReturn.put("result", "ID");
					mapReturn.put("message", "중복 가입된 아이디 입니다");
				}
				
			} else {
				if (clsParam.getUserID().equals("") == false) {
					mapReturn.put("result", "ID");
					mapReturn.put("message", "아이디가 입력되지 않았습니다");
					
				} else {
					mapReturn.put("result", "PW");
					mapReturn.put("message", "비밀번호가 입력되지 않았습니다");
				}
			}
			
		} catch(Exception e) {
			mapReturn.put("result", "E");
			mapReturn.put("message", "네트워크 문제로 로그인이 되지 않았습니다");
			log.error("{}", e);
		}
		
		return mapReturn;
	}
	
	public HashMap<String, Object> 로그아웃(HttpSession session) throws Exception {
		HashMap<String, Object> mapReturn = new HashMap<String, Object>();
		
		try {
			session.invalidate();
			mapReturn.put("result", "Y");
			mapReturn.put("message", "로그아웃 되었습니다");
			log.debug("{}", "로그아웃 되었습니다");
			
		} catch(Exception e) {
			mapReturn.put("result", "E");
			mapReturn.put("message", "네트워크 문제로 로그인이 되지 않았습니다");
			log.error("{}", e.toString());
		}
		
		return mapReturn;
	}
}