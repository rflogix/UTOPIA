package siaa.user;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import siaa.common.GC;
import siaa.common.GF;

@Controller
@RequestMapping(value = "/{subDomain}."+GC.도메인)
public class UserController {
	@Autowired
	private UserService userService;
	
	@RequestMapping("/login")
	public String 로그인_페이지(HttpServletRequest request) throws Exception {
		return GF.페이지이동(request, "/login");
	}
	
	@RequestMapping("/user_summary")
	public String 사용자_썸머리_페이지(HttpServletRequest request, Model model) throws Exception {
		model.addAttribute("main_menu_cd", 1); // 노가다 코드 임시로 추가 @@@@@@@@@@@
		model.addAttribute("sub_menu_cd", 1); // 노가다 코드 임시로 추가 @@@@@@@@@@@
		return GF.페이지이동(request, "/user_summary");
	}
	
	@RequestMapping("/user/login")
	public @ResponseBody HashMap<String, Object> 사용자_로그인(@RequestParam HashMap<String, Object> mapParam, HttpServletRequest request, @PathVariable String subDomain) throws Exception {
		return userService.로그인(mapParam, request);
	}
	
	@RequestMapping("/user/logout")
	public @ResponseBody HashMap<String, Object> 사용자_로그아웃(HttpSession session) throws Exception {
		return userService.로그아웃(session);
	}

	@RequestMapping("/user/login_user")
	public @ResponseBody HashMap<String, Object> 사용자_로그인사용자(HttpSession session) throws Exception {
		return userService.로그인사용자(session);
	}
	
	@RequestMapping("/user/update")
	public @ResponseBody HashMap<String, Object> 사용자_업데이트(@RequestParam HashMap<String, Object> mapParam, HttpSession session) throws Exception {
		return userService.업데이트(mapParam, session);
	}
	
	@RequestMapping("/user/grid_search")
	public @ResponseBody HashMap<String, Object> 그리드조회(@RequestParam HashMap<String, Object> mapParam) throws Exception {
		return userService.그리드조회(mapParam);
	}
}