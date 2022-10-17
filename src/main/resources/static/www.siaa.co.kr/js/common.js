/***********************************************************************************
* Copyright (C)RFLOGIX since 2010.08.24 (rflogix@rflogix.com)
************************************************************************************
* ● 프로젝트	: 크로닉-관리자
* ○ 파일		: common.js
* ○ 생성		: 2014.12.15(월요일)
* ○ 최종변경	: 2015.06.10(수요일)
************************************************************************************/




/***********************************************************************************
* 상수
***********************************************************************************/

var CHAT_PORT = location.protocol === 'https:' ? 3001 : 3000;
var CHAT_SERVER_URL = "//chat.chronickor.com:"+CHAT_PORT;




/***********************************************************************************
* 화면
***********************************************************************************/

$(document).ready(function() {
	// 페이지 세팅
	let param = {
		pageURL: "/www.siaa.co.kr/index",
	};
	$.post("/page/setting", param, function(p_data, p_status) {
		if (p_data.result == "Y") {
			for (let i = 0; i < p_data.list.length; i++) {
				let clsPage = p_data.list[i];
				if (clsPage.contentType == "HTML") {
					$(clsPage.selectorNM).html(clsPage.contentValue);
				}
			}
		}
		
	}, "JSON").fail(function(jqXHR, textStatus, errorThrown){
		//
	});
	
	// ESC 처리
	$(document).keyup(function(e) {
		if (e.keyCode == 27) { // ESC
			if ($(".popup_wrap.active").length > 0) {
				if (($(".popup_alert").hasClass("active") == false) && ($(".popup_confirm").hasClass("active") == false) && ($(".popup_loading").hasClass("active") == false)) {
					closePopup($(".popup_wrap.active"));
				}
			}
		}
	});
	
	// 검색조건 엔터처리
	$(".search_param input").keypress(function(e) {
		if (e.keyCode == 13) { // 엔터키
			clickSearch();
		}
	});
	
	// datepicker 세팅
	if ($(".ui_datepicker").length > 0) {
		$(".ui_datepicker").datepicker();
	}
	
	// 이미지 드래그앤 드롭 세팅
	var img_obj;
	if ($(".IMG_SHOW_WRAP").length > 0) {
		$(".IMG_WRAP").on("selectstart", function(event){ return false; });
		$(".IMG_SHOW_WRAP").on("selectstart", function(event){ return false; });
		$(".IMG_SHOW_WRAP .IMG_SHOW").on("selectstart", function(event){ return false; });
		
		img_obj = $(".IMG_SHOW_WRAP");
		img_obj.on("dragenter", function (e) {
			e.stopPropagation();
			e.preventDefault();
			$(this).addClass("dragover");
		});
		img_obj.on("dragover", function (e) {
			 e.stopPropagation();
			 e.preventDefault();
			 $(this).addClass("dragover");
		});
		img_obj.on("dragleave", function (e) {
			 e.stopPropagation();
			 e.preventDefault();
			 $(this).removeClass("dragover");
		});
		img_obj.on("drop", function (e) {
			$(this).removeClass("dragover");
			 e.preventDefault();
			 var files = e.originalEvent.dataTransfer.files;
			 dropImage(files, this);
		});
		$(document).on("dragenter", function (e) {
			e.stopPropagation();
			e.preventDefault();
		});
		$(document).on("dragover", function (e) {
			e.stopPropagation();
			e.preventDefault();
			img_obj.removeClass("dragover");
		});
		$(document).on("drop", function (e) {
			e.stopPropagation();
			e.preventDefault();
		});
	}
});
$.fn.hasAttr = function(name) {  
	return this.attr(name) !== undefined;
};
$.fn.scrollToMe = function (p_margin_top, p_parent, p_delay) {
	var element = $(this);
	var blnCheck = true;
	
	if (p_parent == undefined) { // 부모객체 안정해졌다면 부모들중 overflow-y:auto 인것을 부모로 설정
		if ($(element).parent().length > 0) {
			element = $(element).parent();
			if ($(element).css("overflow-y") == "auto") {
				p_parent = $(element);
			} else {
				while ($(element).css("overflow-y") != "auto") {
					if ($(element).parent().length > 0) {
						element = $(element).parent();
					} else {
						blnCheck = false;
						break;
					}
				}
				if (blnCheck) {
					p_parent = $(element);
				}
			}
		} else {
			blnCheck = false;
		}
	}
	if (p_margin_top == undefined) {
		p_margin_top = -($(p_parent).height() / 2);
	} else {
		p_margin_top = -1 * p_margin_top;
	}
	if (p_delay == undefined) {
		p_delay = 300;
	}
	if (blnCheck) {
		element = $(this);
		var position_y = $(element).position().top + $(p_parent).scrollTop();
		while ($(element).get(0) != $(p_parent).get(0)) {
			if ($(element).parent().length > 0) {
				position_y += $(element).position().top + Number($(element).css("margin-top").replace("px", ""));
				element = $(element).parent();
			} else {
				blnCheck = false;
				break;
			}
		}
		if (blnCheck) {
			position_y += p_margin_top;
			$(p_parent).stop().animate({scrollTop: position_y}, p_delay);
		}
	}
};



