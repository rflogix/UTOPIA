<jsp:directive.page contentType="text/html;charset=UTF-8" />
<jsp:directive.page import="buildingpoint.admin.common.*"/>
<%
/***********************************************************************************
* Copyright (C)RFLOGIX since 2010.08.24 (rflogix@rflogix.com)
************************************************************************************
* ○ 파일	: page_error.jsp
* ● 설명	: 공통 에러 페이지
***********************************************************************************/
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>에러 페이지</title>
	</head>
	<body>
		<%
		String 에러코드 = GF.get에러코드(request);
		if (에러코드.equals("404")) {
		%>
			404 에러 페이지!!!
			<%
		} else if (에러코드.equals("500")) {
			%>
			500 에러 페이지!!!
			<%
		} else {
			%>
			기타 에러 페이지!!!
			<%
		}
		%>
	</body>
</html>