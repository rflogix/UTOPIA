<jsp:directive.page contentType="text/html;charset=UTF-8" />

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
				제 목
			</div>
			<div class="content">
				<input name="titleHtml" readonly="readonly"/>
				<input name="titleText" type="hidden"/>
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
						<input name="writeDT" readonly="readonly"/>
					</div>
				</div>
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
							removePlugins: 'toolbar,resize,elementspath',
							readOnly: true,
					 	});
						//let editor = CKEDITOR.instances["contentEditor"];
						//editor.setReadOnly(true);
					} );
				</script>
			</div>
		</form>
		<!--
		<div class="popup_bot flex">
			<a class="button delete" onclick="deleteBoard();">
				<i class="far fa-trash-alt"></i>&nbsp;&nbsp;삭 제
			</a>
			<a class="button update" onclick="updateBoard();">
				<i class="fa fa-save"></i>&nbsp;&nbsp;저 장
			</a>
		</div>-->
	</div>
</div>

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