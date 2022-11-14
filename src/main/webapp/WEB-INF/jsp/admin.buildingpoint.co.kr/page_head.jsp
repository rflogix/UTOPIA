<jsp:directive.page contentType="text/html;charset=UTF-8" />
<%
/***********************************************************************************
* Copyright (C)RFLOGIX since 2010.08.24 (rflogix@rflogix.com)
************************************************************************************
* ○ 파일	: page_head.jsp
* ● 설명	: 페이지 공통 head
***********************************************************************************/

String 리소스버젼 = "?v=20220926.1";
%>
<title>어드민</title>

<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

<!-- jquery -->
<script src="/js/jquery/jquery-3.4.1.min.js"></script>

<!-- 공통 -->
<script src="/js/common.js<%= 리소스버젼 %>" type="text/javascript"></script>
<link href="/css/common.css<%= 리소스버젼 %>" rel="stylesheet" type="text/css"/>

<!-- 토스트 그리드 -->
<link rel="stylesheet" href="/js/tui.grid-4.21.6/tui-pagination.css" />
<script src="/js/tui.grid-4.21.6/tui-pagination.js"></script>

<link rel="stylesheet" href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
<script src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script>

<link rel="stylesheet" href="/js/tui.grid-4.21.6/tui.grid-4.21.6.css" />
<script type="text/javascript" src="/js/tui.grid-4.21.6/tui.grid-4.21.6.js"></script>


<%-- font-awesome --%>
<link href="/css/font/font-awesome/css/all.css"		rel="stylesheet" type="text/css"/>

<!-- tabulator -->
<link href="https://unpkg.com/tabulator-tables/dist/css/tabulator.min.css" rel="stylesheet">
<script type="text/javascript" src="https://unpkg.com/tabulator-tables/dist/js/tabulator.min.js"></script>

<!-- CKEditor 4 -->
<!-- <script src="https://cdn.ckeditor.com/4.20.0/standard/ckeditor.js"></script>-->
<script src="/js/ckeditor/ckeditor.js" type="text/javascript"></script>

<!-- muuri -->
<script src="https://cdn.jsdelivr.net/npm/muuri@0.9.5/dist/muuri.min.js"></script>