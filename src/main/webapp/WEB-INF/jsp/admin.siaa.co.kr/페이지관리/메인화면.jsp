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
		
		<link href="/css/페이지관리/메인화면.css<%= 리소스버젼 %>" rel="stylesheet" type="text/css"/>
	</head>
	<body>
		<jsp:directive.include file="../page_header.jsp"/>

		<div class="page_content">
			<div class="button btn_save" onclick="updatePage()">화면 내용 저장</div>
			
			<form class="page_wrap menu_cd_0_0">
				<div class="main_banner swiper-container">
					<div class="swiper-wrapper">
						<% int main_banner_cnt = 3;
						for (int i = 0; i < main_banner_cnt; i++) { %>
						<div class="banner_wrap banner_<%= i %> swiper-slide">
							
							<input class="bg_img" name=".page_wrap.menu_cd_0_0 .banner_wrap.banner_<%= i %>" />
							
							<div class="box">
								<div class="number">
									<textarea name=".page_wrap.menu_cd_0_0 .banner_<%= i %> .box .number"></textarea>
								</div>
								<div class="title">
									<textarea name=".page_wrap.menu_cd_0_0 .banner_<%= i %> .box .title"></textarea>
								</div>
								<div class="content">
									<textarea name=".page_wrap.menu_cd_0_0 .banner_<%= i %> .box .content"></textarea>
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
						//autoplay: {
						//	delay: 5000,
						//	pauseOnMouseEnter: true,
						//},
					});
				});
				</script>
			</form>
		</div>
		
		<script>
		$(document).ready(function() {
			// 페이지 세팅
			let param = {
				pageURL: '/www.siaa.co.kr/index',
				selectorNM_like: '.page_wrap.menu_cd_0_0',
			};
			$.post('/page/setting', param, function(p_data, p_status) {
				if (p_data.result == 'Y') {
					for (let i = 0; i < p_data.list.length; i++) {
						let clsPage = p_data.list[i];
						if (clsPage.contentType == 'HTML') {
							$(clsPage.selectorNM + ' textarea').text(clsPage.contentValue);
							
						} else if (clsPage.contentType == 'BG_IMG') {
							$(clsPage.selectorNM).css('background-image', 'url('+clsPage.contentValue+')');
							$(clsPage.selectorNM + ' input.bg_img').val(clsPage.contentValue);
						}
					}
				}
				
			}, 'JSON').fail(function(jqXHR, textStatus, errorThrown){
				//
			});
			
		});
		

		// 수정
		var PAGE_UPDATE_YN = false;
		function updatePage() {
			if (PAGE_UPDATE_YN == false) {
				confirm('저장 하시겠습니까?', function() {
					PAGE_UPDATE_YN = true;
					
					openPopup('loading');
					
					let param = {
						pageURL: '/www.siaa.co.kr/index',
						selectorNM_like: '.page_wrap.menu_cd_0_0',
					};
					$.post('/page/delete', param, function(data) { // 먼저 페이지에 관한 설정들 삭제 후
						// 삭제를 먼저 진행하나, 결과는 중요하지 않아서 pass
						let param = $('.page_content form').serialize()
							+ '&pageURL=/www.siaa.co.kr/index'
							+ '&bgImgSelectorNM=.page_wrap.menu_cd_0_0 .banner_wrap.banner_'
							;
						$.post('/page/update', param, function(data) { // 업데이트
							if (data.result == 'Y') {
								alert('저장되었습니다.');
								
							} else { // 오류라면
								alert(data.message);
							}
							
							PAGE_UPDATE_YN = false;
							closePopup('loading');
							
						},'JSON').fail(function(jqXHR, textStatus, errorThrown){
							alert('네트워크 문제로 저장되지 않았습니다');
							
							PAGE_UPDATE_YN = false;
							closePopup('loading');
						});
						
					},'JSON').fail(function(jqXHR, textStatus, errorThrown){
						alert('네트워크 문제로 저장되지 않았습니다');
						
						PAGE_UPDATE_YN = false;
						closePopup('loading');
					});
				});
				
			} else {
				alert('저장중 입니다.');
			}
		}
		</script>
		
		
		<jsp:directive.include file="../page_footer.jsp"/>
	</body>
</html>