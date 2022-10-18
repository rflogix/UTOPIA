package siaa.common;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siaa.user.UserDTO;
import siaa.user.UserService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class DomainService {
	
	@Autowired
	private UserService userService;
	
	public HashMap<String, Object> 세션설정(HttpServletRequest request) {
		HashMap<String, Object> 세션변수;
		
		try {
			세션변수 = GF.get세션변수(request); // 세션변수 조회
			
			// 페이지 설정
			String 현재URL = request.getServletPath().substring(1); // 현재 페이지
			if (request.getQueryString() != null) {
				현재URL += "?" + request.getQueryString();
			}
			세션변수.put("현재URL", 현재URL);
			
			String 이전URL = GF.getString(세션변수.get("현재URL")); // 이전 URL
			세션변수.put("이전URL", 이전URL);
			
			// 사용자 설정
			UserDTO clsLoginUser = new UserDTO();
			if (세션변수.get(GC.세션KEY_로그인사용자) != null) {
				clsLoginUser = (UserDTO)세션변수.get(GC.세션KEY_로그인사용자);
			}
			long UserCD = clsLoginUser.getUserCD();
			if (UserCD != 0) { // 가입한 유저라면 - 실시간으로 적용하기 위해 매번 세팅
				HashMap<String, Object> mapParam = new HashMap<String, Object>();
				mapParam.put("userCD", UserCD);
				clsLoginUser = userService.사용자ID조회(mapParam);
			}
			세션변수.put(GC.세션KEY_로그인사용자, clsLoginUser);
			
			// 세션변수 설정
			GF.set세션변수(request, 세션변수);
			
		} catch(Exception e) {
			세션변수 = new HashMap<String, Object>();
			log.error("{}", e.toString());
		}
		
		return 세션변수;
	}
	
	public String 페이지이동(HttpServletRequest request, String 페이지URL) {
		try {
			페이지URL = GF.getString(페이지URL);
			if ((페이지URL.equals("")) || (페이지URL.equals("/"))) {
				페이지URL = "/index";
			}
			
			// 도메인별로 로그인 여부 체크
			if (GF.get서브도메인(request).equals("admin")) {
				if (GF.로그인여부(request) == false) { // 로그인 여부 체크
					페이지URL = "/login";
				}
			}
			
		} catch(Exception e) {
			log.error("{}", e.toString());
		}
		
		return 페이지URL;
	}
}