//사용자 로그아웃
function logoutUser() {
	if (confirm("로그아웃 하시겠습니까?", function() {
		$.post("/user/logout", "", function(p_data, p_status) {
			if (p_data.result == "Y") { // 로그아웃 했다면
				location.replace("/");
				
			} else {
				alert(p_data.message);
			}
			
		}, "JSON").fail(function(jqXHR, textStatus, errorThrown){
			alert("네트워크 문제로 로그아웃 되지 않았습니다");
		});
	}));
}

// 메뉴 클릭
let BOARD_TYPE = "";
let MAIN_MENU_CD = "";
let SUB_MENU_CD = "";

function selectMenu(main_menu_cd, sub_menu_cd) {
	MAIN_MENU_CD = main_menu_cd;
	SUB_MENU_CD = sub_menu_cd;
	
	$(".header_top .main_menu").removeClass("select");
	$(".header_top .main_menu.menu_cd_"+main_menu_cd).addClass("select");
	$(".header_top .sub_menu").removeClass("select");
	let sub_menu = $(".header_top .sub_menu.menu_cd_"+main_menu_cd+"_"+sub_menu_cd);
	sub_menu.addClass("select");
	
	$(".header_bot .bot_title").text(sub_menu.text());
	$(".header_bot .left_menu_wrap").removeClass("select");
	$(".header_bot .left_menu_wrap.menu_cd_"+main_menu_cd).addClass("select");
	$(".header_bot .sub_menu").removeClass("select");
	$(".header_bot .sub_menu.menu_cd_"+main_menu_cd+"_"+sub_menu_cd).addClass("select");
	
	$(".page_wrap").removeClass("select");
	$(".page_wrap.menu_cd_"+main_menu_cd+"_"+sub_menu_cd).addClass("select");
	
	if ((main_menu_cd == 0) && (sub_menu_cd == 0)) {
		$("header .header_bot").css("display", "none");
	} else {
		$("header .header_bot").css("display", "inline-block");
		
		if ((main_menu_cd == 2) && (sub_menu_cd == 1)) { // 주요사업 - 연대사업
			BOARD_TYPE = "연대사업";
			
		} else if ((main_menu_cd == 3) && (sub_menu_cd == 1)) { // 열림마당 - 공지사항
			BOARD_TYPE = "공지사항";
			
		} else if ((main_menu_cd == 3) && (sub_menu_cd == 2)) { // 열림마당 - 협회뉴스
			BOARD_TYPE = "협회뉴스";
			
		} else if ((main_menu_cd == 4) && (sub_menu_cd == 1)) { // 자료실 - 협회서식
			BOARD_TYPE = "협회서식";
			
		} else if ((main_menu_cd == 4) && (sub_menu_cd == 2)) { // 자료실 - 증권법률
			BOARD_TYPE = "증권법률";
			
		} else if ((main_menu_cd == 5) && (sub_menu_cd == 1)) { // 회원사마당 - 구인/구직
			BOARD_TYPE = "구인/구직";
			
		} else if ((main_menu_cd == 5) && (sub_menu_cd == 2)) { // 회원사마당 - 문의 및 제안
			BOARD_TYPE = "문의 및 제안";
			
		} else {
			BOARD_TYPE = "";
		}
		if (BOARD_TYPE != "") {
			if ($(".page_wrap.menu_cd_"+main_menu_cd+"_"+sub_menu_cd).hasClass("already") == false) {
				$(".page_wrap.menu_cd_"+main_menu_cd+"_"+sub_menu_cd).addClass("already"); // 이미 열어봤다는 태그
				searchBoard();
			}
		}
	}
	
	// display:none 일때 실행되면 지도 렌더링 문제생기므로 화면 뜰때 그려준다
	if ((main_menu_cd == 1) && (sub_menu_cd == 4)) {
		if (kakaoMap_map == null) {
			kakaoMap_map = new kakao.maps.Map(kakaoMap_container, kakaoMap_options); // 지도그리기
			
			var kakaoMap_zoomControl = new kakao.maps.ZoomControl();
			kakaoMap_map.addControl(kakaoMap_zoomControl, kakao.maps.ControlPosition.RIGHT); // 줌컨트럴
			
			var kakaoMap_marker = new kakao.maps.Marker({
				position: kakaoMap_position
			});
			kakaoMap_marker.setMap(kakaoMap_map); // 마커
		}
	}
}

