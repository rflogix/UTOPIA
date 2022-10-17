/***********************************************************************************
* Copyright (C)RFLOGIX since 2010.08.24 (rflogix@rflogix.com)
************************************************************************************
* ● 프로젝트	: 관리자
* ○ 파일		: user_summary.js
* ○ 생성		: 2013.09.03(화요일)
* ○ 최종변경	: 2015.06.10(수요일)
***********************************************************************************/




/***********************************************************************************
* 상수
***********************************************************************************/

var GRID_URL = "/user/grid_search";




/***********************************************************************************
* 그리드 설정
***********************************************************************************/

$(document).ready(function () {
	// 포커스
	$(".search_param input[name='userNM_like']").focus();
	
	// 컬럼 설정
	//GRID_COL.push(GRID_CHECKBOX.getColumnDefinition()); // 체크박스
	GRID_COL.push({id:"id", name:"NO", field:"id", width:40, sortable:true, sorter:sorterNumeric});
	//if($("#PlusYN").val() == 1){
	//	GRID_COL.push({id:"receiptPopOpen", name:"영수증접수", field:"UserCD", width:100, sortable:true, sorter:sorterNumeric, formatter:formatterReceiptPopOpen});
	//	GRID_COL.push({id:"ReceiptionYN", name:"접수유무", field:"ReceiptionYN", width:100, sortable:true, sorter:sorterNumeric, formatter:formatterReceiptionYN});
	//}
	GRID_COL.push(
		{id:"userCD", name:"사용자코드", field:"userCD", width:100, sortable:true, formatter:formatterUserPopup},
		{id:"userID", name:"사용자ID", field:"userID", width:200, sortable:true, cssClass:"align-left", formatter:formatterUserPopup},
		{id:"userNM", name:"사용자명", field:"userNM", width:120, sortable:true, formatter:formatterUserPopup},
		{id:"cellPhoneNO", name:"휴대폰번호", field:"cellPhoneNO", width:200, sortable:true},
		{id:"email", name:"이메일", field:"email", width:200, sortable:true, cssClass:"align-left"},
		{id:"joinDT", name:"가입일시", field:"joinDT", width:120, sortable:true, formatter:formatterDateTime},
		{id:"updateDT", name:"업데이트일시", field:"updateDT", width:120, sortable:true, formatter:formatterDateTime},
		//{id:"lastConnectDT", name:"최종접속", field:"lastConnectDT", width:100, sortable:true, formatter:formatterDateTime},
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

// formatterUserPopup
function formatterUserPopup(row, cell, value, columnDef, dataContext) {
	return "<div class='UserNM' onclick=\"openPopup_User('"+GRID_DATA.getItem(row)["userCD"]+"')\">"+value+"</div>";
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
	
	/*
	// 회원 상태	
	var UserStatus = "";
	if ($("#UserStatus1").prop("checked") == true) {
		UserStatus += ","+$("#UserStatus1").val();
	}
	if ($("#UserStatus2").prop("checked") == true) {
		UserStatus += ","+$("#UserStatus2").val();
	}
	if ($("#UserStatus3").prop("checked") == true) {
		UserStatus += ","+$("#UserStatus3").val();
	}
	if ($("#UserStatus4").prop("checked") == true) {
		UserStatus += ","+$("#UserStatus4").val();
	}
	if ($("#UserStatus5").prop("checked") == true) {
		UserStatus += ","+$("#UserStatus5").val();
	}
	if (UserStatus != "") {
		UserStatus = UserStatus.substring(1);
		strParam += "&UserStatus().In="+encodeURIComponent(UserStatus);
	}
	
	// 플러스 회원 여부
	var PlusYN = "";
	if ($("#PlusYN_1").prop("checked") == true) {
		PlusYN += ","+$("#PlusYN_1").val();
	}
	if ($("#PlusYN_2").prop("checked") == true) {
		PlusYN += ","+$("#PlusYN_2").val();
	}
	if (PlusYN != "") {
		PlusYN = PlusYN.substring(1);
		strParam += "&PlusYN().In="+encodeURIComponent(PlusYN);
	}
	
	// 접수유무
	var ReceiptionYN = "";
	if ($("#ReceiptionYN_1").prop("checked") == true) {
		ReceiptionYN += ","+$("#ReceiptionYN_1").val();
	}
	if ($("#ReceiptionYN_2").prop("checked") == true) {
		ReceiptionYN += ","+$("#ReceiptionYN_2").val();
	}
	if (ReceiptionYN != "") {
		ReceiptionYN = ReceiptionYN.substring(1);
		strParam += "&ReceiptionYN().In="+encodeURIComponent(ReceiptionYN);
	}
	
	// 디바이스
	var DeviceType = "";
	if ($("#DeviceType_1").prop("checked") == true) {
		DeviceType += ","+$("#DeviceType_1").val();
	}
	if ($("#DeviceType_2").prop("checked") == true) {
		DeviceType += ","+$("#DeviceType_2").val();
	}
	if (DeviceType != "") {
		DeviceType = DeviceType.substring(1);
		strParam += "&clsDeviceBean.DeviceType().In="+encodeURIComponent(DeviceType);
	}
	*/
	
	return strParam;
}




/***********************************************************************************
* 사용자 팝업
***********************************************************************************/

// 사용자 보기
var USER_LIST_CLICK_YN = false;
function openPopup_User(p_UserCD) {
	if (USER_LIST_CLICK_YN == false) {
		USER_LIST_CLICK_YN = true;
		
		openPopup("loading");
		
		var strParam = "userCD=" + encodeURIComponent(p_UserCD)
			;

		$.post("/user/grid_search", strParam, function(p_data, p_status) {
			if (p_data.result == "Y") {
				if (p_data.list.length == 1) {
					var clsUserBean = p_data.list[0];
					$(".popup_user form input").val("");
					
					//$(".popup_user .popup_top .title").html(clsUserBean.userNM+"&nbsp;<span style='font-size:18px; color:#bbb;'>&nbsp;("+clsUserBean.userCD+")</span>");
					$(".popup_user .popup_top .title").html("사용자 정보");
					
					// 사용자 정보
					$(".popup_user input[name='userCD']").val(clsUserBean.userCD);
					$(".popup_user input[name='userNM']").val(clsUserBean.userNM);
					$(".popup_user input[name='userID']").val(clsUserBean.userID);
					$(".popup_user input[name='email']").val(clsUserBean.email);
					$(".popup_user input[name='cellPhoneNO']").val(clsUserBean.cellPhoneNO);
					$(".popup_user select[name='userStatus']").val(clsUserBean.userStatus);
					
					openPopup("user");
				}
			}
			USER_LIST_CLICK_YN = false;
			closePopup("loading");
		},"JSON");
	}
}

// 사용자 수정
var USER_UPDATE_YN = false;
function updateUser() {
	if (USER_UPDATE_YN == false) {
		confirm("저장 하시겠습니까?", function() {
			USER_UPDATE_YN = true;
			
			openPopup("loading");
			
			var strParam = $(".popup_user form").serialize()
				;
			$.post("/user/update", strParam, function(p_data, p_status) {
				if (p_data.result == "Y") {
					clickSearch();
					alert("저장되었습니다.", function() {
						closePopup("user");
					});
					
				} else { // 오류라면
					alert(p_data.message);
				}
				closePopup("loading");
				USER_UPDATE_YN = false;
			},"JSON");
		});
		
	} else {
		alert("저장중 입니다.");
	}
}

// 사용자 삭제
function deleteUser() {
	if (USER_UPDATE_YN == false) {
		confirm("사용자를 삭제 하시겠습니까?", function() {
			USER_UPDATE_YN = true;
		
			openPopup("loading");
			
			var strParam = "userCD=" + encodeURIComponent($(".popup_user input[name='userCD']").val())
				+ "&deleteYN=1"
				;
			$.post("/user/update", strParam, function(p_data, p_status) {
				if (p_data.result == "Y") {
					clickSearch();
					alert("삭제되었습니다.", function() {
						closePopup("user");
					});
					
				} else { // 오류라면
					alert(p_data.message);
				}
				closePopup("loading");
				USER_UPDATE_YN = false;
			},"JSON");
		});
		
	} else {
		alert("처리중 입니다.");
	}
}
