package buildingpoint.admin.common;

public class GC extends config.custom.GC {
	
	public static final String 도메인 = "admin.buildingpoint.co.kr";
	public static final String 슈퍼관리자암호 = "@@";
	public static final int 세션유지시간 = 60; // 초단위이나 최소는 1분이므로 60초 이상
	
	
	
	
	/***********************************************************************************
	* 게시판 (tb_board) 관련
	***********************************************************************************/
	
	// 게시판 구분
	public static final int		BOARD_TYPE_NOTICE		= 10;	// 공지사항
	public static final int		BOARD_TYPE_FAQ			= 20;	// FAQ
	public static final int		BOARD_TYPE_QNA			= 30;	// QNA (1:1)
	public static final int		BOARD_TYPE_FREE			= 40;	// 자유게시판(커뮤니티)
	public static final int		BOARD_TYPE_REVIEW		= 50;	// 리뷰
	public static final int		BOARD_TYPE_AFFILIATE	= 60;	// 제휴
	public static final int		BOARD_TYPE_ALARM		= 90;	// 알림
	
	public static final int		BOARD_TYPE_MAX			= 99999999;	// 리뷰
}