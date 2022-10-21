package config.spring;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import config.custom.GC;
import config.custom.GF;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
public class UriViewConfig implements HandlerInterceptor {
	
	@Autowired
	ResourceLoader resourceLoader;

	@Value("${server.error.path}") // application.yml 파일에 반드시 정의할것
	private String 에러경로;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		String 리다이렉트URI_YN = "N";
		
		// 요청URI 설정
		String 요청URI = GF.getString(request.getRequestURI()); // /css/index.css
		if (요청URI.startsWith("/") == false) {
			요청URI = "/"+요청URI;
		}
		
		// 도메인 설정
		String 도메인 = GF.getString(request.getServerName()); // localhost
		log.trace("변경前 요청URI : {}", 요청URI);
		if (도메인.equals("localhost")) {
			도메인 = GC.기본도메인;
		}
		if (도메인.equals(GC.개발테스트용_INPUT도메인)) {
			도메인 = GC.개발테스트용_OUTPUT도메인;
		}
		
		// URI가 도메인으로 시작되는지 체크
		String[] 요청URI배열 = 요청URI.split("/");
		String 요청URI앞단 = "";
		if (요청URI배열.length > 0) {
			요청URI앞단 = 요청URI배열[1];
		}
		if (요청URI앞단.equals(도메인) == false) { // URI 가 도메인으로 시작되지 않는다면
			// 파라미터 설정
			String 파라미터 = GF.getString(request.getQueryString()); // v=1.02&b=xx
			if (파라미터.equals("") == false) {
				요청URI += "?"+파라미터;
			}
			요청URI = "/"+도메인+요청URI; // 도메인/요청URI 로 리다이렉트
			log.trace("변경後 리다이렉트 요청URI : {}", 요청URI);
			
			request.getRequestDispatcher(요청URI).forward(request, response);
			리다이렉트URI_YN = "Y";
		}
		
		return !리다이렉트URI_YN.equals("Y");
	}
	
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
		if (modelAndView != null) {
			String 뷰네임 = GF.getString(modelAndView.getViewName()); // /login
			if (뷰네임.startsWith("/") == false) {
				뷰네임 = "/"+뷰네임;
			}
			log.trace("변경前 뷰네임 : {}", 뷰네임);
			
			// 도메인 설정
			String 도메인 = GF.getString(request.getServerName()); // localhost
			if (도메인.equals("localhost")) {
				도메인 = GC.기본도메인;
			}
			if (도메인.equals(GC.개발테스트용_INPUT도메인)) {
				도메인 = GC.개발테스트용_OUTPUT도메인;
			}
			
			// 뷰네임이 도메인으로 시작하지 않는다면
			String[] 뷰네임배열 = 뷰네임.split("/");
			String 뷰네임앞단 = "";
			if (뷰네임배열.length > 0) {
				뷰네임앞단 = 뷰네임배열[1];
			}
			if (뷰네임앞단.equals(도메인) == false) {
				// 도메인 / 뷰네임 으로 뷰네임 변경 (멀티 도메인 폴더 구조를 유지하기 위해)
				뷰네임 = "/"+도메인+뷰네임;
				log.trace("변경後 수정된 뷰네임 : {}", 뷰네임);
				
				modelAndView.setViewName(뷰네임);
			}
			
		} else { // api 호출 및 리소스 파일의 경우 view 가 없을 수 있음
			log.trace("{}", "modelAndView 없음");
		}
	}
	
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
		//if (ex != null) { log.error("{}", ex.toString()); }
	}
}
