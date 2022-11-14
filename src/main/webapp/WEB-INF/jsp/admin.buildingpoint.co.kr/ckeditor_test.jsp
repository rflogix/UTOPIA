<jsp:directive.page contentType="text/html;charset=UTF-8"/>
<%
/***********************************************************************************
* Copyright (C)RFLOGIX since 2010.08.24 (rflogix@rflogix.com)
************************************************************************************
* ○ 파일	: index.jsp
* ● 설명	: 초기화면
***********************************************************************************/
%>
<!DOCTYPE html>
<html>
	<head>
	    <meta charset="utf-8">
        <title>CKEditor</title>
		<jsp:directive.include file="page_head.jsp"/>
		<script src="/js/ckeditor_test.js<%= 리소스버젼 %>" type="text/javascript"></script>
	</head>
	<body>
		<jsp:directive.include file="page_header.jsp"/>
		<style>
		    .editor_btn{
		        cursor:pointer;
                color:blue;
                margin: 10px;
                width: 100px;
                border: 1px solid black;
                border-radius: 15px;
                display:flex;
                justify-content:center;
                align-items:center;
		    }
        </style>
	    <div style='display:flex; flex-direction: column; justify-content:center; align-items: center;'>
	        <div id='sectionHtml1Container' class='sectionContainer' style='width: 500px; margin: 20px;'>
                <div id="sectionHtml1" class='sectionEditor'>
                </div>
                <div style='display:flex; justify-content:flex-end;'>
                    <div class='editor_btn' onclick='editorStart(this);'>
                        편집시작
                    </div>
                </div>
            </div>
            <div id='sectionHtml2Container' class='sectionContainer' style='width: 500px; margin: 20px;'>
                <div id="sectionHtml2" class='sectionEditor'>
                </div>
                <div style='display:flex; justify-content:flex-end;'>
                    <div class='editor_btn' onclick='editorStart(this);' >
                        편집시작
                    </div>
                </div>
            </div>
        </div>
        <div>
            <textarea id='ckeditor_normal' class="board" name="ContentHTML" ></textarea>
        </div>
        <script>
            CKEDITOR.replace('ckeditor_normal', {
                height: 500,
                filebrowserUploadUrl : "/ckeditor/file_upload?1=1" //업로드 될시 업로드 컨트롤러 호출 하기 위한 parameter. inline 기능 일시에 이미지가 잘 들어가고 있는 것으로 보이지만 base64 인코딩으로 뽑혀져 들어감. 해당 기능과 관계 없다.
            });
            function editorStart(p_obj){
                $(p_obj).html('편집종료')
                var editor = $(p_obj).parents('.sectionContainer').find('.sectionEditor')
                console.log(editor)
                CKEDITOR.instances[$(editor).attr('id')].destroy();
                CKEDITOR.inline($(editor).attr('id'));
                $(editor).attr('contenteditable','true');
                $(editor).attr('aria-readonly','false');
                $(p_obj).attr('onclick','editorStop(this)')
            }
            function editorStop(p_obj){
                $(p_obj).html('편집시작')
                var editor = $(p_obj).parents('.sectionContainer').find('.sectionEditor')
                $(editor).attr('contenteditable','false');
                $(p_obj).attr('onclick','editorStart(this)')
                menuDomUpdate();
            }
        </script>
		<jsp:directive.include file="page_footer.jsp"/>
	</body>
</html>