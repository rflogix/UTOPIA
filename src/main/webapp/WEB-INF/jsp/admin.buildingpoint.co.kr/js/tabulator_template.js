/***********************************************************************************
* Copyright (C)RFLOGIX since 2010.08.24 (rflogix@rflogix.com)
************************************************************************************
* ● 프로젝트	:
* ○ 파일	: grid_template.js
* ○ 생성	: 2014.12.15(월요일)
* ○ 최종변경	: 2022.11.04(금요일)
************************************************************************************/

var T_GRID_HEADER
var T_GRID_DATA
/*T_GRID_URL, perPage, T_GRID_COL 필요*/

/***********************************************************************************
* 그리드 세팅
***********************************************************************************/
var grid = null;
var gridUser = null;
function settingTabulatorGrid(gridElement){
    grid = new Tabulator('#grid', {
        layout:"fitColumns",
        placeholder:"No Data Set",
        ajaxURL : T_GRID_URL,
        columns : TABULATOR_COL,
        selectable : true, // 체크박스 대용 로우 선택
        paginationSize : 10 , //페이지당 특정 수의 행을 요청하기 위한 선택적 매개변수
        //dataTree:true,
        dataTreeStartExpanded:false, // true 일시에 펼쳐진 상태
        movableRows : true , //toast ui 와 달리 행과 열 따로 설정됨
        movableColumns : true ,
        //height: 100,/*무한스크롤 위한 설정 : height 설정대로 리스트 로딩됨*/
        //progressiveLoad:"scroll",/*무한스크롤 위한 설정*/
        pagination : true , //페이지 매김 사용
        paginationMode : "remote" , //원격 페이지 매김 사용
        dataSendParams :{ "page" : "page" , "size" : "perPage", }, //페이지 요청 매개변수를 설정
        dataTreeCollapseElement : "<i class='fas fa-star'></i>", //토글 아이콘을 임의로 정의가능
        rowFormatter : function(row){
            if(row.getData().menuLevel==2){
                 //console.log($(row.getElement()).find('tabulator-cell fas'))
            }
        }
    });

    grid.on("rowSelected", function(row){
        console.log(row)
        //row - row component for the selected row
    });

    //편집시작
    /*grid.on("cellEditing", function(cell){
        confirm('저장하시겠습니까?', () => {
            console.log(cell);
        })
    });*/

    //편집종료
    grid.on("cellEdited", function(cell){
        console.log(cell);
    });

    //편집취소
    grid.on("cellEditCancelled", function(cell){
        //cell - cell component
    }); 

    gridUser = new Tabulator('#grid_user', {
        layout:"fitColumns",
        height: 800,
        placeholder:"No Data Set",
        ajaxURL : T_GRID_URL_USER,
        columns : TABULATOR_COL_USER,
        dataSendParams :{ "page" : "page" , "size" : "perPage", }, //페이지 요청 매개변수를 설정
        rowFormatter : function(row){
            console.log(row.getData()._children);
            if(row.getData()._children.length>0){
                //create and style holder elements
                var holderEl = document.createElement("div");
                var tableEl = document.createElement("div");

                holderEl.style.boxSizing = "border-box";
                holderEl.style.padding = "10px 30px 10px 10px";
                holderEl.style.borderTop = "1px solid #333";
                holderEl.style.borderBotom = "1px solid #333";
                tableEl.style.border = "1px solid #333";
                holderEl.appendChild(tableEl);
                row.getElement().appendChild(holderEl);

                var subTable = new Tabulator(tableEl, {
                    layout:"fitColumns",
                    data:row.getData()._children,
                    columns:[
                    {title:"메뉴코드", field:"menuCD"},
                    {title:"메뉴이름", field:"menuNM"},
                    {title:"권한일", field:"insertDT", sorter:"date"},
                    ]
                })
            }
        },
        selectable : true, // 체크박스 대용 로우 선택
        paginationSize : 10 , //페이지당 특정 수의 행을 요청하기 위한 선택적 매개변수
        pagination : true , //페이지 매김 사용
        paginationMode : "remote" , //원격 페이지 매김 사용
    });
}

/*검색 부분 */
function clickSearchTgrid() {
    var strURL = '';
    var page = '1';

    strURL = T_GRID_URL;
    let strParam = '';
    grid.setData('/menu/search_menu_tabulator', {searchKeyword : $("input[name='searchKeyword']").val()});
}

/*검색 부분 */
function clickSearchTgridUser() {
    var strURL = '';
    var page = '1';

    strURL = T_GRID_URL_USER;
    let strParam = '';
    gridUser.setData(strURL, {searchKeyword : $("input[name='searchKeywordUser']").val()});
}

/***********************************************************************************
* 서버 통신 관련(CRUD)
***********************************************************************************/
function syncServer(p_func) {
    if(p_func == 'createData'){
        syncCreateData();
    }
    if(p_func == 'updateData'){
        syncUpdateData(-1);
    }
    if(p_func == 'deleteData'){
        syncUpdateData(1);
    }
}

function syncUpdateData(deleteYN){
    let updateRows = grid.getSelectedData();
    console.log(updateRows);
    if(deleteYN==1){
        updateRows.forEach((obj, idx) => {
            obj.deleteYN = 1;
        });
    }
    if(updateRows.length==0){
        alert('선택된 행이 없습니다.');
        return;
    }

    var strID, strParam;
    let saveYN = confirm("수정 하시겠습니까?");
    if(saveYN){
        const syncUpdateDataRequest_promise = syncUpdateDataHub(updateRows, deleteYN);
        syncUpdateDataRequest_promise
        .then( (successCNT,failureCNT) =>{
            alert('총 '+updateRows.length + ' 건의 데이터 중 '+ successCNT +' 건이 수정되었습니다.');
            clickSearchTgrid();
        })
    };
}

function syncUpdateDataHub(p_updateRows, deleteYN){
	return new Promise((resolve, reject) => {
		var successCNT = 0;
		var failureCNT = 0;
        for(var i = 0; i<p_updateRows.length; i++){
            p_updateRows[i].deleteYN = deleteYN
            const syncUpdateDataRequest_promise = syncUpdateDataRequest(p_updateRows[i])
            syncUpdateDataRequest_promise
            .then( () => {
                successCNT = successCNT + 1;
                if(Number(successCNT)+Number(failureCNT) == p_updateRows.length){
                    resolve(successCNT,failureCNT);
                }
            })
            .catch( () => {
                failureCNT = failureCNT + 1;
                if(Number(successCNT)+Number(failureCNT) == p_updateRows.length){
                    resolve(successCNT,failureCNT);
                }
            })
        }
	})
}

function syncUpdateDataRequest( p_updatedRow ) {
	return new Promise((resolve, reject) => {
		$.post(T_GRID_UPDATE_URL, p_updatedRow, function(p_data, p_status) {
			if(p_data.result=='Y'){
				resolve();
			}else{
				reject();
			}
		},"JSON");
	})
}
