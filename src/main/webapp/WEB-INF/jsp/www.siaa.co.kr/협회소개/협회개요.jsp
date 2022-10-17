<jsp:directive.page contentType="text/html;charset=UTF-8"/>

<div class="page_wrap menu_cd_1_1">
	<div class="img_bg bg1"></div>
	<div class="img_bg bg2"></div>
	<div class="img_bg bg3"></div>
	
	<div class="title_box">
		<div class="left_title">SLOGAN</div>
		<div class="right_title">SLOGAN</div>
	</div>
	
	<% for (int i = 1; i <= 3; i++) { %>
	<div class="content_box box<%= i %>">
		<div class="number">
			01
		</div>
		<div class="title">
			TITLE TITLE TITLE TITLE
		</div>
		<div class="sub_title">
			subtitle subtitle subtitle subtitle
		</div>
		<div class="content">
			국가는 노인과 청소년의 복지향상을 위한 정책을 실시할 의무를 진다.
			<br/>언론·출판에 대한 허가나 검열과 집회·결사에 대한 허가는 인정되지 아니한다.
			<br/>학교교육 및 평생교육을 포함한 교육제도와 그 운영, 교육재정 및 교원의 지위에 관한 기본적인 사항은 법률로 정한다.
			<br/>
			<br/>신체장애자 및 질병·노령 기타의 사유로 생활능력이 없는 국민은 법률이 정하는 바에 의하여 국가의 보호를 받는다.
			<br/>대통령은 제3항과 제4항의 사유를 지체없이 공포하여야 한다.
		</div>
	</div>
	<% } %>
</div>