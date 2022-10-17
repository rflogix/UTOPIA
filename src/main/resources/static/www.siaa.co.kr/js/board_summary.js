/***********************************************************************************
* Copyright (C)RFLOGIX since 2010.08.24 (rflogix@rflogix.com)
************************************************************************************
* ● 프로젝트	: 관리자
* ○ 파일		: board_summary.js
* ○ 생성		: 2013.09.03(화요일)
* ○ 최종변경	: 2015.06.10(수요일)
***********************************************************************************/




/***********************************************************************************
* 상수
***********************************************************************************/



/***********************************************************************************
* 그리드 설정
***********************************************************************************/

$(document).ready(function () {
	// 포커스
	//$(".search_param input[name='titleText_like']").focus();
	
	//"<div class='link_popup' onclick=\"openPopup_board('"+GRID_DATA.getItem(row)["boardCD"]+"')\">"+value+"</div>";
});


var BOARD_SEARCH_YN = false;
function searchBoard() {
	if (BOARD_SEARCH_YN == false) {
		BOARD_SEARCH_YN = true;
		
		openPopup("loading");
		
		let className = `.page_wrap.board.menu_cd_${MAIN_MENU_CD}_${SUB_MENU_CD}`;
		
		var strParam = $(`${className} .search_type`).val() + "=" + encodeURIComponent($(`${className} .search_wrap .search_word`).val())
			+ "&boardType=" + encodeURIComponent(BOARD_TYPE)
			+ "&deleteYN=-1"
			+ "&className=" + encodeURIComponent(className)
			;
		$.post("/board/grid_search", strParam, function(p_data, p_status) {
			if (p_data.result == "Y") {
				let className = `${p_data.className} .board_wrap`;
				if (p_data.list.length == 0) {
					$(className).html("<div class='empty'></div>");
					
				} else {
					$(className).html("");
					$(p_data.list).each(function(index, clsBoard) {
						$(className).append(
							$($("<div>").attr("class", "board"))
								.append($("<div>").attr("class", "title").attr("onclick", `openPopup_board(${clsBoard.boardCD});`).text(clsBoard.titleText))
								.append($("<div>").attr("class", "user").text(clsBoard.writeUserNM))
								.append($("<div>").attr("class", "date").text(clsBoard.writeDT))
								.append($("<div>").attr("class", "count").text(clsBoard.readCount))
						);
					});
				}
			}
			closePopup("loading");
			BOARD_SEARCH_YN = false;
			
		},"JSON").fail(function(jqXHR, textStatus, errorThrown){
			closePopup("loading");
			BOARD_SEARCH_YN = false;
			alert("네트워크 문제로 조회되지 않았습니다");
		});
		
	} else {
		alert("조회 중 입니다");
	}
}

/***********************************************************************************
* 게시물 팝업
***********************************************************************************/