// 사업자 정보 보기 팝업
function openPopup_CompanyInfo(company_no) {
	window.open("http://www.ftc.go.kr/bizCommPop.do?wrkr_no="+company_no, "bizCommPop", "width=750, height=700;");
}






















/***********************************************************************************
* 포멧 관련
***********************************************************************************/

// 알파벳만 빼고 지우기
function onlyAlphabet(ele) {
	ele.value = $(ele).val().replace(/[^\!-Z]/gi,"");
}

// 3자리마다 콤마(화폐표시)
function formatMoney(p_param) {
	var strFormat = p_param.toString();
	var minus = strFormat.substr(0,1);
	strFormat = strFormat.replace(/[^\.0-9]/g,""); // 점과 숫자가 아닌것을 제거  /\D/g /[^-\.0-9]/g
	strFormat = strFormat.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 콤마    /(^[+-]?\d+)(\d{3})/g /\B(?=(\d{3})+(?!\d))/g
	if (minus == "-") {strFormat = "-"+strFormat;}
	return strFormat;
}

// 사업자번호
function formatCompanyNO(p_param) { 
	var strFormat = p_param.toString();
	strFormat = strFormat.replace(/[^0-9]/g,'');
	strFormat = strFormat.substr(0,10);
	if (strFormat.length <= 4) {
		strFormat = strFormat.replace(/([0-9]{3})([0-9]{1}$)/,"$1-$2");
	} else if (strFormat.length <= 5) {
		strFormat = strFormat.replace(/([0-9]{3})([0-9]{2}$)/,"$1-$2");
	} else if (strFormat.length <= 6) {
		strFormat = strFormat.replace(/([0-9]{3})([0-9]{2})([0-9]{1}$)/,"$1-$2-$3");
	} else if (strFormat.length <= 7) {
		strFormat = strFormat.replace(/([0-9]{3})([0-9]{2})([0-9]{2}$)/,"$1-$2-$3");
	} else if (strFormat.length <= 8) {
		strFormat = strFormat.replace(/([0-9]{3})([0-9]{2})([0-9]{3}$)/,"$1-$2-$3");
	} else if (strFormat.length <= 9) {
		strFormat = strFormat.replace(/([0-9]{3})([0-9]{2})([0-9]{4}$)/,"$1-$2-$3");
	} else {
		strFormat = strFormat.replace(/([0-9]{3})([0-9]{2})([0-9]{5}$)/,"$1-$2-$3");
	}
	return strFormat;
}

