package siaa.page;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import siaa.common.GC;
import siaa.common.GF;

@Controller
@RequestMapping(value = "/{subDomain}."+GC.도메인)
public class PageController {
	@Autowired
	private PageService pageService;
	
	@RequestMapping("/page_summary/메인화면")
	public String 페이지관리_메인화면(HttpServletRequest request, Model model) throws Exception {
		model.addAttribute("main_menu_cd", 3); // 노가다 코드 임시로 추가 @@@@@@@@@@@
		model.addAttribute("sub_menu_cd", 1); // 노가다 코드 임시로 추가 @@@@@@@@@@@
		return GF.페이지이동(request, "/페이지관리/메인화면");
	}
	
	@RequestMapping("/page_summary/협회개요")
	public String 페이지관리_협회개요(HttpServletRequest request, Model model) throws Exception {
		model.addAttribute("main_menu_cd", 3); // 노가다 코드 임시로 추가 @@@@@@@@@@@
		model.addAttribute("sub_menu_cd", 2); // 노가다 코드 임시로 추가 @@@@@@@@@@@
		return GF.페이지이동(request, "/페이지관리/협회개요");
	}
	
	@RequestMapping("/page/search")
	public @ResponseBody HashMap<String, Object> 페이지_조회(@RequestParam HashMap<String, Object> mapParam) throws Exception {
		return pageService.페이지조회(mapParam);
	}
	
	@RequestMapping("/page/setting")
	public @ResponseBody HashMap<String, Object> 페이지_세팅(@RequestParam HashMap<String, Object> mapParam) throws Exception {
		return pageService.페이지세팅(mapParam);
	}
	
	@RequestMapping("/page/update")
	public @ResponseBody HashMap<String, Object> 업데이트(@RequestParam HashMap<String, Object> mapParam, HttpSession session) throws Exception {
		return pageService.업데이트(mapParam, session);
	}
	
	@RequestMapping("/page/delete")
	public @ResponseBody HashMap<String, Object> 삭제(@RequestParam HashMap<String, Object> mapParam, HttpSession session) throws Exception {
		return pageService.삭제(mapParam, session);
	}
}