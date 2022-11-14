/***********************************************************************************
* Copyright (C)RFLOGIX since 2010.08.24 (rflogix@rflogix.com)
************************************************************************************
* ● 프로젝트	:
* ○ 파일	: menu_edit.js
* ○ 생성	: 2014.12.15(월요일)
* ○ 최종변경	: 2022.11.04(금요일)
************************************************************************************/
var T_GRID_URL = '/menu/search_menu_list';
var T_GRID_CREATE_URL = '/menu/create_menu';
var T_GRID_UPDATE_URL = '/menu/update_menu';
var T_GRID_DELETE_URL = '/menu/delete_menu';
var T_GRID_MODIFY_URL = '/menu/modify_menu';
var perPage = '10';
$(document).ready(function() {
    console.log("toast_test 화면 진입");
    settingGridColumn();
    settingTGrid('grid','menuCD');// 그리드 컴포넌트를 생성할 el과 트리가 있다면 트리헤더로 사용할 컬럼 이름 명시
    clickSearchTgrid();

    //드래그 시작할 시 이벤트를 정의해준다
    grid.on('dragStart', ev => {
        //console.log(ev);
        // row
        //   ev.rowKey - The rowKey of the row to drag
        //   ev.floatingRow - The floating row DOM element
        // column
        //   ev.columnName - The column name of the column to drag
        //   ev.floatingColumn - The floating column DOM element
    });

    //드래그 중일 시 이벤트를 정의해준다
    grid.on('drag', ev => {
        //console.log(ev);
        // row
        //   ev.rowKey - The rowKey of the dragging row
        //   ev.targetRowKey - The rowKey of the row at current dragging position
        //   ev.appended - Whether the row is appended to other row as the child in tree data.
        // column
        //   ev.columnName - The column name of the dragging column
        //   ev.targetColumnName - The column name of the column at current dragging position
    });

    //드롭일 시 이벤트를 정의해준다
    grid.on('drop', ev => {
        console.log(ev);
        // row
        //   ev.rowKey - The rowKey of the dragging row
        //   ev.targetRowKey - The rowKey of the row at current dragging position
        //   ev.appended - Whether the row is appended to other row as the child in tree data.
        // column
        //   ev.columnName - The column name of the dragging column
        //   ev.targetColumnName - The column name of the column at current dragging position
        let eventRow = grid.getRow(ev.rowKey);
        console.log(grid.getDepth(ev.rowKey));
        if(ev.appended){
        }else{
        }
    });
});

/***********************************************************************************
* 각 페이지마다 정의되는 부분
***********************************************************************************/
/*컬럼세팅*/
var T_GRID_COL;
function settingGridColumn(){
    T_GRID_COL = new Array();
    T_GRID_COL.push({header: '메뉴코드', name: 'menuCD', width: 150, align: 'center', editor: 'text', sortingType:'desc', sortable : true // 정렬
                    ,filter: { type: 'text', operator: 'OR', showApplyBtn: true, showClearBtn: true }}); //필터 적용
    T_GRID_COL.push({header: '메뉴이름', name: 'menuNM', width: 150, align: 'center', editor: 'text', sortingType:'desc', sortable : true
                    ,filter: 'select'});
    T_GRID_COL.push({header: '메뉴레벨', name: 'menuLevel', width: 150, align: 'center', editor: 'text', sortingType:'desc', sortable : true});
    T_GRID_COL.push({header: '메뉴URL', name: 'menuURL', width: 200, editor: 'text', sortingType:'desc', sortable : true});
    T_GRID_COL.push({header: '생성일', name: 'insertDT', width: 120, editor: {type:'datePicker',options:{format: 'yyyy-MM-dd'}}, sortingType:'desc', sortable : true});
    T_GRID_COL.push({header: '활성여부', name: 'showYN', width: 100, editor: {type :'select',options: {listItems: [{text:'활성',value:'1'},{text:'비활성화',value:'-1'}]}}, sortingType:'desc', sortable : true
                    ,filter: 'number'});
    /*T_GRID_COL.push({header: '삭제여부', name: 'deleteYN', width: 100, hidden: 1}); //숨겨진 컬럼이 있을 시에 컬럼 순서 변경 불가*/
}

/*조회할 패러미터 정의*/
function setSearchParam(){
    const initParams = new Object();
    initParams.searchKeyword = $("input[name='searchKeyword']").val();
    return initParams;
}

function syncCreateData(){
    let updateRows = grid.getCheckedRows();
    if(updateRows.length>1){
        let updateRowsLevelArr = new Array();
        updateRows.forEach((obj ,idx) => {
            updateRowsLevelArr.push(obj.menuLevel);
        });
        let topParentLevel = Math.min(...updateRowsLevelArr);
        console.log('선택된 행 중에서 최소레벨(부모레벨) : '+topParentLevel);

        let countParent = updateRowsLevelArr.filter(element => topParentLevel  === element).length;
        console.log('선택된 행 중 부모레벨과 동위 레벨의 원소가 몇개 있는지 : ' +countParent)

        let parentUpdateRows = new Array();
        if(countParent==1){//부모레벨의 원소가 한개 있을때
            updateRows.forEach((obj ,idx) => {
                console.log(obj.menuLevel);
                if(topParentLevel==obj.menuLevel){
                    parentUpdateRows.push(obj);
                }
            })
            syncCreateDataRequest(parentUpdateRows)
        }else{
            alert('여러개의 행이 선택되었습니다.')
            return;
        }
    }else{
        syncCreateDataRequest(updateRows)
    }
}

//코드를 따고 행 추가 하기 위한 부분
function syncCreateDataRequest(updateRows){
    $.post(T_GRID_CREATE_URL, '', function(p_data, p_status) {
        if(p_data.result=='Y'){
            if(updateRows.length==1){
                console.log(updateRows[0]);
                console.log(updateRows[0].rowKey);
                // grid.appendRow 앞에 붙이기
                grid.prependRow( // 뒤에 붙이기
                    {
                        menuCD : p_data.menuCD,
                        parentCD : updateRows[0].menuCD,
                        menuLevel : updateRows[0].menuLevel+1
                    }
                    ,{parentRowKey:updateRows[0].rowKey}
                )
            }
            else{
                grid.prependRow({
                    menuCD : p_data.menuCD,
                    menuLevel : 1
                })
            }
        }else{
            alert('네트워크 문제로 작동이 중지되었습니다.');
        }
    },"JSON");
}