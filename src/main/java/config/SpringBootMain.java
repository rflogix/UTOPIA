package config;

import java.net.MalformedURLException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import config.spring.BeanNameConfig;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootApplication(scanBasePackages={"config", "buildingpoint", "siaa"}, nameGenerator = BeanNameConfig.class) // @SpringBootConfiguration + @EnableAutoConfiguration + @ComponentScan 조합
//@EntityScan(basePackages = {"buildingpoint", "siaa"})
public class SpringBootMain {
	public static void main(String[] args) throws MalformedURLException {
		SpringApplication springApplication = new SpringApplication(SpringBootMain.class);
		springApplication.setLogStartupInfo(false);
		springApplication.run(args);
		
		log.warn("{}", "█████ SPRING BOOT 시작 █████");
	}
}