// 날짜
function formatDate(p_param) { 
	var strFormat = p_param.toString();
	strFormat = strFormat.replace(/[^0-9]/g,'');
	strFormat = strFormat.substr(0,8);
	if (strFormat.length <= 3) {
		strFormat = strFormat.replace(/([0-9]{2})([0-9]{1}$)/,"$1-$2");
	} else if (strFormat.length <= 4) {
		strFormat = strFormat.replace(/([0-9]{2})([0-9]{2}$)/,"$1-$2");
	} else if (strFormat.length <= 5) {
		strFormat = strFormat.replace(/([0-9]{4})([0-9]{1}$)/,"$1-$2");
	} else if (strFormat.length <= 6) {
		strFormat = strFormat.replace(/([0-9]{4})([0-9]{2}$)/,"$1-$2");
	} else if (strFormat.length <= 7) {
		strFormat = strFormat.replace(/([0-9]{4})([0-9]{2})([0-9]{1}$)/,"$1-$2-$3");
	} else {
		strFormat = strFormat.replace(/([0-9]{4})([0-9]{2})([0-9]{2}$)/,"$1-$2-$3");
	}
	return strFormat;
}

// 전화번호
function formatTel(p_param) { 
	var strFormat = p_param.toString();
	strFormat = strFormat.replace(/[^0-9]/g,'');
	strFormat = strFormat.substr(0,12);
	var strLeft = strFormat.substring(0,2); // 서울국번 기본체크
	var CellPhone = "010,011,012,015,016,017,018,019";
	var LocalPhone = "02,03,04,05,06";
	if (strFormat.length <= 3) {
		if (strLeft == "02") { // 서울체크
			strFormat = strFormat.replace(/([0-9]{2})([0-9]{1}$)/,"$1-$2");
		} else {
			strFormat = strFormat.replace(/([0-9]{3})/,"$1");
		}
	} else if (strFormat.length <= 4) {
		if (strLeft == "02") { // 서울체크
			strFormat = strFormat.replace(/([0-9]{2})([0-9]{2}$)/,"$1-$2");
		} else {
			strFormat = strFormat.replace(/([0-9]{3})([0-9]{1}$)/,"$1-$2");
		}
	} else if (strFormat.length <= 5) {
		if (strLeft == "02") { // 서울체크
			strFormat = strFormat.replace(/([0-9]{2})([0-9]{3}$)/,"$1-$2");
		} else {
			strFormat = strFormat.replace(/([0-9]{3})([0-9]{2}$)/,"$1-$2");
		}
	} else if (strFormat.length <= 6) {
		if (strLeft == "02") { // 서울체크
			strFormat = strFormat.replace(/([0-9]{2})([0-9]{3})([0-9]{1}$)/,"$1-$2-$3");
		} else {
			strFormat = strFormat.replace(/([0-9]{3})([0-9]{3}$)/,"$1-$2");
		}
	} else if (strFormat.length <= 7) {
		if (strLeft == "02") { // 서울체크
			strFormat = strFormat.replace(/([0-9]{2})([0-9]{3})([0-9]{2}$)/,"$1-$2-$3");
		} else {
			strFormat = strFormat.replace(/([0-9]{3})([0-9]{4}$)/,"$1-$2");
		}
	} else if (strFormat.length <= 8) {
		if (strLeft == "02") { // 서울체크
			strFormat = strFormat.replace(/([0-9]{2})([0-9]{3})([0-9]{3}$)/,"$1-$2-$3");
		} else if (LocalPhone.indexOf(strLeft) > -1) { // 지방번호체크
			strFormat = strFormat.replace(/([0-9]{3})([0-9]{4})([0-9]{1}$)/,"$1-$2-$3"); // 없는번호-중간단계
		} else {
			strLeft = strFormat.substring(0,3);
			if (CellPhone.indexOf(strLeft) > -1) { // 핸드폰 체크
				strFormat = strFormat.replace(/([0-9]{3})([0-9]{4})([0-9]{1}$)/,"$1-$2-$3"); // 없는번호-중간단계
			} else {
				strFormat = strFormat.replace(/([0-9]{4})([0-9]{4}$)/,"$1-$2"); // 가능번호 (국번없이 적었다면)
			}
		}
	} else if (strFormat.length <= 9) {
		if (strLeft == "02") { // 서울체크
			strFormat = strFormat.replace(/([0-9]{2})([0-9]{3})([0-9]{4}$)/,"$1-$2-$3"); // 가능번호
		} else {
			strFormat = strFormat.replace(/([0-9]{3})([0-9]{4})([0-9]{2}$)/,"$1-$2-$3"); // 없는번호-중간단계
		}
	} else if (strFormat.length <= 10) {
		if (strLeft == "02") { // 서울체크
			strFormat = strFormat.replace(/([0-9]{2})([0-9]{4})([0-9]{4}$)/,"$1-$2-$3"); // 가능번호
		} else {
			strFormat = strFormat.replace(/([0-9]{3})([0-9]{3})([0-9]{4}$)/,"$1-$2-$3"); // 가능번호
		}
	} else if (strFormat.length <= 11) {
		strFormat = strFormat.replace(/([0-9]{3})([0-9]{4})([0-9]{4}$)/,"$1-$2-$3");
	} else {
		strFormat = strFormat.replace(/([0-9]{4})([0-9]{4})([0-9]{4}$)/,"$1-$2-$3");
	}
	return strFormat;
}

