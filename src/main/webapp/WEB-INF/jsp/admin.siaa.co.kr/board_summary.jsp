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
		
		<!-- CKEDITOR -->
		<script src="/js/ckeditor/ckeditor.js" type="text/javascript"></script>
		
		<script src="/js/board_summary.js<%= 리소스버젼 %>" type="text/javascript"></script>
		<link href="/css/board_summary.css<%= 리소스버젼 %>" rel="stylesheet" type="text/css"/>
	</head>
	<body>
		<jsp:directive.include file="page_header.jsp"/>
		
		<div class="page_content">
			<!-- 검색 타이틀 -->
			<div class="search_title">
				<i class="far fa-bookmark"></i><span class="menu_nm"></span>
				
				<!-- <div class="btn_detail button" onclick="toggleSearch();">
					<i class="fas fa-angle-< %= SearchOpenYN==1?"up":"down" % >"></i><div>상세검색 < %= SearchOpenYN==1?"닫기":"열기" % ></div>
				</div> -->
				
				<div class="btn_search button" onclick="clickSearch();">
					<i class="fa fa-search"></i>조 회
				</div>
			</div>
			
			<!-- 검색 조건 -->
			<form class="search_param">
				<input name="deleteYN" value="-1" type="hidden"/>
				<table>
					<colgroup>
						<col width="120px"/>
						<col width="300px"/>
						
						<col width="120px"/>
						<col width="300px"/>
						
						<col width="120px"/>
						<col width="auto"/>
					</colgroup>
					<tr>
						<th>게시판구분</th>
						<td>
							<select name="boardType">
								<% for (String 게시판 : GC.게시판종류) { %>
								<option value="<%= 게시판 %>"><%= 게시판 %></option>
								<% } %>
							</select>
						</td>
						<th>제목</th>
						<td>
							<input name="titleText_like"/>
						</td>
						<th>내용</th>
						<td>
							<input name="contentText_like"/>
						</td>
					</tr>
					<!--
					<tr>
						<th>작성자</th>
						<td>
							<input name="writeUserNM_like"/>
						</td>
						<th>작성일시</th>
						<td>
							<input name="writeDT_start" class="start" style="width:80px; text-align:center;" maxlength="10"/>
							<img src="image/button/ico_calendar.png" onclick="Calendar($(this).parent().children('.start'))" style="width:auto; cursor:pointer;"/>
							~
							<input name="writeDT_end" class="end" style="width:80px; text-align:center;" maxlength="10"/>
							<img src="image/button/ico_calendar.png" onclick="Calendar($(this).parent().children('.end'))" style="width:auto; cursor:pointer;"/>
						</td>
						<th>업데이트일시</th>
						<td>
							<input name="updateDT_start" class="start" style="width:80px; text-align:center;" maxlength="10"/>
							<img src="image/button/ico_calendar.png" onclick="Calendar($(this).parent().children('.start'))" style="width:auto; cursor:pointer;"/>
							~
							<input name="updateDT_end" class="end" style="width:80px; text-align:center;" maxlength="10"/>
							<img src="image/button/ico_calendar.png" onclick="Calendar($(this).parent().children('.end'))" style="width:auto; cursor:pointer;"/>
						</td>
					</tr>
					-->
				</table>
			</form>
			
			<!-- 작업 실행 -->
			<div class="search_action">
				<div class="button" onclick="openPopup_board();">
					<i class="fas fa-share-square"></i>게시물작성
				</div>
			</div>
			
			<!-- 검색 결과 리스트 -->
			<div class="search_result">
				<div class="GRID"></div>
			</div>
		</div>
		
		<%--********************************************************************************
		* 게시판 팝업
		********************************************************************************--%>
		
		<div class="popup_board popup_bg">
			<div class="popup_wrap">
				<div class="popup_top">
					<%-- 제목 --%>
					<div class="title">
						상세보기
					</div>
					
					<%-- 닫기 버튼 --%>
					<div class="btn_close" onclick="closePopup(this);">
						<i class="fa fa-times"></i>
					</div>
				</div>
				<form class="popup_content" onsubmit="return false" autocomplete="nope">
					<div class="title">
						게시판 구분
						<input name="boardCD" type="hidden"/>
					</div>
					<div class="content flex-row-start">
						<select name="boardType">
							<% for (String 게시판 : GC.게시판종류) { %>
							<option value="<%= 게시판 %>"><%= 게시판 %></option>
							<% } %>
						</select>
					</div>
					
					<div class="title write_user">
						작성자
						<input name="writeUserCD" type="hidden"/>
					</div>
					<div class="content write_user">
						<input name="writeUserNM" readonly="readonly" />
						
						<div class="write_dt">
							<div class="title">
								작성일
							</div>
							<div class="content">
								<input name="writeDT"/>
							</div>
						</div>
					</div>
					
					<div class="title">
						제 목
					</div>
					<div class="content">
						<input name="titleHtml"/>
						<input name="titleText" type="hidden"/>
					</div>
					
					<div class="title">
						내 용
					</div>
					<div class="content editor">
						<textarea id="contentEditor"></textarea>
						<input name="contentText" type="hidden" />
						<input name="contentHtml" type="hidden" />
						<input name="contentEditor" type="hidden" />
						<script>
							$( document ).ready( function() {
								CKEDITOR.replace("contentEditor", {
									width: "1040px",
									height: "600px",
									//allowedContent: 'a[!href](btn_apply_20200629)',
							 	});
							} );
						</script>
					</div>
				</form>
				<div class="popup_bot flex-row">
					<a class="button delete" onclick="deleteBoard();">
						<i class="far fa-trash-alt"></i>&nbsp;&nbsp;삭 제
					</a>
					<a class="button update" onclick="updateBoard();">
						<i class="fa fa-save"></i>&nbsp;&nbsp;저 장
					</a>
				</div>
			</div>
		</div>
		
		<jsp:directive.include file="page_footer.jsp"/>
	</body>
</html>