package buildingpoint.common;

public class GC extends config.custom.GC {
	
	public static final String 도메인 = "buildingpoint.co.kr";
	public static final String 슈퍼관리자암호 = "@@";
	public static final int 세션유지시간 = 1800; // 초단위이나 최소는 1분이므로 60초 이상
	
	// 사용자 타입
	public static final int USER_TYPE_NORMAL = 1; // 일반(개인)
	public static final int USER_TYPE_COMPANY = 2; // 기업
	public static final int USER_TYPE_ADMIN = 90; // 관리자 (일반관리자 - 일부사용권한)
	public static final int USER_TYPE_SUPER = 99; // 관리자 (슈퍼어드민 - 모든권한)
	
	// 사용자 상태
	public static final int		USER_STATUS_NONE	= -1; 	// 미분류
	public static final int		USER_STATUS_REQUEST	= 10; 	// 승인대기 (등록요청)
	public static final int		USER_STATUS_REVIEW	= 20; 	// 승인검토 (검토중)
	public static final int		USER_STATUS_CONFIRM	= 30; 	// 등록완료
	public static final int		USER_STATUS_REJECT	= 80; 	// 승인거절
	public static final int		USER_STATUS_DELETE	= 90; 	// 탈퇴
	
	
	
	
	
	
	
	public static final String STORE_ID = "buildingpoint";
	
	// 이미지 관련 상수
	public static final String UPLOAD_IMG_URL = "//upload.rflogix.com/upload_img.jsp";
	public static final String REAL_IMG_URL = "//img.rflogix.com/buildingpoint";

	public static final String IMG_SHOW_URL = "//img.rflogix.com/buildingpoint";

	public static final String IMG_SIZE_LIST = "";//300,700,1080";
	public static final String IMG_SIZE_SHOW = "";

	public static final String REAL_IMG_DIR_USER = "user";
	public static final String IMG_SIZE_LIST_USER = "300";
	public static final String IMG_SIZE_SHOW_USER = "300";
	public static final String IMG_QUALITY_USER = "100";

	public static final String REAL_IMG_DIR_RECEIPT = "receipt";
	public static final String IMG_SIZE_LIST_RECEIPT = "";
	public static final String IMG_SIZE_SHOW_RECEIPT = "";
	public static final String IMG_QUALITY_RECEIPT = "70";

	public static final String REAL_IMG_DIR_CHAT = "chat";
	public static final String IMG_SIZE_LIST_CHAT = "700";//700,1080";
	public static final String IMG_SIZE_SHOW_CHAT = "700";
	public static final String IMG_QUALITY_CHAT = "100";

	public static final String REAL_IMG_DIR_COMPANY = "company";
	public static final String IMG_SIZE_LIST_COMPANY = "700";
	public static final String IMG_SIZE_SHOW_COMPANY = "700";
	public static final String IMG_QUALITY_COMPANY = "70";

	public static final String REAL_IMG_DIR_BOARD = "board";
	public static final String IMG_SIZE_LIST_BOARD = "700";
	public static final String IMG_SIZE_SHOW_BOARD = "700";
	public static final String IMG_QUALITY_BOARD = "100";
	
	//파일/이미지 공통
	public static final String FILE_UPLOAD_URL = "//upload.rflogix.com/file_upload.jsp";
	public static final String FILE_MOVE_URL = "//upload.rflogix.com/file_move.jsp";

	public static final String ROOT_DIR = "/develop/FILES";
	public static final String ROOT_TEMP_DIR = "$temp";

	public static final String FILE_END = "\r\n";
	public static final String FILE_HYPHENS = "--";
	public static final String FILE_BOUNDARY =  "*****";
	
	public static final int		MAX_FILE_SIZE			= 1000 * 1024 * 1024 ; // 파일업로드 용량 제한.. 10Mb

	/***********************************************************************************
	 * 코드관련
	 ***********************************************************************************/
	// 회원코드
	public static final int		CODE_TYPE_USER			= 10;		// 회원코드		- 상점코드+년월일+SEQ	ex) 10004 150323 00000001
	public static final int		CODE_MAX_USER      		= 99999999;

	// 회원코드
	public static final int		CODE_TYPE_MENU			= 200;		// 회원코드		- 상점코드+년월일+SEQ	ex) 10004 150323 00000001
	public static final int		CODE_MAX_MENU      		= 99999999;

}