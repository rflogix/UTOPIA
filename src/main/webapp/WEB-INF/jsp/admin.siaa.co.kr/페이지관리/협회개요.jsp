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
		<jsp:directive.include file="../page_head.jsp"/>
		
		<!-- CKEDITOR -->
		<script src="/js/ckeditor/ckeditor.js" type="text/javascript"></script>
		
		<link href="/css/페이지관리/협회개요.css<%= 리소스버젼 %>" rel="stylesheet" type="text/css"/>
	</head>
	<body>
		<jsp:directive.include file="../page_header.jsp"/>

		<div class="page_content">
			<div class="button btn_save" onclick="updatePage()">화면 내용 저장</div>
			
			<form class="page_wrap menu_cd_1_1">
				<div class="title_box">
					<div class="left_title">
						<textarea name=".page_wrap.menu_cd_1_1 .title_box .left_title"></textarea>
					</div>
					<div class="right_title">
						<textarea name=".page_wrap.menu_cd_1_1 .title_box .right_title"></textarea>
					</div>
				</div>
				
				<% for (int i = 1; i <= 3; i++) { %>
				<div class="content_box box<%= i %>">
					<div class="number">
						<textarea name=".page_wrap.menu_cd_1_1 .content_box.box<%= i %> .number"></textarea>
					</div>
					<div class="title">
						<textarea name=".page_wrap.menu_cd_1_1 .content_box.box<%= i %> .title"></textarea>
					</div>
					<div class="sub_title">
						<textarea name=".page_wrap.menu_cd_1_1 .content_box.box<%= i %> .sub_title"></textarea>
					</div>
					<div class="content">
						<textarea name=".page_wrap.menu_cd_1_1 .content_box.box<%= i %> .content"></textarea>
					</div>
				</div>
				<% } %>
			</form>
		</div>
		
		<script>
		$(document).ready(function() {
			// 페이지 세팅
			let param = {
				pageURL: "/www.siaa.co.kr/index",
			};
			$.post("/page/setting", param, function(p_data, p_status) {
				if (p_data.result == "Y") {
					for (let i = 0; i < p_data.list.length; i++) {
						let clsPage = p_data.list[i];
						if (clsPage.contentType == "HTML") {
							$(clsPage.selectorNM + " textarea").text(clsPage.contentValue);
						}
					}
				}
				
			}, "JSON").fail(function(jqXHR, textStatus, errorThrown){
				//
			});
			
		});
		

		// 수정
		var PAGE_UPDATE_YN = false;
		function updatePage() {
			if (PAGE_UPDATE_YN == false) {
				confirm("저장 하시겠습니까?", function() {
					PAGE_UPDATE_YN = true;
					
					openPopup("loading");
					
					var strParam = $(".page_content form").serialize()
						+ "&pageURL=/www.siaa.co.kr/index"
						;
					$.post("/page/update", strParam, function(p_data, p_status) {
						if (p_data.result == "Y") {
							alert("저장되었습니다.");
							
						} else { // 오류라면
							alert(p_data.message);
						}
						closePopup("loading");
						PAGE_UPDATE_YN = false;
						
					},"JSON").fail(function(jqXHR, textStatus, errorThrown){
						closePopup("loading");
						PAGE_UPDATE_YN = false;
						alert("네트워크 문제로 저장되지 않았습니다");
					});
				});
				
			} else {
				alert("저장중 입니다.");
			}
		}

		</script>
		
		
		<jsp:directive.include file="../page_footer.jsp"/>
	</body>
</html>