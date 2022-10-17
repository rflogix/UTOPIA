<jsp:directive.page contentType="text/html;charset=UTF-8"/>
<%
/***********************************************************************************
* Copyright (C)RFLOGIX since 2010.08.24 (rflogix@rflogix.com)
************************************************************************************
* ○ 파일	: user_summary.jsp
* ● 설명	: user_summary 화면
***********************************************************************************/
%>
<!DOCTYPE html>
<html>
	<head>
		<jsp:directive.include file="page_head.jsp"/>
		
		<script src="/js/user_summary.js<%= 리소스버젼 %>" type="text/javascript"></script>
		<link href="/css/user_summary.css<%= 리소스버젼 %>" rel="stylesheet" type="text/css"/>
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
			
			<form class="search_param">
				<table>
					<colgroup>
						<col width="100px"/>
						<col width="250px"/>
						<col width="100px"/>
						<col width="250px"/>
						<col width="100px"/>
						<col width="250px"/>
						<col width="100px"/>
						<col width="auto"/>
					</colgroup>
					<tr>
						<th>사용자명</th>
						<td>
							<input name="userNM_like">
						</td>
						<th>사용자ID</th>
						<td>
							<input name="userID_like">
						</td>
						<th>휴대폰번호</th>
						<td>
							<input name="cellPhoneNO_like">
						</td>
						<th>가입일</th>
						<td>
							<input name="joinDT_start" class="start" style="width:80px; text-align:center;" maxlength="10">
							<img src="image/button/ico_calendar.png" onclick="Calendar($(this).parent().children('.start'))" style="width:auto; cursor:pointer;">
							~
							<input name="joinDT_end" class="end" style="width:80px; text-align:center;" maxlength="10">
							<img src="image/button/ico_calendar.png" onclick="Calendar($(this).parent().children('.end'))" style="width:auto; cursor:pointer;">
						</td>
					</tr>
				</table>
			</form>
			
			<!-- 검색 결과 리스트 -->
			<div class="search_result">
				<div class="GRID"></div>
			</div>
		</div>
		
		<%--********************************************************************************
		* 사용자 팝업
		********************************************************************************--%>
		
		<div class="popup_user popup_bg">
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
				<form class="popup_content">
					<div class="user_company_wrap">
						<div class="user_wrap flex-row-start">
							<div class="caption flex-row">
								사<br/>용<br/>자<br/>정<br/>보
							</div>
							<div class="content_wrap">
								<%-- 사용자 이름 --%>
								<div>
									<div class="title">사용자 이름</div>
									<div class="content">
										<input name="userNM" placeholder="ex) 사용자 이름" autocomplete="nope" />
										<input name="userCD" type="hidden" />
									</div>
								</div>
								
								<%-- 사용자 ID --%>
								<div>
									<div class="title">사용자 아이디</div>
									<div class="content">
										<input name="userID" placeholder="ex) 사용자 아이디" autocomplete="nope" />
									</div>
								</div>
								
								<%-- 사용자 Email --%>
								<div>
									<div class="title">사용자 이메일</div>
									<div class="content">
										<input name="email" placeholder="ex) 사용자 이메일" autocomplete="nope" />
									</div>
								</div>
								
								<%-- 사용자 CellPhoneNO --%>
								<div>
									<div class="title">사용자 핸드폰</div>
									<div class="content">
										<input name="cellPhoneNO" placeholder="ex) 사용자 핸드폰" autocomplete="nope" />
									</div>
								</div>
								
								<%-- 사용자 상태
								<div>
									<div class="title">승인상태</div>
									<div class="content">
										<select name="userStatus" data-confirm="<%= GC.USER_STATUS_CONFIRM %>" data-request="<%= GC.USER_STATUS_REQUEST %>">
											<option value="<%= GC.USER_STATUS_REQUEST %>">승인대기</option>
											<option value="<%= GC.USER_STATUS_REVIEW %>">승인검토</option>
											<option value="<%= GC.USER_STATUS_REJECT %>">승인거절</option>
											<option value="<%= GC.USER_STATUS_CONFIRM %>">등록완료</option>
										</select>
									</div>
								</div> --%>
								
							</div>
						</div>
					</div>
				</form>
				<div class="popup_bot btn_wrap">
					<div class="btn_delete" onclick="deleteUser();">삭제</div>
					<button class="btn_update" onclick="updateUser();" type="button">저장</button>
				</div>
			</div>
		</div>
		
		<jsp:directive.include file="page_footer.jsp"/>
	</body>
</html>