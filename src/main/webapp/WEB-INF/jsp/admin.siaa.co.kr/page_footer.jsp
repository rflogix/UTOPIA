<jsp:directive.page contentType="text/html;charset=UTF-8" />
<%
/***********************************************************************************
* Copyright (C)RFLOGIX since 2010.08.24 (rflogix@rflogix.com)
************************************************************************************
* ○ 파일	: page_footer.jsp
* ● 설명	: 페이지 공통 footer
***********************************************************************************/
%>
<footer>
	<%-- 로딩 팝업 --%>
	<div class="popup_loading popup_bg">
		<div id="loader">
			<div id="shadow"></div>
			<div id="box"></div>
		</div>
		<div class="loading_text"></div>
	</div>
	
	<%-- alert 팝업 --%>
	<div class="popup_alert popup_bg">
		<div class="content_wrap">
			<div class="content"></div>
			<button class="btn_close" type="button"></button>
		</div>
	</div>
	
	<%-- confirm 팝업 --%>
	<div class="popup_confirm popup_bg">
		<div class="content_wrap">
			<div class="content"></div>
			<div class="btn_wrap">
				<button class="btn_close" type="button"></button>
				<button class="btn_ok" type="button"></button>
			</div>
		</div>
	</div>
</footer>