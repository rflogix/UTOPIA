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
function settingTGrid(gridElement,treeHeaderColumn){
    if(grid != null){ // 그리드가 있을 시 없애준다 검색 조회 할때마다 그리드를 새로 띄우기 때문
        grid.destroy();
    }
    grid = new tui.Grid({
        el: document.getElementById(gridElement),
        language: 'ko',
        columns : T_GRID_COL,
        columnOptions: { //컬럼사이즈 변경 가능
            resizable: true,
        },
        rowHeaders: ['checkbox'], //체크박스 컬럼 추가
        bodyHeight: 500,
        scrollY: true,
        draggable: true, // 컬럼 드래그 앤 드롭
        pageOptions : {
            perPage : perPage
        },
        data : getDataSource(T_GRID_URL),
        //treeHeaderColumn 을 빈값으로 주었을때 트리 비활성화됨
        //복수의 컬럼에 트리 활성화 불가
        //트리 내부에서 따로 컬럼 세팅 불가
        treeColumnOptions: {
            name: treeHeaderColumn,
            useIcon: true, // 트리 아이콘 뷰
            //useCascadingCheckbox: true 일시에 부모행 체크시 모든 하위행 동시에 체크됨. < %중요% 하위행이 모두 클릭되었을 시에 부모행도 동시에 체크됨 >
            useCascadingCheckbox: true,
        },

    });
    /*'checkbox 클릭이벤트 처리하는 부분'*/
    grid.on('check', (ev) => {
        console.log('checkbox 클릭이벤트 처리하는 부분',ev)
        //로우 편집 이벤트를 종료 해주어야 변경완료로 처리됨
        grid.finishEditing(ev.rowKey, '');
    })
}

/*검색 부분 */
function clickSearchTgrid() {
    var strURL = '';
    var page = '1';

    strURL = T_GRID_URL;
    let strParam = '';
    strParam += '&page='+page;
    strParam += '&perPage='+perPage;
    strParam += '&searchKeyword='+$("input[name='searchKeyword']").val();

    $.post(strURL, strParam, function(p_data, p_status) {
        if(p_data.result){
            console.log(p_data)
            const pagination = grid.getPagination();
            grid.resetData(p_data.data.contents);
            pagination.reset(p_data.data.pagination.totalCount); //가져온 데이터 바탕으로 페이지네이션 리셋해주어야 함
        }else{

        }
    }, "JSON").fail(function(a,b,c){
        alert('네트워크 상의 오류로 처리되지 못했습니다.')
    });
}

/* 데이터소스 세팅 -- 굳이 따로 빼야되는지 모르겠음. */
function getDataSource(url){
    const dataSource = {
        contentType: 'application/json',
        api: {
            readData: {
                url        : T_GRID_URL
              , method     : 'GET'
            },
        },
        hideLoadingBar: true // 로딩바 없애기
    }
    return dataSource;
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
    console.log(grid.getModifiedRows());
    let updateRows = grid.getCheckedRows();
    console.log(updateRows)
    if(deleteYN==1){
        updateRows.forEach((obj, idx) => {
            obj.deleteYN = 1;
        });
    }else{
        updateRows.forEach((obj ,idx) => {
            if(grid.getParentRow(obj.rowKey)){
                //테이블마다 계층과 parentCD 등 기본적인 트리에 필요한 컬럼을 규격화해놓으면 범용성 있게 활용할 수 있을 것으로 생각됨.
                obj.menuLevel = grid.getDepth(obj.rowKey);
                obj.parentCD  = grid.getParentRow(obj.rowKey).menuCD;
            }else{
                obj.menuLevel = 1;
                obj.parentCD  = obj.menuCD;
            }
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