function removeHTML(text) {
	text = text.replace(/<br\/>/ig, "\n");
	return text.replace(/<[^>]*>?/g, "");
}




/***********************************************************************************
* 외부 팝업창 관련
***********************************************************************************/
function openWindow(p_URL, p_WindowName, p_Width, p_Height, p_Param) {
	if ((!p_WindowName) || (p_WindowName == "")) {
		p_WindowName = new String(Math.round(Math.random() * 100000));
	}
	if (!p_Width) {
		p_Width = 1060;
	}
	if (!p_Height) {
		p_Height = 500;
	}
	if (!p_Param) {
		p_Param = "fix";
	}
	
	var x = p_Width;
	var y = p_Height;
	var sy = window.screen.height / 2 - y / 2 - 70;
	
	if (p_Param == 'fix') {
		p_Param = "toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=0";
		sy = window.screen.height / 2 - y / 2 - 40;
	} else { //if (p_Param == 'resize') {
		p_Param = "toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=1";
		sy = window.screen.height / 2 - y / 2 - 40;
	}
	var sx = window.screen.width  / 2 - x / 2;
	if (sy < 0 ) {
		sy = 0;
	}
	var sz = ",top=" + sy + ",left=" + sx;
	p_Param = p_Param + ",width=" + x + ",height=" + y + sz;
	
	var objNewWin = window.open(p_URL, p_WindowName, p_Param);
	objNewWin.focus();
}




/***********************************************************************************
* 내부 팝업창 관련
***********************************************************************************/

