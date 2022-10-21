package config.spring;

import java.io.File;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import config.custom.GC;

@Configuration
public class MvcConfig implements WebMvcConfigurer {
	@Value("${custom.domains}") // application.yml
	private String 도메인리스트;
	
	@Value("${spring.mvc.view.prefix}") // application.yml
	private String JSP경로;
	
	// 뷰 컨트롤러(기본경로) 설정
	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/").setViewName("/"); // 기본으로 / 일때 index 를 바라보기 때문에 수정
		registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
	}
	
	// 인터셉터(URI 및 로그) 설정
	@Override
	public void addInterceptors(final InterceptorRegistry registry) {
		registry.addInterceptor(new UriViewConfig()); // 도메인별 URI/VIEW 분기 세팅
		registry.addInterceptor(new LogParamConfig()); // 파라미터 및 기타 로그 세팅
	}
	
	// 리소스 경로 설정
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) { // 기본으로 recources/static 경로가 설정이 되나, 도메인별로 커스텀화 하기 위해 절대 경로 추가
		String 절대경로 = "file:///" + (new File("").getAbsolutePath()) + "/src/main/webapp"+JSP경로;
		for (String 도메인 : 도메인리스트.replaceAll(" ", "").split(",")) {
			for (String 리소스경로 : GC.리소스경로) {
				registry.addResourceHandler("/" + 도메인 + 리소스경로+"**")
					.addResourceLocations(절대경로 + 도메인 + 리소스경로);
			}
		}
	}
}