<jsp:directive.page contentType="text/html;charset=UTF-8"/>
<%
/***********************************************************************************
* Copyright (C)RFLOGIX since 2010.08.24 (rflogix@rflogix.com)
************************************************************************************
* ○ 파일	: index.jsp
* ● 설명	: 초기화면
***********************************************************************************/
%>
<!DOCTYPE html>
<html>
	<head>
		<jsp:directive.include file="page_head.jsp"/>
	</head>
	<body>
		<jsp:directive.include file="page_header.jsp"/>
		
		index page 임다
		<br/>
		<br/>세션 남은시간 <div id="sessionTime"></div>
		<br/>
		<br/><button onclick="logout()">logout</button>
		
		<script>
			$(document).ready(function() {
				console.log("index 화면 진입");
			});
			
			function logout() {
				$.post("/user/logout", "", function(p_data, p_status) {
					if (p_data.result == "Y") { // 로그아웃 했다면
						location.replace("/");
						
					} else {
						alert(p_data.message);
					}
					
				}, "JSON").fail(function(a,b,c){
					alert("네트워크 문제로 로그아웃 되지 않았습니다");
				});
			}
		</script>
		
		<jsp:directive.include file="page_footer.jsp"/>
	</body>
</html>