// 내부 팝업창 열기 (ex. openPopup("board"); openPopup("user", "userNM"); )
function openPopup(p_class, p_param) {
	//if ($(".popup_"+p_class).hasClass("animate") == false) {
		var blnCheck = true;
		var queDelay = 0;
		var queFunction = function() {$(this).dequeue();};
		if (p_class == "image") { // 이미지 팝업창일때
			if (p_param) {
				window.open(p_param);//"image_popup.jsp"+"?url="+p_param);
			}
			blnCheck = false;
			
		} else if (p_class == "user") { // 사용자 팝업이라면
			queFunction = focusPopupByName(p_class, "userNM");
			
		} else if (p_class == "board") { // 게시물 팝업이라면
			//queFunction = focusPopupByName(p_class, "titleHtml");
			
		} else if (p_class == "login") { // 로그인 팝업이라면
			queDelay = 200;
			queFunction = focusPopupByName(p_class, "userID");
			
		} else if (p_class == "alert") { // 알림 팝업이라면
			queFunction = focusPopupByClass(p_class, "btn_close");
			
		} else if (p_class == "confirm") { // 컨펌 팝업이라면
			queFunction = focusPopupByClass(p_class, "btn_ok");
		}
		if (blnCheck) {
			$(".popup_"+p_class).addClass("animate").css("display", "flex").delay(0).queue(function(){$(this).addClass("active").dequeue();}).delay(queDelay).queue(queFunction).delay(300).queue(function(){$(this).removeClass("animate").dequeue();});
		}
		
	//}
}
function focusPopupByName(p_class, p_InputName) {
	return function(){$(`.popup_${p_class} [name=${p_InputName}]`).select().focus(); $(this).dequeue();}
}
function focusPopupByClass(p_class, p_ClassName) {
	return function(){$(`.popup_${p_class} .${p_ClassName}`).select().focus(); $(this).dequeue();}
}

// 내부 팝업창 닫기
function closePopup(p_obj, p_param) {
	if (jQuery.type(p_obj) === "string") {
		p_obj = $(".popup_"+p_obj);
	}
	var blnCheck = true;
	var element = $(p_obj);
	while (($(element).hasClass("popup_bg") == false) && ($(element).get(0).tagName != "BODY")) {
		element = $(element).parent();
	}
	if ($(element).hasClass("popup_bg")) {
		if ($(element).hasClass("popup_receipt")) {
			//if ($("#THIS_PAGE_NM").val() == "receipt_summary.jsp") {
			//	clickSearch();
			//}
		} else if ($(element).hasClass("popup_image_upload")) { // 이미지 업로드 팝업이라면
			if ($(element).find(".img_list.active").length > 0) {
				blnCheck = false;
				confirm("선택된 이미지가 총 "+ $(element).find(".img_list.active").length +"개 있습니다.<br/>화면을 닫으시겠습니까 ?","화면닫기","아니요", function(){
					$(element).addClass("animate").removeClass("active").delay(300).css("display", "none").removeClass("animate");
				});
			}
		} else if($(element).hasClass("popup_auth")){
			document.getElementById("MINI_CAL").style.display = "none";
		}
		
	} else {
		blnCheck = false;
	}
	if (blnCheck) {
		$(element).addClass("animate").removeClass("active").delay(300).queue(function(){$(this).css("display", "none").removeClass("animate").dequeue();});
	}
}

// 로딩 팝업
var popup_loading_int = null;
var popup_loading_yn = false;
function openPopup_loading() {
	popup_loading_yn = true;
	$(".popup_loading").addClass("active").addClass("show");
}
function closePopup_loading() {
	$(".popup_loading").removeClass("show");
	clearInterval(popup_loading_int);
	popup_loading_int = setInterval(function(){
		if (popup_loading_yn == true) {
			popup_loading_yn = false;
			clearInterval(popup_loading_int);
			popup_loading_int=null;
			$(".popup_loading").removeClass("active");
		} else {
			clearInterval(popup_loading_int);
		}
	}, 300);
}

// 이미지
function openPopup_image(p_ImageURL, p_this) {
	var strImage = "";
	if (p_ImageURL) {
		if (p_ImageURL != "") {
			strImage = p_ImageURL;
		}
	} else {
		if ($(p_this).attr("data-image").length > 0) {
			strImage = $(p_this).attr("data-image");
		}
	}
	if (strImage != "") {
		openPopup_loading();
		$(".popup_bg.image .popup_content img").attr("src", $(p_this).attr("data-image"));
		$(".popup_bg.image").showElement();
		closePopup_loading();
	}
		
}
function closePopup_image() {
	$(".popup_bg.image").hideElement();
}

