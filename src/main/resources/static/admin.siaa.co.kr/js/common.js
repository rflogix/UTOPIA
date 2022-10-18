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

var USER_LOGIN_URL = "user_login.jsp";
var USER_LOGOUT_URL = "user_logout.jsp";

var CHAT_INSERT_URL = "chat_insert.jsp";
var CHAT_DETACH_URL = "chat_detach.jsp";
var CHAT_READ_URL = "chat_read.jsp";
var CHAT_PORT = location.protocol === 'https:' ? 3001 : 3000;
var CHAT_SERVER_URL = "//chat.chronickor.com:"+CHAT_PORT;
var CHAT_LIST_URL = "chat_list.jsp";

var SEND_SMS_URL = "send_sms.jsp";
var SEND_MAIL_URL = "../send_mail.jsp";
var SEND_FCM_URL = "send_fcm.jsp";
var SEND_FCM_MULTI_URL = "send_fcm_multi.jsp";

var IMAGE_UPLOAD_URL= "../upload_image_temp.jsp";
var FILE_UPLOAD_URL = "../upload_file_temp.jsp";

var SESSION_SETTING = "session_setting.jsp";




/***********************************************************************************
* 화면
***********************************************************************************/

$(document).ready(function() {
	// ESC 처리
	$(document).keyup(function(e) {
		if (e.keyCode == 27) { // ESC
			if ($(".popup_bg.active").length > 0) {
				if (($(".popup_alert").hasClass("active") == false) && ($(".popup_confirm").hasClass("active") == false) && ($(".popup_loading").hasClass("active") == false)) {
					closePopup($(".popup_bg.active"));
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

// 사용자 로그아웃
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
function selectMenu(main_menu_cd, sub_menu_cd) {
	if ((main_menu_cd == 0) && (sub_menu_cd == 0)) {
		location.href = "/";
		
	} else if ((main_menu_cd == 1) && (sub_menu_cd == 1)) {
		location.href = "/user_summary";
		
	} else if ((main_menu_cd == 2) && (sub_menu_cd == 1)) {
		location.href = "/board_summary";

	} else if ((main_menu_cd == 3) && (sub_menu_cd == 1)) {
		location.href = "/page_summary/page_1_1"; // 협회개요
		
	} else {
		location.href = "/";
	}
}
function showMenu(main_menu_cd, sub_menu_cd) {
	$(".page_header .main_menu").removeClass("select");
	$(".page_header .main_menu.menu_cd_"+main_menu_cd).addClass("select");
	
	$(".page_left .main_menu").css("display", "none");
	$(".page_left .main_menu.menu_cd_"+main_menu_cd).css("display", "block");
	$(".page_left .sub_menu").removeClass("select");
	$(".page_left .sub_menu.menu_cd_"+main_menu_cd+"_"+sub_menu_cd).addClass("select");
	
	$(".page_content .search_title .menu_nm").text($(".page_left .sub_menu.menu_cd_"+main_menu_cd+"_"+sub_menu_cd).text());
}




/***********************************************************************************
* 조회
***********************************************************************************/

var CLICK_SEARCH_YN = false;
function clickSearch(p_page) {
	if (CLICK_SEARCH_YN == false) {
		CLICK_SEARCH_YN = true;
		
		if ($(".search_result .GRID_pager").length == 0) {
			$(".search_result").append(
				"<div class='GRID_pager'>"
					+"<div class='total_cnt'></div>"
					+"<div class='page_list'></div>"
					+"<div class='show_cnt'></div>"
					
					+"<input name='Search_Page' type='hidden'/>"
					+"<input name='Search_ShowCNT' type='hidden'/>"
				+"</div>");
			$(".search_result .GRID_pager").addClass("show");
		}
		
		// Search_ShowCNT
		if ($(".search_result .GRID_pager .show_cnt").html() == "") {
			var strShowCNT_HTML = "";
			GRID_SHOW_CNT = GRID_SHOW_CNT.replace(/(\s*)/g,"");
			if (GRID_SHOW_CNT != "") {
				strShowCNT_HTML = "<select onchange=\"selectSearchShowCNT(this);\">";
				var arrShowCNT = GRID_SHOW_CNT.split(",");
				for (var i=0; i<arrShowCNT.length; i++) {
					strShowCNT_HTML += "<option value='"+arrShowCNT[i]+"'>"+arrShowCNT[i]+"개씩 보기</option>"
				}
				strShowCNT_HTML += "</select>";
				if ($("input[name='Search_ShowCNT']").val() == "") {
					$("input[name='Search_ShowCNT']").val(arrShowCNT[0]);
				}
			}
			$(".search_result .GRID_pager .show_cnt").html(strShowCNT_HTML);
		}
		
		// 검색중
		if ($(".search_result .GRID_msg").length == 0) {
			$(".search_result .slick-pane.slick-pane-top.slick-pane-left").append("<div class='GRID_msg'></div>");
		}
		$(".search_result .GRID_msg").html("검색중 입니다.").addClass("show");
		
		var strParam = setSearchParam(); // 각 페이지에서 정의해 주어야 함
		
		// Search_Page
		if ($("input[name='Search_Page']").length > 0) {
			if (p_page) {
				$("input[name='Search_Page']").val(p_page);
			} else {
				//if ($(".search_result .page.button.selected").html() != 1) {
					$("input[name='Search_Page']").val($(".search_result .page.button.selected").html());
				//} else {
				//	$("input[name='Search_Page']").val(1);
				//}
			}
			strParam += "&Search_Page=" + $("input[name='Search_Page']").val();
		}
		
		// Search_ShowCNT
		if ($("input[name='Search_ShowCNT']").length > 0) {
			strParam += "&Search_ShowCNT=" + $("input[name='Search_ShowCNT']").val();
		}
		$.post(GRID_URL, strParam, function(p_data, p_status) {
			if (p_data.result == "Y") {
				CLICK_SEARCH_YN = false;
				
				if (p_data.list.length == 0) {
					GRID_DATA.beginUpdate();
					GRID_DATA.setItems([]);
					GRID_DATA.endUpdate();
					//GRID.setData([]) // 2021-12-17 주재범 GRID 컴포넌트 드래그 앤 드롭 추가로 인해  추가 
					GRID.setSelectedRows([]); // 선택삭제
					GRID.scrollRowToTop(0); // 제일 위로 스크롤
					GRID.invalidate(); // 그리드 다시 그리기
					
					$(".search_result .GRID_msg").html("검색 결과가 없습니다.");
					$(".search_result .GRID_msg").addClass("show");
					//$(".search_result .GRID_pager").removeClass("show");
					//$(".search_result .GRID_pager .total_cnt").html("검색결과 총 : 0 건");
					$(".search_result .GRID_pager .page_list").html("");

				} else {
					GRID_DATA.beginUpdate();
					GRID_DATA.setItems(p_data.list);
					GRID_DATA.endUpdate();
					//GRID.setData(p_data.list); // 2021-12-17 주재범 GRID 컴포넌트 드래그 앤 드롭 추가로 인해  추가 
					GRID.setSelectedRows([]); // 선택삭제
					GRID.scrollRowToTop(0); // 제일 위로 스크롤
					GRID.invalidate(); // 그리드 다시 그리기
					
					$(".search_result .GRID_msg").removeClass("show");
					//$(".search_result .GRID_pager").addClass("show");
					var total_cnt = "검색결과 총 : "+formatMoney(p_data.Search_ResultCNT)+" 건";
					if (p_data.Search_TotalCNT == 0) {
						p_data.Search_TotalCNT = p_data.Search_ResultCNT;
					}
					if (p_data.Search_ResultCNT != p_data.Search_TotalCNT) {
						total_cnt += " / "+formatMoney(p_data.Search_TotalCNT)+" 건";
					}
					if (p_data.SearchRemark) {
						total_cnt += p_data.SearchRemark;
					}
					//$(".search_result .GRID_pager .total_cnt").html(total_cnt);
					
					var html_page = "";
					var SHOW_PAGE_CNT = 10;
					var MaxPage = Number(p_data.Search_TotalPage) > SHOW_PAGE_CNT ? SHOW_PAGE_CNT : Number(p_data.Search_TotalPage);
					for (var i=0; i<MaxPage; i++) {
						html_page += "<div class='page button "+(p_data.Search_Page==(i+1)?"selected":"")+"' onclick='selectSearchPage(this);'>"+(i+1)+"</div>"
					}
					if (Number(p_data.Search_TotalPage) > SHOW_PAGE_CNT) {
						html_page += "<div class='blank'>...</div>";
						
						var strOption = "";
						html_page += "<select class='all_page' onchange='selectSearchPage(this);'>";
						for (var i=0; i<p_data.Search_TotalPage; i++) {
							strOption += "<option value='"+(i+1)+"' "+(p_data.Search_Page==(i+1)?"selected":"")+">"+(i+1)+" 페이지</option>";
						}
						html_page += strOption + "</select>";
					}
					$(".search_result .GRID_pager .page_list").html(html_page);
					
					selectSearchRow(); // 각 페이지에서 정의해 주어야할 그리드 row 선택 함수
				}
				
				updateGridFooterAll(GRID); // Footer 재설정
				
			} else { // 오류라면
				CLICK_SEARCH_YN = false;
				alert("조회 과정중 오류가 발생하였습니다.");
			}
		},"JSON").fail(function(p_data, p_status){
			alert(p_data.message);
		});
		
	} else {
		alert("조회중입니다.");
	}
}

// 페이지 이동
function selectSearchPage(p_this) {
	var Page = 1;
	if ($(p_this).find("option").length > 0) {
		Page = $(p_this).val();
	} else {
		Page = $(p_this).html();
	}
	clickSearch(Page);
}

// ShowCNT 변경
function selectSearchShowCNT(p_this) {
	$("input[name='Search_ShowCNT']").val($(p_this).val());
	clickSearch();
}

// 상세검색 토글
function toggleSearch(p_open) {
	var blnOpenYN = true;
	if (p_open == undefined) {
		if ($(".search_param table tr:eq(1)").hasClass("hidden") == false) {
			blnOpenYN = false;
		}
	} else {
		blnOpenYN = p_open;
	}
	if (blnOpenYN) {
		$(".search_param table tr").each(function(p_index) {
			if (p_index > 0) {
				$(this).removeClass("hidden");
				//$(".search_param table tr:eq("+p_index+") input").removeClass("hidden");
				//$(".search_param table tr:eq("+p_index+") select").removeClass("hidden");
			}
		});
		$(".search_title .btn_detail div").html("상세검색 닫기");
		$(".search_title .btn_detail i").removeClass("fa-angle-down");
		$(".search_title .btn_detail i").addClass("fa-angle-up");
		
	} else {
		$(".search_param table tr").each(function(p_index) {
			if (p_index > 0) {
				$(this).addClass("hidden");
				//$(".search_param table tr:eq("+p_index+") input").addClass("hidden");
				//$(".search_param table tr:eq("+p_index+") select").addClass("hidden");
			}
		});
		$(".search_title .btn_detail div").html("상세검색 열기");
		$(".search_title .btn_detail i").addClass("fa-angle-down");
		$(".search_title .btn_detail i").removeClass("fa-angle-up");
	}
}

// 각 페이지에서 정의해 주어야할 그리드 row 선택 함수
function selectSearchRow() {}




/***********************************************************************************
* 그리드 관련
***********************************************************************************/

var GRID, GRID_DATA, GRID_COL, GRID_OPTION, GRID_CHECKBOX, GRID_SORT_COL, GRID_SHOW_CNT="";
$(document).ready(function () {
	GRID_CHECKBOX = new Slick.CheckboxSelectColumn({cssClass:"slick-cell-checkbox"}); // 체크박스
	GRID_COL = [];
	GRID_OPTION = {
		rowHeight : 40
		, enableCellNavigation: true // 속도를 위한 데이터셋 가상화
		, enableColumnReorder: true // 컬럼 순서바꾸기
		
		,enableTextSelectionOnCells:true
		
		//,footerRowHeight: 30
		//,createFooterRow: true
		//,showFooterRow: true
	};
	
	GRID_DATA = new Slick.Data.DataView();
	GRID_DATA.onRowCountChanged.subscribe(function (e, args) {
		GRID.updateRowCount();
		GRID.render();
	});
	GRID_DATA.onRowsChanged.subscribe(function (e, args) {
		GRID.invalidateRows(args.rows);
		GRID.render();
	});
	GRID_DATA.onPagingInfoChanged.subscribe(function (e, pagingInfo) {
		GRID.updatePagingStatusFromView(pagingInfo);
	});
});
function sorterString(a, b) {
	var x = a[GRID_SORT_COL], y = b[GRID_SORT_COL];
	return (x === y ? 0 : (x > y ? 1 : -1));
}
function sorterNumeric(a, b) {
	var x = (isNaN(a[GRID_SORT_COL]) || a[GRID_SORT_COL] === "" || a[GRID_SORT_COL] === null) ? -99e+10 : parseFloat(a[GRID_SORT_COL]);
	var y = (isNaN(b[GRID_SORT_COL]) || b[GRID_SORT_COL] === "" || b[GRID_SORT_COL] === null) ? -99e+10 : parseFloat(b[GRID_SORT_COL]);
	return (x === y ? 0 : (x > y ? 1 : -1));
}
function sorterRating(a, b) {
	var xrow = a[GRID_SORT_COL], yrow = b[GRID_SORT_COL];
	var x = xrow[3], y = yrow[3];
	return (x === y ? 0 : (x > y ? 1 : -1));
}
function sorterDate(a, b) {
	var regex_a = new RegExp("^((19[1-9][1-9])|([2][01][0-9]))\\d-([0]\\d|[1][0-2])-([0-2]\\d|[3][0-1])(\\s([0]\\d|[1][0-2])(\\:[0-5]\\d){1,2}(\\:[0-5]\\d){1,2})?$", "gi");
	var regex_b = new RegExp("^((19[1-9][1-9])|([2][01][0-9]))\\d-([0]\\d|[1][0-2])-([0-2]\\d|[3][0-1])(\\s([0]\\d|[1][0-2])(\\:[0-5]\\d){1,2}(\\:[0-5]\\d){1,2})?$", "gi");
	if (regex_a.test(a[GRID_SORT_COL]) && regex_b.test(b[GRID_SORT_COL])) {
		var date_a = new Date(a[GRID_SORT_COL]);
		var date_b = new Date(b[GRID_SORT_COL]);
		var diff = date_a.getTime() - date_b.getTime();
		return (diff === 0 ? 0 : (date_a > date_b ? 1 : -1));
	} else {
		var x = a[GRID_SORT_COL], y = b[GRID_SORT_COL];
		return (x === y ? 0 : (x > y ? 1 : -1));
	}
}
function formatter(row, cell, value, columnDef, dataContext) {
	return value;
}
function formatterMoney(row, cell, value, columnDef, dataContext) {
	if ((value == null) || (value == "")) {
		return value;
	} else {
		return formatMoney(value);
	}
}
function formatterDate(row, cell, value, columnDef, dataContext) {
	if ((value == null) || (value == "")) {
		return value;
	} else {
		var html = value.substring(0, 10);
		return html;
	}
}
function formatterDateTime(row, cell, value, columnDef, dataContext) {
	if ((value == null) || (value == "")) {
		return value;
	} else {
		var html = value.substring(0, 10) + "<br/>" + value.substring(11);
		return html;
	}
}
function formatterTel(row, cell, value, columnDef, dataContext) {
	if ((value == null) || (value == "")) {
		return value;
	} else {
		return formatTel(value);
	}
}
function formatterCompanyNO(row, cell, value, columnDef, dataContext) {
	if ((value == null) || (value == "")) {
		return value;
	} else {
		return formatCompanyNO(value);
	}
}
function updateGridFooterAll(grid) {
	var columnIdx = grid.getColumns().length;
	while (columnIdx--) {updateGridFooter(grid, columnIdx);}
}
function updateGridFooter() {} // updateGridFooter 함수만 해당 페이지에서 정의하여 세팅




/***********************************************************************************
* datepicker 관련
***********************************************************************************/

if ($.datepicker) {
	$.datepicker.setDefaults( {
		monthNames: ["01","02","03","04","05","06","07","08","09","10","11","12"]
		,monthNamesShort: ["01","02","03","04","05","06","07","08","09","10","11","12"]
		,dayNamesMin: ["일","월","화","수","목","금","토"]
		,dayNamesShort: ["일","월","화","수","목","금","토"]
		,dateFormat: 'yy-mm-dd'
		,showMonthAfterYear: true
		,changeYear: true
		,changeMonth: true
		,showOtherMonths: true
		,selectOtherMonths: true
	});
}
function deleteDate(p_ID) {
	$("input[name='"+p_ID+"']").val("");
}






/***********************************************************************************
* select box 색상변경
***********************************************************************************/

function colorSelectbox(p_this) {
	$(p_this).css({"color": $(p_this).find("option:selected").attr("data-color")});
}




/***********************************************************************************
* 토글 관련
***********************************************************************************/

// 체크박스 토글
function toggleCheckbox(p_this) {
	var element;
	if ($(p_this).hasClass("check_wrap")) {
		element = $(p_this);
		
	} else if ($(p_this).hasClass("checkbox")) {
		element = $(p_this).parent();
		
	} else if ($(p_this).hasClass("label")) {
		element = $(p_this).parent();
	}
	if ($(element).hasClass("active")) {
		$(element).removeClass("active");
	} else {
		$(element).addClass("active");
	}
}

// 오픈여부 관련
function toggleOpenYN(p_this, p_target) {
	if ($(p_this).hasClass("open")) {
		$(p_this).removeClass("open");
		if (p_target) {
			$(p_target).removeClass("open");
		}
	} else {
		$(p_this).addClass("open");
		if (p_target) {
			$(p_target).addClass("open");
		}
	}
}

// 라디오버튼 토글
function toggleRadio(p_this) {
	var element;
	if ($(p_this).hasClass("radio_wrap")) {
		element = $(p_this);
		
	} else if ($(p_this).hasClass("radio")) {
		element = $(p_this).parent();
		
	} else if ($(p_this).hasClass("label")) {
		element = $(p_this).parent();
	}
	
	$(element).parent().find(".radio_wrap").removeClass("active");
	$(element).addClass("active");
	if ($(element).children("input.etc").length > 0) {
		$(element).children("input.etc").addClass("active");
	} else {
		$(element).children("input.etc").removeClass("active");
	}
}




/***********************************************************************************
* FCM 관련
***********************************************************************************/

// FCM 발송
var FcmBean = function() {
	this.SEND_FORCE_YN = "N";
	
	this.UserCD = 0;
	this.CompanyCD = 0;
	this.ContentText = "";
	this.FunctionNM = "";
	this.FunctionParam = "";
}
function sendFCM(p_FcmBean) {
	var strParam = "UserCD_Login="+encodeURIComponent($("#UserCD_Login").val())
		+ "&SEND_FORCE_YN="+encodeURIComponent((p_FcmBean.SEND_FORCE_YN==undefined?"":p_FcmBean.SEND_FORCE_YN))
		
		+ "&UserCD="+encodeURIComponent((p_FcmBean.UserCD==undefined?"":p_FcmBean.UserCD))
		+ "&ContentTitle="+encodeURIComponent((p_FcmBean.ContentTitle==undefined?"":p_FcmBean.ContentTitle))
		+ "&ContentText="+encodeURIComponent((p_FcmBean.ContentText==undefined?"":p_FcmBean.ContentText))
		+ "&FunctionNM="+encodeURIComponent((p_FcmBean.FunctionNM==undefined?"":p_FcmBean.FunctionNM))
		+ "&FunctionParam="+encodeURIComponent((p_FcmBean.FunctionParam==undefined?"":p_FcmBean.FunctionParam))
		;
	$.post(SEND_FCM_URL, strParam, function() {},"JSON");
}

var FCM_MULTI_CLICK_YN = false;
function sendMultiFCM() {
	if (FCM_MULTI_CLICK_YN == false) {
		var strID, strParam;
		
		strID = ".popup_fcm textarea[name='FCM_TEXT']";
		$(strID).val($.trim($(strID).val()));
		if ($(strID).val() == "") {
			alert("메시지는 필수 입력사항입니다.");
			$(strID).focus();
			return false;
		}
		
		openPopup("loading");
		
		FCM_MULTI_CLICK_YN = true;
		
		var strParam = $(".popup_fcm form").serialize()
			+ "&UserCD_Login="+encodeURIComponent($("#UserCD_Login").val())
			;
			
		$.post(SEND_FCM_MULTI_URL, strParam, function(p_data, p_status) {
			if (p_data.state == "Y") {
				alert("푸시메시지를 전송하였습니다.");
				closePopup("fcm");
				
			} else if (p_data.state == "C") {
				alert("보낼 메시지가 없습니다.");
				
			} else if (p_data.state == "F") {
				alert("대상자가 없습니다.");
				
			}
			
			FCM_MULTI_CLICK_YN = false;
			closePopup("loading");
			
		},"JSON").fail(function(p_data, p_status){
			alert(p_data.message);
		});;
	}
}




/***********************************************************************************
* Mail 관련
***********************************************************************************/

var MailBean = function() {
	this.MAIL_RECEIVE_EMAIL = "";
	this.MAIL_RECEIVE_NM = "";
	this.MAIL_TITLE = "";
	this.MAIL_CONTENT = "";
	
	this.MAIL_TYPE = "";
	this.RESULT_ALERT_YN = "N";
	this.LOADING_CLOSE_YN = "N";
}
function sendMail(p_MailBean) {
	var strParam = "MAIL_RECEIVE_EMAIL=" + encodeURIComponent(p_MailBean.MAIL_RECEIVE_EMAIL)
		+ "&MAIL_RECEIVE_NM=" + encodeURIComponent(p_MailBean.MAIL_RECEIVE_NM)
		+ "&MAIL_TITLE=" + encodeURIComponent(p_MailBean.MAIL_TITLE)
		+ "&MAIL_CONTENT=" + encodeURIComponent(p_MailBean.MAIL_CONTENT)
		+ "&MAIL_TYPE=" + encodeURIComponent(p_MailBean.MAIL_TYPE)
		+ "&RESULT_ALERT_YN=" + encodeURIComponent(p_MailBean.RESULT_ALERT_YN)
		+ "&LOADING_CLOSE_YN=" + encodeURIComponent(p_MailBean.LOADING_CLOSE_YN)
		;
	$.post(SEND_MAIL_URL, strParam, function(p_data) {
		if (p_data.RESULT_ALERT_YN == "Y") {
			alert(p_data.message);
		}
		if (p_data.LOADING_CLOSE_YN == "Y") {
			closePopup("loading");
		}
	},"JSON").fail(function(p_data, p_status){
		alert(p_data.message);
	});
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
			queFunction = focusPopupByName(p_class, "titleHtml");
			
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

//Confirm 관련
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
