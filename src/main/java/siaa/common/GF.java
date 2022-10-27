package siaa.common;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import lombok.extern.slf4j.Slf4j;
import siaa.user.UserDTO;

@Slf4j
public class GF extends config.custom.GF {
	
	public static String 페이지이동(HttpServletRequest request, String 페이지URL) throws Exception {
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
		
		return 페이지URL;
	}
	
	public static String get서브도메인(HttpServletRequest request) throws Exception {
		String 서브URL = "";
		String[] 요청URI배열 = request.getRequestURI().split("/");
		if (요청URI배열.length > 0) {
			서브URL = 요청URI배열[1];
			서브URL = 서브URL.replace("."+GC.도메인, "").replace(GC.도메인, "");
		}
		
		return 서브URL;
	}
	
	public static UserDTO 로그인사용자(HttpSession session) {
		UserDTO clsLoginUser;
		
		try {
			HashMap<String, Object> 세션변수 = GF.get세션변수(session); // 세션변수 조회
			Object objUser = 세션변수.get(GC.세션KEY_로그인사용자);
			if (objUser != null) {
				clsLoginUser = (UserDTO)objUser;
			} else {
				clsLoginUser = new UserDTO();
			}
			
		} catch(Exception e) {
			clsLoginUser = new UserDTO();
			log.error("{}", e.toString());
		}
		
		return clsLoginUser;
	}
	public static UserDTO 로그인사용자(HttpServletRequest request) {
		return 로그인사용자(request.getSession());
	}
	
	public static boolean 로그인여부(HttpSession session) {
		return 로그인사용자(session).getUserCD() != 0;
	}
	public static boolean 로그인여부(HttpServletRequest request) {
		return 로그인사용자(request.getSession()).getUserCD() != 0;
	}
	
	// 페이징 파라미터 설정
	public static HashMap<String, Object> setSearchPagingParam(HashMap<String, Object> mapParam, int Search_TotalCNT) throws Exception {
		HashMap<String, Object> mapReturn = new HashMap<String, Object>();
		mapReturn.putAll(mapParam); // 기본적으로 들어온 파라미터 그대로 돌려준다
		
		// 검색조건으로 DB 에서 검색 - 총 검색된 개수 설정
		int Search_ShowCNT = GF.getInt(mapParam.get("Search_ShowCNT")); // 화면에 보여질 개수
		mapParam.put("Search_ShowCNT", Search_ShowCNT); // DB에 따라 문자형으로 넘어가면 오류나는 경우 대비
		
		// 총 페이지수 다시 설정
		int Search_TotalPage = 0;
		if ((Search_TotalCNT > 0) && (Search_ShowCNT > 0)) {
			Search_TotalPage = (int)Math.ceil((double)Search_TotalCNT / (double)Search_ShowCNT);
		}
		
		// 현재 페이지 설정
		int Search_Page = GF.getInt(mapParam.get("Search_Page"));
		if (Search_Page > Search_TotalPage) {
			Search_Page = Search_TotalPage;
		}
		if (Search_Page == 0) {
			Search_Page = 1;
		}
		
		// 페이징하려는 ROW 시작/끝 설정
		int Search_StartRow = Search_ShowCNT * Search_Page - Search_ShowCNT;
		if (Search_StartRow < 0) {Search_StartRow = 0;}
		int Search_LastRow = Search_StartRow + Search_ShowCNT;
		//Search_StartRow = Search_StartRow + 1;
		mapParam.put("Search_StartRow", Search_StartRow);
		mapParam.put("Search_LastRow", Search_LastRow);
		
		// 리턴할 파라미터 설정
		mapReturn.put("Search_Page", Search_Page);
		mapReturn.put("Search_ShowCNT", Search_ShowCNT);
		mapReturn.put("Search_TotalCNT", Search_TotalCNT);
		mapReturn.put("Search_TotalPage", Search_TotalPage);
		mapReturn.put("Search_StartRow", Search_StartRow);
		mapReturn.put("Search_LastRow", Search_LastRow);
		
		return mapReturn;
	}
	
	// 조회된 검색수량 설정
	public static void setSearchResultCnt(HashMap<String, Object> mapReturn, int Search_ResultCNT) throws Exception {
		mapReturn.put("Search_ResultCNT", Search_ResultCNT);
	}
	
	// 검색 시작 ROW 조회
	public static int getSearchRowStart(HashMap<String, Object> mapReturn) throws Exception {
		return GF.getInt(mapReturn.get("Search_StartRow"));
	}
}