// 비번변경
function openPopup_UserPW() {
	$(".popup_userpw .UserPW").val("");
	$(".popup_userpw .UserPW_Check").val("");
	openPopup("userpw");
	$(".popup_userpw .UserPW").focus();
}
function closePopup_UserPW() {
	closePopup("userpw");
}




/***********************************************************************************
* Alert 오버라이딩
***********************************************************************************/

var _alert_new;
function alert(p_content, p_ok, p_ok_function) {
	_alert_new = new _objAlert(p_content, p_ok, p_ok_function);
}
var _objAlert = function(p_content, p_ok, p_ok_function) {
	this.ok_function = function(){};
	
	// 내용 text 설정
	if (p_content) {
		$(".popup_alert .content").html(p_content);
	}
	
	// OK버튼 text 설정
	var strClose = "확인";
	if (p_ok) {
		if (typeof p_ok === "string") {
			strClose = p_ok;
			
		} else if (typeof p_ok === "function") {
			p_ok_function = p_ok;
		}
	}
	$(".popup_alert .btn_close").html(strClose);
	
	// OK function 설정
	if (p_ok_function) {
		this.ok_function = p_ok_function;
	}
	
	openPopup("alert");
	
	this.onClick = function() {
		closePopup("alert");
		this.ok_function();
	};
};
let _alert_keypress_yn = false;
$(document).ready(function() {
	$(".popup_alert .btn_close").click(function(e) {
		e.preventDefault(); e.stopPropagation();
		_alert_new.onClick();
		
	}).keydown(function(e) {
		if ((e.keyCode == 27) || (e.keyCode == 13) || (e.keyCode == 32)) { // ESC(27) or 엔터(13) or 스페이스바(32)
			e.preventDefault(); e.stopPropagation();
			_alert_keypress_yn = true;
		}
		
	}).keyup(function(e) {
		if ((e.keyCode == 27) || (e.keyCode == 13) || (e.keyCode == 32)) { // ESC(27) or 엔터(13) or 스페이스바(32)
			e.preventDefault(); e.stopPropagation();
			if (_alert_keypress_yn == true) {
				_alert_new.onClick();
			}
			_alert_keypress_yn = false;
		}
	});
});

var alert_int = null;
var alert_close = false;
function openPopup_alert(p_content) {
	$(".popup_alert .alert_content").html(p_content);
	$(".popup_alert").addClass("active").addClass("show");
}
function closePopup_alert() {
	$(".popup_alert").removeClass("show")
	setTimeout(function(){$(".popup_alert").removeClass("active");}, 300);
	alert_close = true;
}




/***********************************************************************************
* Confirm 오버라이딩
***********************************************************************************/

