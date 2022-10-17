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

var GRID_URL = "/board/grid_search";




/***********************************************************************************
* 그리드 설정
***********************************************************************************/

$(document).ready(function () {
	// 포커스
	$(".search_param input[name='titleText_like']").focus();
	
	// 컬럼 설정
	//GRID_COL.push(GRID_CHECKBOX.getColumnDefinition()); // 체크박스
	GRID_COL.push({id:"id", name:"NO", field:"id", width:40, sortable:true, sorter:sorterNumeric});
	//if($("#PlusYN").val() == 1){
	//	GRID_COL.push({id:"receiptPopOpen", name:"영수증접수", field:"BoardCD", width:100, sortable:true, sorter:sorterNumeric, formatter:formatterReceiptPopOpen});
	//	GRID_COL.push({id:"ReceiptionYN", name:"접수유무", field:"ReceiptionYN", width:100, sortable:true, sorter:sorterNumeric, formatter:formatterReceiptionYN});
	//}
	GRID_COL.push(
		//{id:"boardCD", name:"게시판코드", field:"boardCD", width:100, sortable:true},
		{id:"boardType", name:"게시판구분", field:"boardType", width:150, sortable:true},
		{id:"titleText", name:"제목", field:"titleText", width:400, sortable:true, cssClass:"align-left", formatter:formatterBoardPopup},
		{id:"contentText", name:"내용", field:"contentText", width:400, sortable:true, cssClass:"align-left", formatter:formatterBoardPopup},
		{id:"writeUserNM", name:"작성자", field:"writeUserNM", width:120, sortable:true},
		{id:"writeDT", name:"작성일시", field:"writeDT", width:120, sortable:true, formatter:formatterDateTime},
		{id:"updateDT", name:"업데이트일시", field:"updateDT", width:120, sortable:true, formatter:formatterDateTime},
	);
	
	// 그리드에 보여지는 개수
	GRID_SHOW_CNT = "1000";//"500,1000";
	
	// 그리드 생성
	GRID = new Slick.Grid(".GRID", GRID_DATA, GRID_COL, GRID_OPTION);
	GRID.setSelectionModel(new Slick.RowSelectionModel({selectActiveRow:false})); // false: 여러 ROW 선택가능 / true: 단독 ROW 선택
	//GRID.setSelectionModel(new Slick.CellSelectionModel({selectActiveRow:false})); // 셀 드래그 선택 
	GRID.registerPlugin(new Slick.CellExternalCopyManager({"readOnlyMode":true})); // Ctrl+C 가능, 그리드에는 못붙이게
	GRID.registerPlugin(GRID_CHECKBOX); // 체크박스 플러그인
	
	// 그리드 이벤트 설정
	GRID.onCellChange.subscribe(function(e, args) { // 셀 변경될때
		GRID_DATA.updateItem(args.item.id, args.item);
		updateGridFooter(args.grid, args.cell);
	});
	GRID.onColumnsReordered.subscribe(function(e, args) { // 컬럼 재배치 되었을때
		updateGridFooterAll(args.grid); // footer 자동으로 지워지므로 다시 설정
	});
	GRID.onKeyDown.subscribe(function (e) {
		if (e.which != 65 || !e.ctrlKey) { // Ctrl+A 모두선택
			return false;
		}
		var rows = [];
		for (var i = 0; i < GRID_DATA.getLength(); i++) {
			rows.push(i);
		}
		GRID.setSelectedRows(rows);
		e.preventDefault();
	});
	GRID.onSort.subscribe(function (e, args) { // 헤드컬럼 눌러서 소팅될때
		GRID_SORT_COL = args.sortCol.field;
		if (!args.sortCol.sorter) { // 기본 정렬은 문자형으로
			args.sortCol.sorter = sorterString;
		}
		GRID_DATA.sort(args.sortCol.sorter, args.sortAsc);
	});
	
	// 가로 스크롤 안되도록 컬럼 사이즈 자동조절
	//GRID_DATA.beginUpdate(); for (i=0; i<30; i++) {GRID_DATA.addItem({"id":i});} GRID_DATA.endUpdate();
	//GRID.autosizeColumns();-
	//GRID_DATA.beginUpdate(); for (i=0; i<30; i++) {GRID_DATA.deleteItem(i);} GRID_DATA.endUpdate();
	
	clickSearch();
});

// formatterBoardPopup
function formatterBoardPopup(row, cell, value, columnDef, dataContext) {
	return "<div class='link_popup' onclick=\"openPopup_board('"+GRID_DATA.getItem(row)["boardCD"]+"')\">"+value+"</div>";
}

// 그리드 Footer 업데이트
function updateGridFooter(grid, columnIdx) {
	var columnId = grid.getColumns()[columnIdx].id;
	var total = 0;
	if (columnId == "TotalPrice") {
		for (var i=0; i<GRID_DATA.getLength(); i++) {
			total += (parseInt((GRID_DATA.getItem(i).TotalPrice).replace(/,/g,""), 10) || 0);
		}
		$(grid.getFooterRowColumn(columnId)).html(formatMoney(total));
	}
}




/***********************************************************************************
* 조회
***********************************************************************************/

function setSearchParam() {
	var strParam = $(".search_param").serialize()
	
	return strParam;
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
		
		// PK 가 없다면 추가
		if ((p_BoardCD == undefined) || (p_BoardCD == "")) {
			$(".popup_board .popup_top .title").html("게시물 추가");
			$(".popup_board form input, .popup_board form textarea").val("").text("");
			$(".popup_board .popup_content .write_user").addClass("hidden");
			$(".popup_board .popup_bot .button.delete").addClass("hidden");
			CKEDITOR.instances["contentEditor"].setData("");
			
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
		}
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

// 게시물 삭제
function deleteBoard() {
	if (BOARD_UPDATE_YN == false) {
		confirm("게시물를 삭제 하시겠습니까?", function() {
			BOARD_UPDATE_YN = true;
		
			openPopup("loading");
			
			var strParam = {
				boardCD: encodeURIComponent($(".popup_board input[name='boardCD']").val()),
				deleteYN: 1,
			};
			$.post("/board/update", strParam, function(p_data, p_status) {
				if (p_data.result == "Y") {
					clickSearch();
					alert("삭제되었습니다.", function() {
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
		alert("처리중 입니다.");
	}
}
