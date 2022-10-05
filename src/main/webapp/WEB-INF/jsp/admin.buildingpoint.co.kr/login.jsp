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
	</head>
	<body class="az-body">
		<div class="az-signin-wrapper">
			<div class="az-card-signin">
				<div style='display:flex; justify-content:center; margin-left:40px; margin-bottom:20px;'>
					<img src='/image/login_bg.png' style='height:100%'>
				</div>
				<div class="az-signin-header">
					<form id="frmLogin" action="">
						<div class="form-group">
							<label>아이디</label>
							<input name = "userID" id = "userID" type="text" class="form-control" placeholder="아이디를 입력해주세요" value="">
						</div><!-- form-group -->
						<div class="form-group">
							<label>비밀번호</label>
							<input name = "userPW" id = "userPW"type="password" class="form-control" placeholder="비밀번호를 입력해주세요" value="">
						</div><!-- form-group -->
					</form>
					<button class="btn btn-az-primary btn-block" onclick="loginUser()">로그인</button>
				</div><!-- az-signin-header -->
			</div><!-- az-card-signin -->
		</div><!-- az-signin-wrapper -->

		<script>
			$(document).ready(function() {
				$("#userID").keydown(function(event) {
					if (event.keyCode == 13) {
						$("input[name='userPW']").focus();
					}
				});
				$("#userPW").keydown(function(event) {
					if (event.keyCode == 13) {
						loginUser();
					}
				});
			});
			
			var LOGIN_USER_CLICK_YN = false;
			function loginUser() {
				if (LOGIN_USER_CLICK_YN == false) {
					var strID;
					strID = "#frmLogin input[name='userID']";
					$(strID).val($.trim($(strID).val()));
					if ($(strID).val() == "") { // 아이디 입력 안됐을때
						alert("ID를 입력해 주세요.");
						$(strID).focus();
						return false;
					}

					strID = "#frmLogin input[name='userPW']";
					$(strID).val($.trim($(strID).val())).val();
					if ($(strID).val() == "") { // 비번 입력 안됐을때
						alert("비밀번호를 입력해 주세요.")
						$(strID).focus();
						return false;
					}

					LOGIN_USER_CLICK_YN = true;
					$.post("/user/login", $("#frmLogin").serialize(), function(p_data, p_status) {
						if (p_data.result == "Y") { // 로그인 했다면
							location.replace("/");
							
						} else if (p_data.result == "ID") {
							alert(p_data.message);
							$("#frmLogin input[name='userID']").select().focus();
							
						} else if (p_data.result == "PW") {
							alert(p_data.message);
							$("#frmLogin input[name='userPW']").select().focus();
							
						} else {
							alert(p_data.message);
						}
						LOGIN_USER_CLICK_YN = false;
						
					}, "JSON").fail(function(a,b,c){
						alert("네트워크 문제로 로그인 되지 않았습니다");
						LOGIN_USER_CLICK_YN = false;
					});
				}
			}
		</script>
	</body>
</html>