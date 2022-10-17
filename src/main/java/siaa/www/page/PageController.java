package siaa.www.page;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import siaa.www.common.GC;

@Controller
@RequestMapping(value = "/"+GC.도메인)
public class PageController {
	
	@Autowired
	private PageService pageService;
	
	@RequestMapping("/page/setting")
	public @ResponseBody HashMap<String, Object> 페이지_세팅(@RequestParam HashMap<String, Object> mapParam) throws Exception {
		return pageService.페이지세팅(mapParam);
	}
	
}