package config.custom;

public class GC {
	// UriViewConfig.java 설정 관련
	public static final String 기본도메인 = "admin.siaa.co.kr"; // localhost 일때 기본 도메인
	public static final String 개발테스트용_INPUT도메인 = "rflogix.iptime.org"; // 개발 테스트시 들어오는 도메인 설정
	public static final String 개발테스트용_OUTPUT도메인 = "www.siaa.co.kr"; // 개발 테스트시 나가는 도메인 설정
	
	// spring 세팅 관련
	public static final String[] 리소스경로 = {"/js/", "/css/", "/image/"}; // LogParamConfig.java 에서 사용
	
	public static final String 마이바티스_YML = "mybatis-db"; // MybatisConfig.java 에서 정되는 application.yml 의 도메인별 mybatis db 정보 property
	public static final String 마이바티스_루트경로 = "classpath:mybatis/"; // MybatisConfig.java 에서 설정되는 esources 에서 mybatis 경로
	
	public static final String 응답에러_에러코드 = "customErrorCode"; // ErrorConfig.java 의 model 세팅에 사용
	public static final String 응답에러_뷰네임 = "/page_error"; // ErrorConfig.java 에서 세팅되는 각각의 도메인 jsp 경로에 추가되어야할 {에러뷰네임}.jsp
	
	public static final String 로그아웃_클래스명 = "UserDTO"; // SessionConfig.java 에서 사용할 사용자클래스(UserDTO)
	public static final String 로그아웃_서비스명 = "UserService"; // SessionConfig.java 에서 사용할 사용자서비스(UserService)
	public static final String 로그아웃_함수명 = "로그아웃"; // SessionConfig.java 에서 사용할 사용자서비스의 로그아웃 함수명
	
	// 세션 관련
	public static final String 세션KEY = "mapSession"; // GF.java 의 세션변수조회, 세션변수설정에 사용
	public static final String 세션KEY_로그인사용자 = "clsLoginUser"; // 세션변수중 로그인 사용자 클래스(UserDTO)
	public static final String 세션KEY_셀프로그아웃 = "logoutSelfYN"; // SessionConfig.java 에서 사용할 셀프로그아웃 되었는지 여부 - UserService.java 에서 로그아웃 함수에서 세팅
}