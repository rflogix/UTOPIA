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
		<script src="/js/tabulator_test.js<%= 리소스버젼 %>" type="text/javascript"></script>
		<script src="/js/tabulator_template.js <%= 리소스버젼 %>" type="text/javascript"></script>
	</head>
	<body>
		<jsp:directive.include file="page_header.jsp"/>
		<div style='display:flex; justify-content:space-between;'>
            <div class='search_container' style='width: 250px; margin: 10px; display:flex; justify-content:space-between;'>
                <input type='text' name='searchKeyword'/>
                <div style='padding: 5px; border:1px solid black;' onclick="clickSearchTgrid()">
                    조회
                </div>
            </div>
            <div style='width: 150px; display:flex; justify-content:space-between; align-items:center;'>
                <button onclick="syncServer('createData')">생성</button>
                <button onclick="syncServer('updateData');">저장</button>
                <button onclick="syncServer('deleteData')">삭제</button>
            </div>
        </div>
		<div id="grid"></div>
		<div style='display:flex; justify-content:space-between;'>
            <div class='search_container' style='width: 250px; margin: 10px; display:flex; justify-content:space-between;'>
                <input type='text' name='searchKeywordUser'/>
                <div style='padding: 5px; border:1px solid black;' onclick="clickSearchTgridUser()">
                    조회
                </div>
            </div>
        </div>
		<div id="grid_user"></div>
		<jsp:directive.include file="page_footer.jsp"/>
	</body>
</html>