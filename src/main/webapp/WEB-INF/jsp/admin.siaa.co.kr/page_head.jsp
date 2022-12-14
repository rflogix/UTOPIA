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
<title>한국증권정보협회 관리자</title>

<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<link rel="icon" type="image/x-icon" href="/image/favicon.ico">

<!-- jquery -->
<script src="/js/jquery/jquery-3.4.1.min.js"></script>
<script src="/js/jquery-ui-1.12.1/jquery-ui.min.js" type="text/javascript"></script>
<link  href="/js/jquery-ui-1.12.1/jquery-ui.min.css" rel="stylesheet" type="text/css"/>

<%-- swiper --%>
<script src="/js/swiper-5.3.6/swiper.min.js"></script>
<link href="/js/swiper-5.3.6/swiper.min.css" rel="stylesheet" type="text/css"/>

<%-- slickgrid - 2019-12-18 --%>
<script src="/js/slickgrid/slickgrid.js"></script>

<%-- ckeditor - 2017.01.10 : ckeditor.js 파일 이름을 수정하면 에러남 --%>
<script src="/js/ckeditor/ckeditor.js<%= 리소스버젼 %>" type="text/javascript"></script>

<%-- Font Awesome Free 5.11.2 --%>
<link href="/css/font-awesome/css/all.css<%= 리소스버젼 %>" rel="stylesheet" type="text/css"/>

<%-- 달력 --%>
<script src="/js/calendar/calendar.js<%= 리소스버젼 %>" type="text/javascript"></script>

<!-- 공통 -->
<script src="/js/common.js<%= 리소스버젼 %>" type="text/javascript"></script>
<link href="/css/common.css<%= 리소스버젼 %>" rel="stylesheet" type="text/css"/>
