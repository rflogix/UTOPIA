package buildingpoint.common;

import java.util.HashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import lombok.extern.slf4j.Slf4j;
import buildingpoint.user.UserDTO;

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

	// 파일 확장자
	public static String fileExtension(String p_FilePath) {
		String strReturn = "";
		try {
			if (p_FilePath != null) {
				if (p_FilePath.equals("") == false) {
					strReturn = p_FilePath.substring(p_FilePath.lastIndexOf(".") + 1);
					if (strReturn.indexOf("?") > -1) {
						strReturn = strReturn.substring(0, strReturn.indexOf("?"));
					}
				}
			}
		} catch (Exception e) {
			strReturn = "";
		}
		return strReturn;
	}

	public static String htmlTagRemoveString(String data) {
		/**
		 * // -----------------------------------------
		 * [htmlTagRemoveString 메소드 설명]
		 * // -----------------------------------------
		 * 1. html 형식 태그 제거 문자열 데이터 반환
		 * // -----------------------------------------
		 * 2. 호출 방식 :
		 *   String data = "<p>test url</p><p><a href=&quot;https://www.naver.com&quot;>https://www.naver.com</a></p><p>&amp;nbsp;</p><p>입니다</p><p>&amp;nbsp;</p>";
		 *
		 *   C_Util.htmlTagRemoveString(data);
		 * // -----------------------------------------
		 * 3. 리턴 데이터 : html 형식 태그 제거 문자열 반환
		 * // -----------------------------------------
		 * */

		// [리턴 데이터 변수 선언 실시]
		String result = "";

		// [문자열 데이터 널 판단 수행 실시]
		if (data != null
			&& data.length()>0
			&& data.trim().equals("") == false
			&& data.trim().equals("null") == false
			&& data.trim().equals("undefined") == false){ // [널이 아닌 경우]
			try {
				// [html 태그를 제거 하기 위한 패턴 정의 실시]
				String tag_pattern = "<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>"; // [<p> 등 태그 제거]
				Pattern num_reg_entity_pattern = Pattern.compile("&#[0-9]+;"); // [&#09; 형태 제거]
				Pattern char_reg_entity_pattern = Pattern.compile("&[a-zA-Z]+;"); // [&amp; 형태 제거]
				Pattern char_normal_entity_pattern = Pattern.compile(" [a-zA-Z]+;"); // [amp; 형태 제거]

				// [html 태그 1차 제거 실시]
				result = data.replaceAll(tag_pattern, " ");

				// [html 태그 2차 제거 실시]
				Matcher num_reg_mat = num_reg_entity_pattern.matcher(result);
				result = num_reg_mat.replaceAll(" ");

				Matcher char_reg_mat = char_reg_entity_pattern.matcher(result);
				result = char_reg_mat.replaceAll(" ");

				Matcher char_normal_mat = char_normal_entity_pattern.matcher(result);
				result = char_normal_mat.replaceAll(" ");

				// [html 태그 연속 공백 제거 실시]
				result = result.replaceAll("\\s+", " ");

				// [문자열 양쪽 끝 공백 제거 실시]
				result = result.trim();
			}
			catch (Exception e){
				e.printStackTrace();
			}
		}
		return result;
	}
}