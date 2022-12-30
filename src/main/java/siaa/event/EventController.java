package siaa.event;

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
public class EventController {
	@Autowired
	private EventService eventService;
	
	@RequestMapping("/page_summary/협회행사일정")
	public String 페이지관리_협회행사일정(HttpServletRequest request, Model model) throws Exception {
		model.addAttribute("main_menu_cd", 3); // 노가다 코드 임시로 추가 @@@@@@@@@@@
		model.addAttribute("sub_menu_cd", 3); // 노가다 코드 임시로 추가 @@@@@@@@@@@
		return GF.페이지이동(request, "/페이지관리/협회행사일정");
	}
	
	@RequestMapping("/event/search")
	public @ResponseBody HashMap<String, Object> 이벤트조회(@RequestParam HashMap<String, Object> mapParam) throws Exception {
		return eventService.이벤트조회(mapParam);
	}
	
	@RequestMapping("/event/update")
	public @ResponseBody HashMap<String, Object> 업데이트(@RequestParam HashMap<String, Object> mapParam, HttpSession session) throws Exception {
		return eventService.업데이트(mapParam, session);
	}
}