package buildingpoint.admin.category;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import buildingpoint.admin.common.GC;
import buildingpoint.admin.common.DomainService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping(value = "/"+GC.도메인)
public class CategoryController {
	
	@Autowired
	private DomainService domainService;
	
	@Autowired
	private CategoryService categoryService;
	
	@RequestMapping("/menu_management")
	public String 카테고리관리_페이지(HttpServletRequest request, Model model) throws Exception {
		
		// 카테고리 조회
		List<CategoryDTO> listCategory = categoryService.카테고리조회();
		model.addAttribute("listCategory", listCategory);
		
		return domainService.페이지이동(request, "/menu_management");
	}
	
	@RequestMapping("/category/selectPK")
	public @ResponseBody HashMap<String, Object> 카테고리조회_PK(@RequestParam HashMap<String, Object> mapParam) throws Exception {
		HashMap<String, Object> mapReturn = new HashMap<String, Object>();
		mapReturn.put("result", "E");
		
		try {
			List<CategoryDTO> listCategory = categoryService.카테고리조회(mapParam);
			if (listCategory.size() == 1) {
				mapReturn.put("result", "Y");
				mapReturn.put("clsCategory", listCategory.get(0));
				
			} else {
				mapReturn.put("message", "조회된 카테고리가 여러개 입니다");
			}
		} catch(Exception e) {
			log.error("{}", e.toString());
			mapReturn.put("message", "카테고리 조회중 오류가 발생하였습니다");
		}
		
		return mapReturn;
	}
}