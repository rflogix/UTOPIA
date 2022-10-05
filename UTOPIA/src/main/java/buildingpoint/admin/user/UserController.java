package buildingpoint.admin.user;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import buildingpoint.admin.common.GC;

@Controller
@RequestMapping(value = "/"+GC.도메인)
public class UserController {

	@Autowired
	private UserService userService;
	
	@RequestMapping("/login")
	public String 로그인_페이지() throws Exception {
		return "/login";
	}
	
	@RequestMapping("/user/login")
	public @ResponseBody HashMap<String, Object> 사용자_로그인(@RequestParam HashMap<String, Object> mapParam, HttpServletRequest request) throws Exception {
		return userService.로그인(mapParam, request);
	}
	
	@RequestMapping("/user/logout")
	public @ResponseBody HashMap<String, Object> 사용자_로그아웃(HttpSession session) throws Exception {
		return userService.로그아웃(session);
	}
}