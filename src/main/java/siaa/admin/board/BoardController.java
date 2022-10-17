package siaa.admin.board;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import config.custom.GF;
import siaa.admin.common.DomainService;
import siaa.admin.common.GC;

@Controller
@RequestMapping(value = "/"+GC.도메인)
public class BoardController {
	@Autowired
	private DomainService domainService;
	
	@Autowired
	private BoardService boardService;
	
	@RequestMapping("/board_summary")
	public String 게시판_썸머리_페이지(HttpServletRequest request, Model model) throws Exception {
		model.addAttribute("main_menu_cd", 2); // 노가다 코드 임시로 추가 @@@@@@@@@@@
		model.addAttribute("sub_menu_cd", 1); // 노가다 코드 임시로 추가 @@@@@@@@@@@
		//request.setAttribute("main_menu_cd", 2);
		//request.setAttribute("sub_menu_cd", 1);
		return domainService.페이지이동(request, "/board_summary");
	}
	
	@RequestMapping("/board/grid_search")
	public @ResponseBody HashMap<String, Object> 그리드조회(@RequestParam HashMap<String, Object> mapParam) throws Exception {
		return boardService.그리드조회(mapParam);
	}
	
	@RequestMapping("/board/update")
	public @ResponseBody HashMap<String, Object> 게시판_업데이트(@RequestParam HashMap<String, Object> mapParam, HttpSession session) throws Exception {
		return boardService.업데이트(mapParam, session);
	}
	
	@RequestMapping("/board/image_upload")
	public @ResponseBody String 게시판_이미지업로드(HttpServletRequest request, @RequestParam MultipartFile[] upload) throws Exception {
		HashMap<String, Object> mapResult = boardService.이미지업로드(request, upload);
		String strResult = "<script>alert('이미지를 업로드하지 못하였습니다');</script>";
		if (GF.getString(mapResult.get("result")).equals("Y")) {
			strResult = "<script>window.parent.CKEDITOR.tools.callFunction('"+ mapResult.get("CKEditorFuncNum") +"', '" + mapResult.get("RealURL") + "');</script>";
		}
		
		return strResult;
	}
}