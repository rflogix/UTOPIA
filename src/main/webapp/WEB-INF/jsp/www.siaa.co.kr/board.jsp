<jsp:directive.page contentType="text/html;charset=UTF-8"/>

	<!-- 검색 -->
	<div class="search_wrap">
		<select class="search_type">
			<option value="titleText_like">제목</option>
			<option value="writeUserNM_like">작성자</option>
			<option value="contentText_like">내용</option>
		</select>
		<input class="search_word" placeholder="검색어를 입력하세요." />
		<div class="btn_search" onclick="searchBoard();">
			<i class="fas fa-search"></i>
		</div>
	</div>
	
	<!-- 라벨 -->
	<div class="label_wrap">
		<div class="label">
			<div class="title">글제목</div>
			<div class="user">작성자</div>
			<div class="date">등록일</div>
			<div class="count">조회</div>
		</div>
	</div>
	
	<!-- 게시물 -->
	<div class="board_wrap">
		<!--
		<div class="board">
			<div class="title">글제목</div>
			<div class="user">작성자</div>
			<div class="date">등록일</div>
			<div class="count">조회</div>
		</div>
		<div class="board">
			<div class="title">글제목</div>
			<div class="user">작성자</div>
			<div class="date">등록일</div>
			<div class="count">조회</div>
		</div>
		-->
		<div class="empty"></div>
	</div>
	
	<!-- 페이지 -->
	<div class="page_wrap">
		<!--<div class="prev">
			&lt;
		</div>-->
		<div class="page select">
			1
		</div>
		<!--
		<div class="page">
			2
		</div>
		<div class="page">
			3
		</div>-->
		<!-- <div class="next">
			&gt;
		</div>-->
	</div>