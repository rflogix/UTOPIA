<jsp:directive.page contentType="text/html;charset=utf-8"/>
<jsp:directive.page import="com.common.*, com.bean.*, java.util.*, java.sql.*, java.net.*, java.io.*"/>
<jsp:directive.page import="com.oreilly.servlet.*, com.oreilly.servlet.multipart.*"/>
<jsp:directive.page import="com.fasterxml.jackson.core.type.TypeReference, com.fasterxml.jackson.databind.ObjectMapper"/>
<%
/***********************************************************************************
* Copyright (C)RFLOGIX since 2010.08.24 (rflogix@rflogix.com)
************************************************************************************
* ● 프로젝트 : 관리자
* ○ 파일     : upload_file_temp.jsp
* ○ 생성     : 2017.03.06(월요일)
* ○ 최종변경 : 2017.03.06(월요일)
***********************************************************************************/

String strError = "▷ RFLOGIX-관리자 (upload_file_temp.jsp) : ";
request.setCharacterEncoding("utf-8");

// CKEDITOR 파라메터
String CKEditorFuncNum = GF.getString(request.getParameter("CKEditorFuncNum"));
String CKEditor_Error = "<script>alert('파일을 업로드하지 못하였습니다');</script>";
boolean blnCKEditor_YN = (CKEditorFuncNum.equals("")?false:true);

try {
	/***********************************************************************************
	* 1. 상수,변수 설정
	***********************************************************************************/
	
	%><%@ include file="page_constant.jsp" %><%
	
	String StoreNM = GF.getString(request.getParameter("StoreNM"));
	if (StoreNM.equals("")) {
		StoreNM = STORE_NM;
	}
	String ShowURL = GF.getString(request.getParameter("ShowURL"));
	if (ShowURL.equals("")) {
		ShowURL = ROOT_FILE_URL;
	}
	String Division = GF.getString(request.getParameter("Division"));
	String StoreDir = GF.getString(request.getParameter("StoreDir"));
	String UploadDir = GF.getString(request.getParameter("UploadDir"));
	
	String strURL = (request.isSecure()?"https:":"http:") + UPLOAD_FILE_URL
		+ "?StoreNM="+URLEncoder.encode(StoreNM, "utf-8")
		+ "&StoreDir="+URLEncoder.encode(StoreDir, "utf-8")
		+ "&UploadDir="+URLEncoder.encode(UploadDir, "utf-8")
		+ "&ShowURL="+URLEncoder.encode(ShowURL, "utf-8")
		+ "&Division="+URLEncoder.encode(Division, "utf-8")
		;
	
	
	
	
	/***********************************************************************************
	* 2. URL 설정
	***********************************************************************************/
	
	// 1. URL
	URL url = new URL(strURL);
	
	// 2. Open connection
	HttpURLConnection conn = (HttpURLConnection) url.openConnection();
	conn.setUseCaches(false);
	conn.setDoOutput(true);
	
	
	
	
	/***********************************************************************************
	* 3. 파일 설정
	***********************************************************************************/
	
	conn.setRequestMethod("POST");
	conn.setRequestProperty("Connection", "Keep-Alive");
	conn.setRequestProperty("Cache-Control", "no-cache");
	conn.setRequestProperty("Content-Type", "multipart/form-data;boundary=" + FILE_BOUNDARY);

	// content wrapper시작
	DataOutputStream os = new DataOutputStream(conn.getOutputStream());
	
	// OS 체크
	String OS = System.getProperty("os.name").toLowerCase();
	if ((GF.left(ROOT_DIR.toLowerCase(),2).equals("c:")) || (GF.left(ROOT_DIR.toLowerCase(),2).equals("d:"))) {
		if (OS.indexOf("win") == -1) {
			ROOT_DIR = ROOT_DIR.substring(2);
		}
	} else {
		if (OS.indexOf("win") >= 0) {
			ROOT_DIR = "c:" + ROOT_DIR;
		}
	}
	
	// 폴더 생성
	String TEMP_FILE_PATH = ROOT_DIR+"/"+ROOT_TEMP_DIR;
	FileInputStream inputStream;
    byte[] buffer = new byte[4096];
    int bytesRead = -1;
    
	GF.makeDir(ROOT_DIR); GF.makeDir(TEMP_FILE_PATH);
	int nSizeLimit  = GC.MAX_FILE_SIZE;	// 파일사이즈
	MultipartRequest multi = new MultipartRequest(request, TEMP_FILE_PATH, nSizeLimit, "UTF-8", new DefaultFileRenamePolicy());
	String strElement = "", strFileNM = "";
	Enumeration<?> files = multi.getFileNames();
	while(files.hasMoreElements()){
		strElement = (String)files.nextElement(); // 파라미터
		strFileNM = GF.getString((String)multi.getFilesystemName(strElement)).toLowerCase(); // 파라미터 value
		
		os.writeBytes(FILE_HYPHENS + FILE_BOUNDARY + FILE_END);
		os.writeBytes("Content-Disposition: form-data; name=\"" + strElement + "\";filename=\"" + (new String(strFileNM.getBytes("UTF-8"), "ISO-8859-1")) + "\"" + FILE_END);
		os.writeBytes(FILE_END);
		
		inputStream = new FileInputStream(new File(TEMP_FILE_PATH+"/"+strFileNM));
	    bytesRead = -1;
	    while ((bytesRead = inputStream.read(buffer)) != -1) {
	        os.write(buffer, 0, bytesRead);
	    }
	    inputStream.close();
		
	    os.writeBytes(FILE_END);
	}
	multi = null;
	
	// content wrapper종료
	os.writeBytes(FILE_HYPHENS + FILE_BOUNDARY + FILE_HYPHENS + FILE_END);
	
	// buffer flush
	os.flush();
	os.close();
	
	
	
	
	/***********************************************************************************
	* 4. 결과값 설정
	***********************************************************************************/
	
	int responseCode = conn.getResponseCode();
	BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
	String inputLine;
	StringBuffer responseBuff = new StringBuffer();
	while ((inputLine = in.readLine()) != null) {
		responseBuff.append(inputLine);
	}
	in.close();
	
	// 결과값 파싱
	ObjectMapper mapper = new ObjectMapper();
	Map<String, Object> map = mapper.readValue(responseBuff.toString(), new TypeReference<Map<String,Object>>(){});
	if (((String)map.get("result")).equals("Y")) {
		if (blnCKEditor_YN == false) {
		    %>
			{
				"result" : "Y"
				,"RealURL" : "<%= GF.recoverToJSON(GF.getString((String)map.get("RealURL"))) %>"
				,"RealPath" : "<%= GF.recoverToJSON(GF.getString((String)map.get("RealPath"))) %>"
				,"Division" : "<%= GF.recoverToJSON(GF.getString((String)map.get("Division"))) %>"
			}
			<%
		} else {
			%>
			<script>
				window.parent.CKEDITOR.tools.callFunction("<%= CKEditorFuncNum %>", "<%= GF.recoverToJSON(GF.getString((String)map.get("RealURL"))) %>"); //, "이미지를 업로드하였습니다.");
			</script>
			<%
		}
	} else {
		if (blnCKEditor_YN) {%><%= CKEditor_Error %><%} else {
			%>
			{
				"result" : "N"
			}
			<%
		}
	}
	
} catch(Exception e) {
	System.out.println(strError + e);
	if (blnCKEditor_YN) {%><%= CKEditor_Error %><%} else {
		%>
		{
			"result" : "N"
		}
		<%
	}
}
%>