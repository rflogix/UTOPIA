/***********************************************************************************
* Copyright (C)RFLOGIX since 2010.08.24 (rflogix@rflogix.com)
************************************************************************************
* ● 프로젝트	: 크로닉-관리자
* ○ 파일	: ckeditor_test.js
* ○ 생성	: 2014.12.15(월요일)
* ○ 최종변경	: 2022.11.10(금요일)
************************************************************************************/

$(document).ready(function() {
    CKEDITOR.disableAutoInline = true;
    menuDomSetting();
});

function menuDomSetting(){
    let strParam = '';
    strParam += '&menuCD=800000002'

    $.post("/menu/search_menu", strParam, function(p_data, p_status) {
        if(p_data.result){
            if(p_data.data[0].sectionHtml1){
                //$('#sectionHtml1').html(p_data.data[0].sectionHtml1)
                CKEDITOR.inline( 'sectionHtml1' );
                CKEDITOR.instances["sectionHtml1"].setData(p_data.data[0].sectionHtml1);
            }
            if(p_data.data[0].sectionHtml2){
                //$('#sectionHtml2').html(p_data.data[0].sectionHtml2)
                CKEDITOR.inline( 'sectionHtml2' );
                CKEDITOR.instances["sectionHtml2"].setData(p_data.data[0].sectionHtml2);
            }
        }
    }, "JSON").fail(function(a,b,c){
        alert('네트워크 상의 오류로 처리되지 못했습니다.')
    });
}

function menuDomUpdate() {
    //html개행문자(&nbsp;) 제거 하는 부분은 컨트롤러에서 GF의 htmlTagRemoveString에서 수행함
    var editorContent1 = CKEDITOR.instances["sectionHtml1"].getData();
    var convertContent1 = editorContent1.trim().replace(/(<([^>]+)>)/ig,"").replaceAll(/\s\s+/g, ' ');

    var editorContent2 = CKEDITOR.instances["sectionHtml2"].getData();
    var convertContent2 = editorContent2.trim().replace(/(<([^>]+)>)/ig,"").replaceAll(/\s\s+/g, ' ');

    let strParam = '';
    strParam += '&menuCD=800000002'
    strParam += '&sectionHtml1='+encodeURIComponent($('#sectionHtml1').html())
    strParam += '&sectionHtml2='+encodeURIComponent($('#sectionHtml2').html())
    strParam += '&sectionText1='+encodeURIComponent(convertContent1)
    strParam += '&sectionText2='+encodeURIComponent(convertContent2)

    $.post('/menu/update_menu', strParam, function(p_data, p_status) {
        if(p_data.result=='Y'){
            alert('저장되었습니다.')
        }else{
            alert('저장실패하였습니다.')
        }
    },"JSON");
}