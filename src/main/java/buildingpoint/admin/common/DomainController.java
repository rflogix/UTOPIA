package buildingpoint.admin.common;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/"+GC.도메인)
public class DomainController {
	
	@Autowired
	private DomainService domainService;
	
	@RequestMapping("")
	public String 인덱스_페이지(HttpServletRequest request) throws Exception {
		return domainService.페이지이동(request, "/index");
	}
}