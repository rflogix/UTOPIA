<jsp:directive.page contentType="text/html;charset=UTF-8" />
<%
/***********************************************************************************
* Copyright (C)RFLOGIX since 2010.08.24 (rflogix@rflogix.com)
************************************************************************************
* ○ 파일	: login.jsp
* ● 설명	: 로그인 페이지
***********************************************************************************/
%>
<!DOCTYPE html>
<html>
	<head>
		<jsp:directive.include file="page_head.jsp"/>
		
		<link href="/css/login.css<%= 리소스버젼 %>" rel="stylesheet" type="text/css"/>
	</head>
	<body>
		<div class="page_top">
			<div class="logo">
				<img src="/image/logo_100.png" />
				<span>&nbsp;</span>
			</div>
		</div>
		
		<div class="page_content">
			<div class="login_wrap">
			<form id="frmLogin">
				<%-- 타이틀 --%>
				<div class="title">
					로그인
				</div>
				
				<%-- 아이디 --%>
				<input name="userID" placeholder="아이디" autocomplete="nope" />
				<%-- 패스워드 --%>
				<input name="userPW" placeholder="비밀번호" type="password" autocomplete="nope" />
				
				<div class="btn_wrap">
					<%-- 비밀번호 재설정 버튼 --%>
					<div class="btn_reset">
						<!-- <span onclick="openPopup_PW_Reset();">비밀번호 재설정</span> -->
					</div>
					<%-- 로그인 버튼 --%>
					<div class="btn_login" onclick="loginUser();">
						로그인
					</div>
				</div>
			</form>
			</div>
		</div>
		<!--
		<%-- 비밀번호 재설정 팝업 --%>
		<div class="popup_pw_reset">
			<div class="close_bg" onclick="closePopup_PW_Reset();"></div>
			<div class="content_wrap">
				<%-- 타이틀 --%>
				<div class="title">
					비밀번호 재설정
				</div>
				<div class="content">
					가입한 이메일 주소를 입력해주세요.
					<br/>해당 메일로 비밀번호를 재설정하여 보내드립니다.
				</div>
				
				<%-- 아이디 --%>
				<input id="userID_findpw" placeholder="이메일 주소"/>
				
				<div class="btn_wrap">
					<%-- 전송 버튼 --%>
					<div class="btn_send" onclick="sendPassword();">
						전 송
					</div>
				</div>
				
				<%-- 닫기 버튼 --%>
				<div class="btn_close" onclick="closePopup_PW_Reset();">
					<i class="fa fa-times"></i>
				</div>
			</div>
		</div>
		-->
		
		<script>
			$(document).ready(function() {
				$("#frmLogin input[name='userID']").keydown(function(e) {
					if (e.keyCode == 13) {
						e.preventDefault();
						$("#frmLogin input[name='userPW']").focus();
					}
				});
				$("#frmLogin input[name='userPW']").keydown(function(e) {
					if (e.keyCode == 13) {
						e.preventDefault(); e.stopPropagation();
						loginUser();
					}
				});
				
				$("#frmLogin input[name='userID']").select().focus();
			});
			
			var LOGIN_USER_CLICK_YN = false;
			function loginUser() {
				if (LOGIN_USER_CLICK_YN == false) {
					var strID;
					strID = "#frmLogin input[name='userID']";
					$(strID).val($.trim($(strID).val()));
					if ($(strID).val() == "") { // 아이디 입력 안됐을때
						alert("ID를 입력해 주세요.", function() {
							$(strID).focus();
						});
						return false;
					}

					strID = "#frmLogin input[name='userPW']";
					$(strID).val($.trim($(strID).val())).val();
					if ($(strID).val() == "") { // 비번 입력 안됐을때
						alert("비밀번호를 입력해 주세요.", function() {
							$(strID).focus();
						});
						return false;
					}

					LOGIN_USER_CLICK_YN = true;
					$.post("/user/login", $("#frmLogin").serialize(), function(p_data, p_status) {
						if (p_data.result == "Y") { // 로그인 했다면
							location.replace("/");
							
						} else if (p_data.result == "ID") {
							alert(p_data.message, function() {
								$("#frmLogin input[name='userID']").select().focus();
							});
							
						} else if (p_data.result == "PW") {
							alert(p_data.message, function() {
								$("#frmLogin input[name='userPW']").select().focus();
							});
							
						} else {
							alert(p_data.message, function() {
								$("#frmLogin input[name='userID']").select().focus();
							});
						}
						LOGIN_USER_CLICK_YN = false;
						
					}, "JSON").fail(function(jqXHR, textStatus, errorThrown){
						alert("네트워크 문제로 로그인 할 수 없습니다");
						LOGIN_USER_CLICK_YN = false;
					});
				}
			}
		</script>
		
		<jsp:directive.include file="page_footer.jsp"/>
	</body>
</html>