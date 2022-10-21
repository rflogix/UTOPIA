package siaa.common;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/{subDomain}."+GC.도메인)
public class DomainController {
	
	@RequestMapping("")
	public String 인덱스_페이지(HttpServletRequest request, Model model) throws Exception {
		model.addAttribute("main_menu_cd", 0); // 노가다 코드 임시로 추가 @@@@@@@@@@@
		model.addAttribute("sub_menu_cd", 0); // 노가다 코드 임시로 추가 @@@@@@@@@@@
		return GF.페이지이동(request, "/index");
	}
	
}