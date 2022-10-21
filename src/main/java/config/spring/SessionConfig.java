package config.spring;

import java.lang.reflect.Method;
import java.util.HashMap;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import config.custom.GC;
import config.custom.GF;

@Configuration
public class SessionConfig implements HttpSessionListener {

	@Value("${server.servlet.session.timeout}") // application.yml
	private String 세션만료시간;
	
	// 세션 생성시 세션만료시간 설정 (따로 WAS 돌릴때만 필요)
	public void sessionCreated(HttpSessionEvent se) {
		// application.yml 의 세션만료시간이 최우선이며, 설정이 안되었다면 GC 의 세션만료시간으로 세팅한다
		int 만료시간 = GC.세션만료시간;
		try {
			if (GF.getString(세션만료시간).equals("") == false) {
				if (세션만료시간.indexOf("m") > -1) {
					만료시간 = Integer.parseInt(세션만료시간.replace("m", "")) * 60;
					
				} else if (세션만료시간.indexOf("s") > -1) {
					만료시간 = Integer.parseInt(세션만료시간.replace("s", ""));
					
				} else {
					만료시간 = Integer.parseInt(세션만료시간);
				}
			}
		
		} catch (Exception e) {}
		
		se.getSession().setMaxInactiveInterval(만료시간);
	}
	
	// 세션 종료시 로그아웃 처리
	public void sessionDestroyed(HttpSessionEvent se) {
		HttpSession session = se.getSession();
		try {
			HashMap<String, Object> 세션변수 = GF.get세션변수(session);
			if (GF.getString(세션변수.get(GC.세션KEY_셀프로그아웃)).equals("Y") == false) { // 셀프로그아웃이 아니라면
				// 로그인 되어 있는지 체크하여
				Object objUser_Login = 세션변수.get(GC.세션KEY_로그인사용자);
				if (objUser_Login != null) {
					Class<?> clsLoginUser = objUser_Login.getClass();
					Class<?> clsUserService = Class.forName(clsLoginUser.getName().replaceFirst(GC.로그아웃_클래스명, GC.로그아웃_서비스명));
					Object objUserService = clsUserService.getConstructor().newInstance();
					Method 클래스함수 = clsUserService.getMethod(GC.로그아웃_함수명, HttpSession.class);
					클래스함수.setAccessible(true);
					클래스함수.invoke(objUserService, session); // 사용자 로그아웃 함수 실행
				}
			}
			
		} catch(Exception e) {}
	}
}