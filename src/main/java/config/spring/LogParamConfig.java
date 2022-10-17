package config.spring;

import java.lang.reflect.Method;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;

import config.custom.GC;
import config.custom.GF;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
public class LogParamConfig implements HandlerInterceptor {
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		if (log.isDebugEnabled()) { // 로깅이 DEBUG 일때만 수행
			// 요청URI 에서 리소스경로(css, js, image 등) 체크
			String 요청URI = request.getRequestURI();
			boolean 리소스여부 = false;
			for (String 리소스경로 : GC.리소스경로) {
				if (요청URI.indexOf(리소스경로) > -1) {
					리소스여부 = true;
					break;
				}
			}
			if (리소스여부 == false) {
				HashMap<String, Object> map파라미터 = GF.get파라미터(request);
				if (map파라미터.isEmpty() == false) {
					StringBuffer 파라미터_로그 = new StringBuffer();
					파라미터_로그.append("\n========== 파라미터 ==========");
					
					// 아이피
					String 아이피 = GF.getString(request.getHeader("X-FORWARDED-FOR"));
					if (아이피.equals("") == true) {
						아이피 = request.getRemoteAddr();
					}
					파라미터_로그.append("\n아이피 : "+아이피);
					
					// 로그인 사용자 정보
					try {
						HashMap<String, Object> map로그인사용자 = new HashMap<String, Object>();
						map로그인사용자.put("userCD", 0L);
						HashMap<String, Object> 세션변수 = GF.get세션변수(request);
						if (세션변수.get(GC.세션KEY_로그인사용자) != null) {
							Object objUser_Login = 세션변수.get(GC.세션KEY_로그인사용자);
							Class<?> clsLoginUser = objUser_Login.getClass();
							Method 클래스함수 = clsLoginUser.getMethod("getUserCD");
							클래스함수.setAccessible(true);
							long userCD = (long)클래스함수.invoke(objUser_Login);
							if (userCD != 0) {
								map로그인사용자.put("userCD", userCD);
								
								클래스함수 = clsLoginUser.getMethod("getUserID");
								클래스함수.setAccessible(true);
								map로그인사용자.put("userID", 클래스함수.invoke(objUser_Login));
								
								클래스함수 = clsLoginUser.getMethod("getUserNM");
								클래스함수.setAccessible(true);
								map로그인사용자.put("userNM", 클래스함수.invoke(objUser_Login));
							}
						}
						if ((long)map로그인사용자.get("userCD") != 0) {
							파라미터_로그.append("\n로그인사용자 : "+map로그인사용자.get("userNM")+" ("+map로그인사용자.get("userID")+" / "+map로그인사용자.get("userCD")+")");
						}
					} catch(Exception e) {}
					
					// 비밀번호 로그 * 처리
					/*String arrPW[] = {"userPW", "PW", "password", "pass"};
					for (String key : arrPW) {
						if (GlobalFunction.getString(map.get(key)).equals("") == false) {
							map파라미터.put(key, "****");
						}
					}*/
					
					파라미터_로그.append("\n요청URI : "+request.getRequestURI());
					파라미터_로그.append("\n요청PARAM :\n"+GF.getJson(map파라미터));
					파라미터_로그.append("\n==============================");
					log.debug("{}", 파라미터_로그.toString());
				}
			}
		}
		
		return true;
	}
}