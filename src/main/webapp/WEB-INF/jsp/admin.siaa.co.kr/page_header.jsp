<jsp:directive.page contentType="text/html;charset=UTF-8" />
<jsp:directive.page import="siaa.common.*"/>
<%
/***********************************************************************************
* Copyright (C)RFLOGIX since 2010.08.24 (rflogix@rflogix.com)
************************************************************************************
* ○ 파일	: page_header.jsp
* ● 설명	: 페이지 공통 header
***********************************************************************************/
%>
	<script>
	$(document).ready(function() {
		$.post("/user/login_user", "", function(p_data, p_status) {
			if (p_data.result == "Y") { // 로그인 했다면
				let clsLoginUser = p_data.clsLoginUser;
				$(".page_header .login_info .intro").html(clsLoginUser.userNM + " ("+clsLoginUser.userID+")님 환영합니다.");
				$("#LoginUserCD").val(clsLoginUser.userCD);
			}
			
		}, "JSON").fail(function(jqXHR, textStatus, errorThrown){
			console.log("jqXHR", jqXHR);
		});
		
		//showMenu(${main_menu_cd}, ${sub_menu_cd});
		showMenu(<%= request.getAttribute("main_menu_cd") %>, <%= request.getAttribute("sub_menu_cd") %>);
	});
	</script>
	
	<div class="page_header">
		<!-- 로고 -->
		<div class="logo">
			<img src="/image/logo_100.png" />
			<span>&nbsp;</span>
		</div>
		
		<!-- 로그인 정보 -->
		<div class="login_info">
		    <span class="intro"></span>
		    <a onclick="logoutUser();">
		    	로그아웃
		    </a>
		    <!-- <a onclick="openPopup_UserPW();">
		    	비번변경
		    </a> -->
		    <input id="LoginUserCD" type="hidden"/>
		</div>
		
		<!-- TOP 메뉴 -->
		<ul class="topmenu">
			<li class="main_menu menu_cd_0" onclick="selectMenu(0,0)">
				HOME
			</li>
			<li class="main_menu menu_cd_1" onclick="selectMenu(1,1)">
				사용자 관리
			</li>
			<li class="main_menu menu_cd_2" onclick="selectMenu(2,1)">
				게시판 관리
			</li>
			<li class="main_menu menu_cd_3" onclick="selectMenu(3,1)">
				페이지 관리
			</li>
		</ul>
	</div>
	
	<!-- LEFT 메뉴 -->
	<div class="page_left">
		<ul class="leftmenu main_menu menu_cd_1">
			<li class="level2 sub_menu menu_cd_1_1" onclick="selectMenu(1,1)">
				사용자 관리
			</li>
		</ul>
		<ul class="leftmenu main_menu menu_cd_2">
			<li class="level2 sub_menu menu_cd_2_1" onclick="selectMenu(2,1)">
				게시판 관리
			</li>
		</ul>
		<ul class="leftmenu main_menu menu_cd_3">
			<li class="level2 sub_menu menu_cd_3_1" onclick="selectMenu(3,1)">
				메인화면
			</li>
			<li class="level2 sub_menu menu_cd_3_2" onclick="selectMenu(3,2)">
				협회개요
			</li>
		</ul>
	</div>