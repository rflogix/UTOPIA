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
		<script src="/js/toast_test.js<%= 리소스버젼 %>" type="text/javascript"></script>
		<script src="/js/grid_template.js <%= 리소스버젼 %>" type="text/javascript"></script>
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
                <!--<button onclick="createRowData()">로우 생성</button>-->
                <button onclick="syncServer('createData')">생성</button>
                <button onclick="syncServer('updateData');">수정</button>
                <button onclick="syncServer('deleteData')">삭제</button>
            </div>
        <!--<button onclick="grid.request('modifyData')">저장</button>-->
        </div>
		<div id="grid" style='height: 400px;'></div>
		<jsp:directive.include file="page_footer.jsp"/>
	</body>
</html>