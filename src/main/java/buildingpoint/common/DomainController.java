package buildingpoint.common;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/{subDomain}."+GC.도메인)
public class DomainController {
	
	@RequestMapping("")
	public String 인덱스_페이지(HttpServletRequest request, Model model) throws Exception {
		return GF.페이지이동(request, "/index");
	}
	
}