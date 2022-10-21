package config.spring;

import java.util.HashMap;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import config.custom.GC;

@Controller
public class ErrorConfig implements ErrorController {
	@Value("${server.error.path}") // application.yml
	private String 에러경로;
	
	@RequestMapping("/**${server.error.path}") // 에러경로
	public ModelAndView handleError(HttpServletResponse response) {
		HashMap<String, Object> model = new HashMap<String, Object>();
		model.put(GC.응답에러_에러코드, ""+response.getStatus());
		switch (response.getStatus()){
			case HttpServletResponse.SC_UNAUTHORIZED:
			case HttpServletResponse.SC_FORBIDDEN:
			case HttpServletResponse.SC_NOT_FOUND: // 404
				model.put(GC.응답에러_에러코드, "404");
				break;
			
			case HttpServletResponse.SC_INTERNAL_SERVER_ERROR: // 500
				model.put(GC.응답에러_에러코드, "500");
				break;
		}
		if (에러경로 == null) {
			에러경로 = GC.응답에러_뷰네임;
		}
		return new ModelAndView(에러경로, model);
	}
	
	@Override
	public String getErrorPath() {
		if (에러경로 == null) {
			에러경로 = GC.응답에러_뷰네임;
		}
		return 에러경로;
	}
}