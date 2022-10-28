<jsp:directive.page contentType="text/html;charset=UTF-8" />
<%
/***********************************************************************************
* Copyright (C)RFLOGIX since 2010.08.24 (rflogix@rflogix.com)
************************************************************************************
* ○ 파일	: page_header.jsp
* ● 설명	: 페이지 공통 header
***********************************************************************************/
%>
<header>
	<div class="header_top">
		<div class="top_wrap">
			<div class="logo" onclick="selectMenu(0,0)">
				<img src="/image/logo_50.png">
			</div>
			<div class="top_menu_wrap">
				<div class="main_menu menu_cd_1" onclick="selectMenu(1,1)">
					협회소개
				</div>
				<div class="sub_menu_wrap">
					<div class="sub_menu menu_cd_1_1" onclick="selectMenu(1,1)">
						협회개요
					</div>
					<div class="sub_menu menu_cd_1_2" onclick="selectMenu(1,2)">
						인사말
					</div>
					<div class="sub_menu menu_cd_1_3" onclick="selectMenu(1,3)">
						조직도
					</div>
					<div class="sub_menu menu_cd_1_4" onclick="selectMenu(1,4)">
						찾아오시는 길
					</div>
				</div>
			</div>
			<div class="top_menu_wrap">
				<div class="main_menu menu_cd_2" onclick="selectMenu(2,1)">
					주요사업
				</div>
				<div class="sub_menu_wrap">
					<div class="sub_menu menu_cd_2_1" onclick="selectMenu(2,1)">
						연대사업
					</div>
					<div class="sub_menu menu_cd_2_2" onclick="selectMenu(2,2)">
						협력업체
					</div>
				</div>
			</div>
			<div class="top_menu_wrap">
				<div class="main_menu menu_cd_3" onclick="selectMenu(3,1)">
					열림마당
				</div>
				<div class="sub_menu_wrap">
					<div class="sub_menu menu_cd_3_1" onclick="selectMenu(3,1)">
						공지사항
					</div>
					<div class="sub_menu menu_cd_3_2" onclick="selectMenu(3,2)">
						협회뉴스
					</div>
					<!-- <div class="sub_menu menu_cd_3_3" onclick="selectMenu(3,3)">
						협회행사일정
					</div> -->
				</div>
			</div>
			<div class="top_menu_wrap">
				<div class="main_menu menu_cd_4" onclick="selectMenu(4,1)">
					자료실
				</div>
				<div class="sub_menu_wrap">
					<div class="sub_menu menu_cd_4_1" onclick="selectMenu(4,1)">
						협회서식
					</div>
					<div class="sub_menu menu_cd_4_2" onclick="selectMenu(4,2)">
						증권법률
					</div>
				</div>
			</div>
			<div class="top_menu_wrap">
				<div class="main_menu menu_cd_5" onclick="selectMenu(5,1)">
					회원사마당
				</div>
				<div class="sub_menu_wrap">
					<div class="sub_menu menu_cd_5_1" onclick="selectMenu(5,1)">
						구인/구직
					</div>
					<div class="sub_menu menu_cd_5_2" onclick="selectMenu(5,2)">
						문의 및 제안
					</div>
				</div>
			</div>
			<div class="top_menu_btn flex">
				<i class="fas fa-bars"></i>
			</div>
		</div>
	</div>
	<div class="header_bot">
		<div class="bot_wrap">
			<div class="bot_title flex">
				협회소개
			</div>
			<div class="left_menu_wrap menu_cd_1">
				<div class="main_menu">협회소개</div>
				<div class="sub_menu_wrap">
					<div class="sub_menu menu_cd_1_1" onclick="selectMenu(1,1)">협회개요</div>
					<div class="sub_menu menu_cd_1_2" onclick="selectMenu(1,2)">인사말</div>
					<div class="sub_menu menu_cd_1_3" onclick="selectMenu(1,3)">조직도</div>
					<div class="sub_menu menu_cd_1_4" onclick="selectMenu(1,4)">찾아오시는 길</div>
				</div>
			</div>
			<div class="left_menu_wrap menu_cd_2">
				<div class="main_menu">주요사업</div>
				<div class="sub_menu_wrap">
					<div class="sub_menu menu_cd_2_1" onclick="selectMenu(2,1)">연대사업</div>
					<div class="sub_menu menu_cd_2_2" onclick="selectMenu(2,2)">협력업체</div>
				</div>
			</div>
			<div class="left_menu_wrap menu_cd_3">
				<div class="main_menu">열림마당</div>
				<div class="sub_menu_wrap">
					<div class="sub_menu menu_cd_3_1" onclick="selectMenu(3,1)">공지사항</div>
					<div class="sub_menu menu_cd_3_2" onclick="selectMenu(3,2)">협회뉴스</div>
					<!-- <div class="sub_menu menu_cd_3_3" onclick="selectMenu(3,3)">협회행사일정</div> -->
				</div>
			</div>
			<div class="left_menu_wrap menu_cd_4">
				<div class="main_menu">자료실</div>
				<div class="sub_menu_wrap">
					<div class="sub_menu menu_cd_4_1" onclick="selectMenu(4,1)">협회서식</div>
					<div class="sub_menu menu_cd_4_2" onclick="selectMenu(4,2)">증권법률</div>
				</div>
			</div>
			<div class="left_menu_wrap menu_cd_5">
				<div class="main_menu">회원사마당</div>
				<div class="sub_menu_wrap">
					<div class="sub_menu menu_cd_5_1" onclick="selectMenu(5,1)">구인/구직</div>
					<div class="sub_menu menu_cd_5_2" onclick="selectMenu(5,2)">문의 및 제안</div>
				</div>
			</div>
			<div class="left_menu_wrap menu_cd_9">
				<div class="main_menu">기타</div>
				<div class="sub_menu_wrap">
					<div class="sub_menu menu_cd_9_1" onclick="selectMenu(9,1)">온라인 변경신고</div>
					<div class="sub_menu menu_cd_9_2" onclick="selectMenu(9,2)">회원사 지원안내</div>
					<div class="sub_menu menu_cd_9_3" onclick="selectMenu(9,3)">등록/신고 업무안내</div>
					<div class="sub_menu menu_cd_9_4" onclick="selectMenu(9,4)">경력수첩 진위여부</div>
				</div>
			</div>
		</div>
	</div>
</header>