var _confirm_new;
function confirm(p_content, p_ok, p_close, p_ok_function, p_close_function) {
	_confirm_new = new _objConfirm(p_content, p_ok, p_close, p_ok_function, p_close_function);
}
var _objConfirm = function(p_content, p_ok, p_close, p_ok_function, p_close_function) {
	this.ok_function = function(){};
	this.ok_function_SetYN = false;
	this.close_function = function(){};
	this.close_function_SetYN = false;
	
	// 내용 text 설정
	if (p_content) {
		$(".popup_confirm .content").html(p_content);
	}
	
	// OK버튼 text 설정
	var strOK = "확인";
	if (p_ok) {
		if (typeof p_ok === "string") {
			strOK = p_ok;
			
		} else if (typeof p_ok === "function") {
			this.ok_function = p_ok;
			this.ok_function_SetYN = true;
		}
	}
	$(".popup_confirm .btn_ok").html(strOK);
	
	// CLOSE버튼 text 설정
	var strClose = "취소";
	if (p_close) {
		if (typeof p_close === "string") {
			strClose = p_close;
			
		} else if (typeof p_close === "function") {
			if (this.ok_function_SetYN) {
				this.close_function = p_close;
				this.close_function_SetYN = true;
				
			} else {
				this.ok_function = p_close;
				this.ok_function_SetYN = true;
			}
		}
	}
	$(".popup_confirm .btn_close").html(strClose);
	
	// OK function 설정
	if (p_ok_function) {
		if (typeof p_ok_function === "function") {
			if (this.ok_function_SetYN) {
				this.close_function = p_ok_function;
				this.close_function_SetYN = true;
				
			} else {
				this.ok_function = p_ok_function;
				this.ok_function_SetYN = true;
			}
		}
	}
	
	// CLOSE function 설정
	if (p_close_function) {
		if (typeof p_close_function === "function") {
			this.close_function = p_close_function;
		}
	}
	
	openPopup("confirm");
	
	this.onOK = function() {
		closePopup("confirm");
		this.ok_function();
	};
	
	this.onClose = function() {
		closePopup("confirm");
		this.close_function();
	};
};
let _confirm_keypress_yn = false;
$(document).ready(function() {
	$(".popup_confirm .btn_close").click(function(e) {
		e.preventDefault(); e.stopPropagation();
		_confirm_new.onClose();
		
	}).keydown(function(e) {
		if ((e.keyCode == 27) || (e.keyCode == 13) || (e.keyCode == 32)) { // ESC(27) or 엔터(13) or 스페이스바(32)
			e.preventDefault(); e.stopPropagation();
			_confirm_keypress_yn = true;
		}
		
	}).keyup(function(e) {
		if ((e.keyCode == 27) || (e.keyCode == 13) || (e.keyCode == 32)) { // ESC(27) or 엔터(13) or 스페이스바(32)
			e.preventDefault(); e.stopPropagation();
			if (_confirm_keypress_yn == true) {
				_confirm_new.onClose();
			}
			_confirm_keypress_yn = false;
		}
	});
	$(".popup_confirm .btn_ok").on("click", function(e) {
		e.preventDefault(); e.stopPropagation();
		_confirm_new.onOK();
		
	}).keydown(function(e) {
		if ((e.keyCode == 27) || (e.keyCode == 13) || (e.keyCode == 32)) { // ESC(27) or 엔터(13) or 스페이스바(32)
			e.preventDefault(); e.stopPropagation();
			_confirm_keypress_yn = true;
		}
		
	}).keyup(function(e) {
		if ((e.keyCode == 13) || (e.keyCode == 32)) { // 엔터(13) or 스페이스바(32)
			e.preventDefault(); e.stopPropagation();
			if (_confirm_keypress_yn == true) {
				_confirm_new.onOK();
			}
			_confirm_keypress_yn = false;
			
		} else if (e.keyCode == 27) { // ESC(27)
			e.preventDefault(); e.stopPropagation();
			if (_confirm_keypress_yn == true) {
				_confirm_new.onClose();
			}
			_confirm_keypress_yn = false;
		}
	});
});

// Confirm 관련
var confirm_int = null;
var confirm_ok = false, confirm_close = false;
function openPopup_confirm(p_content, p_cancel, p_ok) {
	$(".popup_confirm .confirm_content").html(p_content);
	$(".popup_confirm .btn_close").html(p_cancel);
	$(".popup_confirm .btn_ok").html(p_ok);
	$(".popup_confirm").addClass("active").addClass("show");
}
function closePopup_confirm() {
	$(".popup_confirm").removeClass("show")
	setTimeout(function(){$(".popup_confirm").removeClass("active");}, 300);
	confirm_close = true;
}
function okPopup_confirm() {
	$(".popup_confirm").removeClass("show")
	setTimeout(function(){$(".popup_confirm").removeClass("active");}, 300);
	confirm_ok = true;
}
