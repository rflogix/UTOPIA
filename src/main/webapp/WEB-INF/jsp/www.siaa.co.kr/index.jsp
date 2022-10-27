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
		
		<content>
			<div class="page_wrap menu_cd_0_0 select">
				<!-- 배너 -->
				<div class="main_banner swiper-container">
					<div class="swiper-wrapper">
						<% int main_banner_cnt = 3;
						for (int i = 0; i < main_banner_cnt; i++) { %>
						<div class="banner_wrap banner_<%= i %> swiper-slide">
							<div class="box">
								<div class="number">
									0<%= i+1 %>
								</div>
								<div class="title">
									해외주식형 펀드,
									<br/>2거래일간 873억원 순유
								</div>
								<div class="content">
									해외 주식형 펀드에 800억원 넘는 자금이 들어왔다. 18일 금융투자협회에 따르 면 지난 16일 기준 상장지수펀드(ETF)를 제외한 해외 주식형 펀드는 481억 ...
								</div>
								<div class="more">
									View More &gt;
								</div>
								<div class="page_wrap">
									<div class="prev" onclick="main_banner.slidePrev();">
										&lt;
									</div>
									<div class="page">
										<%= i + 1 %>
									</div>
									<div class="per">/</div>
									<div class="total">
										<%= main_banner_cnt %>
									</div>
									<div class="next" onclick="main_banner.slideNext();">
										&gt;
									</div>
								</div>
							</div>
						</div>
						<% } %>
					</div>
				</div>
				<script>
				let main_banner;
				$(document).ready(function() {	
					main_banner = new Swiper(".page_wrap.menu_cd_0_0 .main_banner", {
						loop: true,
						autoplay: {
							delay: 3000,
							pauseOnMouseEnter: true,
						},
					});
				});
				</script>
				
				<!-- 게시판 -->
				<div class="board_wrap">
					<div class="board_section">
					
					<div class="board notice">
						<div class="title">
							공지사항
						</div>
						<div class="more" onclick="selectMenu(3,1)"></div>
						<div class="content">
							<div class="title"></div>
							<div class="date"></div>
						</div>
					</div>
					
					<div class="board news">
						<div class="title">
							협회뉴스
						</div>
						<div class="more" onclick="selectMenu(3,2)"></div>
						<div class="content">
							<div class="title"></div>
							<div class="date"></div>
						</div>
					</div>
					</div>
					<div class="board_section">
					<div class="board incrut">
						<div class="title">
							구인/구직
						</div>
						<div class="more" onclick="selectMenu(5,1)"></div>
						<div class="content">
							<div class="title"></div>
							<div class="date"></div>
						</div>
					</div>
					
					<div class="board format">
						<div class="title">
							협회서식
						</div>
						<div class="more" onclick="selectMenu(4,1)"></div>
						<div class="content">
							<div class="title"></div>
							<div class="date"></div>
						</div>
					</div>
					
					</div>
				</div>
				
				<!-- 회원사 -->
				<div class="member_wrap">
					<div class="title">회원사</div>
					<div class="menu menu1" onclick="selectMenu(4,2)"></div><!-- 법령정보 = 증권법률 -->
					<div class="menu menu2" onclick="selectMenu(9,1)"></div><!-- 온라인 변경신고 -->
					<div class="menu menu3" onclick="selectMenu(9,2)"></div><!-- 회원사 지원안내 -->
					<div class="menu menu4" onclick="selectMenu(5,1)"></div><!-- 구인/구직 정보 -->
					<div class="menu menu5" onclick="selectMenu(9,3)"></div><!-- 등록/신고 업무안내 -->
					<div class="menu menu6" onclick="selectMenu(9,4)"></div><!-- 경력수첩 진위여부 -->
					<div class="menu menu7" onclick="selectMenu(4,1)"></div><!-- 서식자료실 = 협회서식 -->
				</div>
				
				<!-- 협력업체 -->
				<div class="collabo_title">협력업체</div>
				<div class="collabo_wrap">
				
				</div>
			</div>
			
			<!-- 협회소개 -->
			<jsp:directive.include file="협회소개/협회개요.jsp"/>
			<jsp:directive.include file="협회소개/인사말.jsp"/>
			<jsp:directive.include file="협회소개/조직도.jsp"/>
			<jsp:directive.include file="협회소개/찾아오시는길.jsp"/>
			
			<!-- 주요사업 -->
			<jsp:directive.include file="주요사업/연대사업.jsp"/>
			<jsp:directive.include file="주요사업/협력업체.jsp"/>
			
			<!-- 열림마당 -->
			<jsp:directive.include file="열림마당/공지사항.jsp"/>
			<jsp:directive.include file="열림마당/협회뉴스.jsp"/>
			<jsp:directive.include file="열림마당/협회행사일정.jsp"/>
			
			<!-- 자료실 -->
			<jsp:directive.include file="자료실/협회서식.jsp"/>
			<jsp:directive.include file="자료실/증권법률.jsp"/>
			
			<!-- 회원사마당 -->
			<jsp:directive.include file="회원사마당/구인구직.jsp"/>
			<jsp:directive.include file="회원사마당/문의및제안.jsp"/>
			
			<!-- 기타 -->
			<jsp:directive.include file="기타/온라인변경신고.jsp"/>
			<jsp:directive.include file="기타/회원사지원안내.jsp"/>
			<jsp:directive.include file="기타/등록신고업무안내.jsp"/>
			<jsp:directive.include file="기타/경력수첩진위여부.jsp"/>
		</content>
		
		<jsp:directive.include file="page_popup.jsp"/>
		<jsp:directive.include file="page_footer.jsp"/>
	</body>
</html>