// 게시물 보기
var BOARD_LIST_CLICK_YN = false;
function openPopup_board(p_BoardCD) {
	if (BOARD_LIST_CLICK_YN == false) {
		BOARD_LIST_CLICK_YN = true;
		
		openPopup("loading");
		
		var strParam = "boardCD=" + encodeURIComponent(p_BoardCD)
			;
		$.post("/board/grid_search", strParam, function(p_data, p_status) {
			if (p_data.result == "Y") {
				if (p_data.list.length == 1) {
					$(".popup_board .popup_top .title").html(BOARD_TYPE);
					
					// 조회된 정보 세팅
					var clsBoard = p_data.list[0];
					$(".popup_board form input").each(function() {
						$(this).val(clsBoard[$(this).attr("name")]);
					});
					$("#contentEditor").text(clsBoard.contentEditor);
					CKEDITOR.instances["contentEditor"].setData(clsBoard.contentEditor);
					
					openPopup("board");
				}
			}
			closePopup("loading");
			BOARD_LIST_CLICK_YN = false;
			
		},"JSON").fail(function(jqXHR, textStatus, errorThrown){
			closePopup("loading");
			BOARD_LIST_CLICK_YN = false;
			alert("네트워크 문제로 조회되지 않았습니다");
		});
		/*
		// PK 가 없다면 추가
		if ((p_BoardCD == undefined) || (p_BoardCD == "")) {
			$(".popup_board .popup_top .title").html("게시물 추가");
			$(".popup_board form input, .popup_board form textarea").val("").text("");
			$(".popup_board .popup_content .write_user").addClass("hidden");
			$(".popup_board .popup_bot .button.delete").addClass("hidden");
			//CKEDITOR.instances["contentEditor"].setData("");
			
			openPopup("board");
			closePopup("loading");
			BOARD_LIST_CLICK_YN = false;
			
		} else { // PK 가 있다면 수정/삭제
			var strParam = "boardCD=" + encodeURIComponent(p_BoardCD)
				;
			$.post("/board/grid_search", strParam, function(p_data, p_status) {
				if (p_data.result == "Y") {
					if (p_data.list.length == 1) {
						$(".popup_board .popup_top .title").html("게시물 수정");
						$(".popup_board form input, .popup_board form textarea").val("").text("");
						$(".popup_board .popup_content .write_user").removeClass("hidden");
						$(".popup_board .popup_bot .button.delete").removeClass("hidden");
						
						// 조회된 정보 세팅
						var clsBoard = p_data.list[0];
						$(".popup_board form input, .popup_board form select").each(function() {
							$(this).val(clsBoard[$(this).attr("name")]);
						});
						$("#contentEditor").text(clsBoard.contentEditor);
						//CKEDITOR.instances["contentEditor"].setData(clsBoard.contentEditor);
						
						openPopup("board");
					}
				}
				closePopup("loading");
				BOARD_LIST_CLICK_YN = false;
				
			},"JSON").fail(function(jqXHR, textStatus, errorThrown){
				closePopup("loading");
				BOARD_LIST_CLICK_YN = false;
				alert("네트워크 문제로 조회되지 않았습니다");
			});
		}
		*/
		
		// 조회수 1 올려주기
		var strParam = "readCountUpdateYN=Y" // 이 값으로 조회수 업데이트인지 분기타고
			+ "&boardCD=" + encodeURIComponent(p_BoardCD)
			+ "&readCount_add=1" // 해당 조회수만큼 더해준다
			;
		$.post("/board/update", strParam);
	}
}

// 게시물 수정
var BOARD_UPDATE_YN = false;
function updateBoard() {
	if (BOARD_UPDATE_YN == false) {
		var strID = "";
		
		// 제목
		strID = ".popup_board form [name=titleHtml]";
		$(strID).val($.trim($(strID).val()));
		if ($(strID).val() == "") {
			alert("제목을 입력해 주세요", function() {
				$(strID).focus();
			});			
			return false;
		}
		
		// 내용
		strID = ".popup_board form [name=contentEditor]";
		var ckeditor = CKEDITOR.instances["contentEditor"];
		if (ckeditor.getData() == "") {
			alert("내용을 입력해주세요", function() {
				ckeditor.focus();
			});
			return false;
		}
		
		confirm("저장 하시겠습니까?", function() {
			BOARD_UPDATE_YN = true;
			
			openPopup("loading");
			
			// 제목 설정
			$(".popup_board form [name=titleText]").val( $(".popup_board form [name=titleHtml]").val() ); // removeHTML($(strID).val()));
			
			// 내용 설정
			let contentHtml = ckeditor.getData();
			let dom = document.createElement("DIV");
			dom.innerHTML = contentHtml.replace(/\r?\n|\r/gm, "").replace(/\s\s+/g, " ").trim();
			$(".popup_board form [name=contentText]").val( $(dom).text() ); // removeHTML( ckeditor.document.getBody().getText() )
			$(".popup_board form [name=contentHtml]").val( ckeditor.getData() );
			dom.innerHTML = ckeditor.document.getBody().getHtml();
			$(dom).find("[data-cke-temp]").remove();
			$(".popup_board form [name=contentEditor]").val( dom.innerHTML ); // ckeditor.document.getBody().getHtml()
			
			var strParam = $(".popup_board form").serialize();
			$.post("/board/update", strParam, function(p_data, p_status) {
				if (p_data.result == "Y") {
					clickSearch();
					alert("저장되었습니다.", function() {
						closePopup("board");
					});
					
				} else { // 오류라면
					alert(p_data.message);
				}
				closePopup("loading");
				BOARD_UPDATE_YN = false;
				
			},"JSON").fail(function(jqXHR, textStatus, errorThrown){
				closePopup("loading");
				BOARD_UPDATE_YN = false;
				alert("네트워크 문제로 저장되지 않았습니다");
			});
		});
		
	} else {
		alert("저장중 입니다.");
	}
}
