package config.custom;

import java.io.File;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Calendar;
import java.util.Enumeration;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class GF {
	
	/***********************************************************************************
	* request 관련 함수
	***********************************************************************************/
	
	public static HashMap<String,Object> get파라미터(HttpServletRequest request) throws Exception {
		HashMap<String, Object> map = new HashMap<String, Object>();
		Enumeration<String> enumber = request.getParameterNames();
		while (enumber.hasMoreElements()) {
			String key = enumber.nextElement().toString();
			map.put(key, request.getParameter(key));  
		}
		return map;
	}
	
	public static String get에러코드(HttpServletRequest request) throws Exception {
		return getString(request.getAttribute(GC.응답에러_에러코드));
	}
	
	
	
	
	/***********************************************************************************
	* 세션 관련 함수
	***********************************************************************************/
	
	@SuppressWarnings("unchecked")
	public static HashMap<String, Object> get세션변수(HttpSession session) throws Exception {
		HashMap<String, Object> mapSession = (HashMap<String, Object>)session.getAttribute(GC.세션KEY);
		if (mapSession == null) {
			mapSession = new HashMap<String, Object>();
		}
		return mapSession;
	}
	public static HashMap<String, Object> get세션변수(HttpServletRequest request) throws Exception {
		return get세션변수(request.getSession(false));
	}
	public static HashMap<String, Object> set세션변수(HttpSession session, HashMap<String, Object> mapSession) throws Exception {
		if (mapSession == null) {
			mapSession = new HashMap<String, Object>();
		}
		session.setAttribute(GC.세션KEY, mapSession);
		return mapSession;
	}
	public static HashMap<String, Object> set세션변수(HttpServletRequest request, HashMap<String, Object> mapSession) throws Exception {
		return set세션변수(request.getSession(false), mapSession);
	}
	
	
	
	
	/***********************************************************************************
	* 날짜 관련
	***********************************************************************************/
	
	// 날짜 조정 - ex) 2016-01-01 13:04:45 형태로 들어오면 2016-03-03 13:04:45 형태로 반환 
	public static String addTime(String p_Date, int p_AddType, int p_AddTime) throws Exception {
		Calendar calDate	= Calendar.getInstance();
		int intYear, intMonth, intDay, intHour, intMinute, intSecond;
		String strReturn = "";
		
		if ((p_Date != null) && (p_Date.trim().equals("") == false)) {
			// 현재 날짜 세팅
			strReturn = p_Date.replaceAll("-", "").replaceAll("\\.", "").replaceAll("/", "").replaceAll(":", "").replaceAll(" ", "");
			if (strReturn.length() == 8) {
				strReturn = strReturn + "000000";
			}
			strReturn = left(strReturn, 14);
			if (strReturn.length() == 14) {
				intYear = Integer.parseInt(strReturn.substring(0,4));
				intMonth = Integer.parseInt(strReturn.substring(4,6)) - 1; // 1월이 0 부터 시작하므로
				intDay = Integer.parseInt(strReturn.substring(6,8));
				intHour = Integer.parseInt(strReturn.substring(8,10));
				intMinute = Integer.parseInt(strReturn.substring(10,12));
				intSecond = Integer.parseInt(strReturn.substring(12,14));
				
				// 날짜 수정
				calDate.set(intYear, intMonth, intDay, intHour, intMinute, intSecond);
				calDate.add(p_AddType, p_AddTime);
				
				// 반환 날짜 세팅
				intYear = calDate.get(Calendar.YEAR);
				intMonth = calDate.get(Calendar.MONTH) + 1; // 1월이 0 부터 시작하므로
				intDay = calDate.get(Calendar.DATE);
				intHour = calDate.get(Calendar.HOUR_OF_DAY);
				intMinute = calDate.get(Calendar.MINUTE);
				intSecond = calDate.get(Calendar.SECOND);
				
				strReturn = Integer.toString(intYear) + "-" + right("0"+intMonth, 2) + "-" + right("0"+intDay, 2)
					+ " " + right("0"+intHour, 2) + ":" + right("0"+intMinute, 2) + ":" + right("0"+intSecond, 2)
					;
			} else {
				strReturn = "";
			}
			
		} else {			
			strReturn = "";
		}
		return strReturn;
	}
	public static String addTime_Year(String p_Date, int p_AddTime) throws Exception {
		return addTime(p_Date, Calendar.YEAR, p_AddTime);
	}
	public static String addTime_Month(String p_Date, int p_AddTime) throws Exception {
		return addTime(p_Date, Calendar.MONTH, p_AddTime);
	}
	public static String addTime_Day(String p_Date, int p_AddTime) throws Exception {
		return addTime(p_Date, Calendar.DATE, p_AddTime);
	}
	public static String addTime_Second(String p_Date, int p_AddTime) throws Exception {
		return addTime(p_Date, Calendar.SECOND, p_AddTime);
	}
	
	
	
	
	/***********************************************************************************
	* 숫자 관련
	***********************************************************************************/

	// getInt 함수
	public static int getInt(Object p_Object) throws Exception {
		int intReturn = 0;
		if (p_Object != null) {
			String strReturn = StringUtils.trimToEmpty(p_Object.toString());
			intReturn = Integer.parseInt(strReturn.equals("")?"0":strReturn);
		}
		
		return intReturn;
	}

	// getLong 함수
	public static long getLong(Object p_Object) throws Exception {
		long lngReturn = 0;
		if (p_Object != null) {
			String strReturn = StringUtils.trimToEmpty(p_Object.toString());
			lngReturn = Long.parseLong(strReturn.equals("")?"0":strReturn);
		}
		return lngReturn;
	}
	
	// 숫자인지 체크하는 함수
	public static boolean isNumber(String p_Number) throws Exception {
		boolean result = true;
		String strCheck = p_Number;
		
		if ((strCheck == null) || (strCheck.equals(""))) {
			result = false;
		} else {
			// 콤마, 쩜 떼고 검사
			strCheck = strCheck.replaceAll(",", "");
			strCheck = strCheck.replaceAll("\\.", "");
			//strCheck = strCheck.replace(".", "");
			
			// 마이너스 값이라면 마이너스 떼고 검사
			if (strCheck.substring(0,1).equals("-") == true) {
				strCheck = strCheck.substring(1);
			}
			
			for (int i = 0; i < strCheck.length(); i++) {
				char c = strCheck.charAt(i);
				if (c < 48 || c > 59) {
					result = false;
					break;
				}
			}
		}
		
		return result;
	}
	
	
	
	
	/***********************************************************************************
	* 문자열 관련
	***********************************************************************************/

	// getString 함수
	public static String getString(Object p_Object) throws Exception {
		String strReturn = "";
		if (p_Object != null) {
			strReturn = StringUtils.trimToEmpty(p_Object.toString());
		}
		return strReturn;
	}
	
	// JSON 으로 변환
	public static String getJson(Object p_obj) throws Exception {
		return (new ObjectMapper()).writerWithDefaultPrettyPrinter().writeValueAsString(p_obj);
	}
	
	// left 함수
	public static String left(Object p_Object, int p_Count) throws Exception {
		String strReturn = "";
		if (p_Object != null) {
			strReturn = StringUtils.left(getString(p_Object.toString()), p_Count);
		}
		return strReturn;
	}
	
	// right 함수 (오른쪽부터 일정개수 자르기)
	public static String right(Object p_Object, int p_Count) throws Exception {
		String strReturn = "";
		if (p_Object != null) {
			strReturn = StringUtils.right(getString(p_Object.toString()), p_Count);
		}
		return strReturn;
	}
	
	// mid 함수 (가운데부터 일정개수 자르기)
	public static String mid(Object p_Object, int p_StartPosition, int p_Count) throws Exception {
		String strReturn = "";
		if (p_Object != null) {
			strReturn = StringUtils.mid(getString(p_Object.toString()), p_StartPosition, p_Count);
		}
		return strReturn;
	}
	public static String mid(Object p_Object, int p_StartPosition) {
		String strReturn = "";
		if (p_Object != null) {
			strReturn = p_Object.toString();
			int intLength = strReturn.length();
			if (p_StartPosition > 0) {
				strReturn = (intLength < p_StartPosition)?"": strReturn.substring(p_StartPosition-1);
			}
		}
		return strReturn;
	}
	
	// MD5 로 인코딩
	public static String encodeMD5(String p_Origin) throws Exception {
		String strReturn = "";
		byte[] bResult = null;
		
		if (p_Origin != null) {
			try {
				bResult = MessageDigest.getInstance("MD5").digest(p_Origin.getBytes());
				
				StringBuffer sbTemp = new StringBuffer();  
			for (int i = 0; i < bResult.length; i++) {
			sbTemp.append(Integer.toString(( bResult[i] & 0xf0) >> 4, 16 )); 
			sbTemp.append(Integer.toString(bResult[i] & 0x0f, 16 ));
			}
			strReturn = sbTemp.toString();
			
			} catch (NoSuchAlgorithmException e) {
				e.printStackTrace();
				strReturn = "";
			}
		}
		return strReturn;
	}
	
	
	
	
	/***********************************************************************************
	* 파일 관련
	***********************************************************************************/

	// makeDir 함수
	public static boolean makeDir(String p_OriginPath) {
		boolean blnReturn = false;
		
		try {
			String strTempDir = p_OriginPath;
			File tempFile = new File(strTempDir);
			if (tempFile.exists() == false) {
				tempFile.mkdir();
			}
			blnReturn = true;
			
		} catch(Exception e) {
			log.debug("{}", e.toString());
		}
		
		return blnReturn;
	}
}