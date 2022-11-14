/***********************************************************************************
* Copyright (C)RFLOGIX since 2010.08.24 (rflogix@rflogix.com)
************************************************************************************
* ● 프로젝트	: 크로닉-관리자
* ○ 파일	: toast_test.js
* ○ 생성	: 2014.12.15(월요일)
* ○ 최종변경	: 2022.10.21(금요일)
************************************************************************************/
var T_GRID_URL = '/menu/search_menu_tabulator';
var T_GRID_URL_USER = '/user/search_user_tabulator';
var T_GRID_CREATE_URL = '/menu/create_menu';
var T_GRID_UPDATE_URL = '/menu/update_menu';
var T_GRID_DELETE_URL = '/menu/delete_menu';
var T_GRID_MODIFY_URL = '/menu/modify_menu';
var perPage = '10';

$(document).ready(function() {
    settingTabulatorColumn();
    settingTabulatorColumnUser();
    settingTabulatorGrid('grid')
});

/*각 페이지마다 정의되는 부분*/
var TABULATOR_COL;
function settingTabulatorColumn(){
    /*컬럼세팅*/
    TABULATOR_COL = new Array();
    TABULATOR_COL.push({title: 'chk', field: 'chk', hozAlign: 'center', width: 50,  editor:true, formatter:"tickCross"});
    TABULATOR_COL.push({title: '메뉴코드', field: 'menuCD'   ,sorter:"number", width: 150, hozAlign: 'center'});
    TABULATOR_COL.push({title: '메뉴이름', field: 'menuNM'   ,sorter:"string", width: 150, hozAlign: 'center', editor:"input"});
    TABULATOR_COL.push({title: '메뉴레벨', field: 'menuLevel',sorter:"number", width: 150, hozAlign: 'center'});
    TABULATOR_COL.push({title: '메뉴URL', field: 'menuURL'  ,sorter:"string", width: 200, hozAlign: 'center'});
    TABULATOR_COL.push({title: '생성일', field: 'insertDT',  sorter:"string", width: 120, hozAlign: 'center'});
    TABULATOR_COL.push({title: '삭제여부', field: 'deleteYN' ,sorter:"number", width: 100, hozAlign: 'center', editor:"select", editorParams:{values:{"1":"삭제", "-1":"활성", "unknown":"Unknown"}}});
}

function setSearchParam(){
    const initParams = new Object();
    initParams.searchKeyword = $("input[name='searchKeyword']").val();
    return initParams;
}

function syncCreateData(){
    let updateRows = grid.getSelectedData();
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
                grid.addRow(
                    {
                        menuCD : p_data.menuCD,
                        parentCD : updateRows[0].menuCD,
                        menuLevel : updateRows[0].menuLevel+1
                    }
                    , true // 앞에 붙일것인지 뒤에 붙일것인지
                    //,{parentRowKey:updateRows[0].rowKey}
                )
            }
            else{
                grid.addRow({
                    menuCD : p_data.menuCD,
                    menuLevel : 1
                }, false )
            }
        }else{
            alert('네트워크 문제로 작동이 중지되었습니다.');
        }
    },"JSON");
}


var TABULATOR_COL_USER;
function settingTabulatorColumnUser(){
    /*컬럼세팅*/
    TABULATOR_COL_USER = new Array();
    TABULATOR_COL_USER.push({title: '유저코드', field: 'userCD'   ,sorter:"string", width: 150, hozAlign: 'center'});
    TABULATOR_COL_USER.push({title: '유저ID', field: 'userID'   ,sorter:"string", width: 150, hozAlign: 'center', editor:"input"});
    TABULATOR_COL_USER.push({title: '유저네임', field: 'userNM',sorter:"string", width: 150, hozAlign: 'center'});
}