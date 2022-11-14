package buildingpoint.menu;

import buildingpoint.code.CodeController;
import buildingpoint.common.GC;
import buildingpoint.common.GF;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Controller
@RequestMapping(value = "/{subDomain}."+GC.도메인)
public class MenuController {

	@Autowired
	private MenuService menuService;
	@Autowired
	private CodeController codeController;

	@RequestMapping("/menu/menu_edit_page")
	public String toastTest(HttpServletRequest request) throws Exception {
		return GF.페이지이동(request, "/menu_edit");
	}

	@RequestMapping("/menu/search_menu")
	public @ResponseBody HashMap<String, Object> searchMenu(@RequestParam HashMap<String, Object> mapParam, HttpServletRequest request) throws Exception {
		LinkedHashMap<String, Object> returnMap = new LinkedHashMap<String, Object>();
		ArrayList<MenuDTO> arrMenu = menuService.searchMenu(mapParam);
		if(arrMenu.size()!=0){
			returnMap.put("result",true);
			returnMap.put("data", arrMenu);
		}
		else{
			returnMap.put("result",false);
		}
		return returnMap;
	}

	@RequestMapping("/menu/search_menu_list")
	public @ResponseBody HashMap<String, Object> searchMenuList(@RequestParam HashMap<String, Object> mapParam, HttpServletRequest request) throws Exception {
		LinkedHashMap<String, Object> returnMap = new LinkedHashMap<String, Object>();
		LinkedHashMap<String, Object> dataMap = new LinkedHashMap<String, Object>();
		LinkedHashMap<String, Object> paginationMap = new LinkedHashMap<String, Object>();

		ArrayList<MenuDTO> arrMenu = menuService.searchMenuList(mapParam, request);
		if(arrMenu.size()!=0){
			returnMap.put("result",true);
			dataMap.put("contents",arrMenu);

			paginationMap.put("page", Integer.parseInt(String.valueOf(mapParam.get("page"))));
			paginationMap.put("totalCount", Integer.parseInt(String.valueOf(menuService.searchMenuTotalCount(mapParam, request))));
			dataMap.put("pagination", paginationMap);
			returnMap.put("data", dataMap);
		}
		else{
			returnMap.put("result",false);
		}
		return returnMap;
	}

	@RequestMapping("/menu/create_menu")
	public @ResponseBody HashMap<String, Object> createMenu(@RequestParam HashMap<String, Object> mapParam, HttpServletRequest request) throws Exception {
		System.out.println("createMenu");
		LinkedHashMap<String, Object> returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("menuCD", codeController.makeCodeCD(GC.CODE_TYPE_MENU,GC.CODE_MAX_USER,""));
		returnMap.put("result", "Y");
		return returnMap;
	}

	@RequestMapping("/menu/update_menu")
	public @ResponseBody HashMap<String, Object> updateMenu(@RequestParam HashMap<String, Object> mapParam, HttpServletRequest request) throws Exception {
		int result = 0;
		ArrayList<MenuDTO> arrMenu = menuService.searchMenu(mapParam);

		mapParam.put("sectionText1", GF.htmlTagRemoveString(String.valueOf(mapParam.get("sectionText1"))));
		mapParam.put("sectionText2", GF.htmlTagRemoveString(String.valueOf(mapParam.get("sectionText2"))));

		if(arrMenu.size()==0){
			result = menuService.createMenu(mapParam, request);
		}else{
			result = menuService.updateMenu(mapParam, request);
		}

		LinkedHashMap<String, Object> returnMap = new LinkedHashMap<String, Object>();
		if(result > 0){
			returnMap.put("result", "Y");
		}
		return returnMap;
	}

	@RequestMapping("/menu/delete_menu")
	public @ResponseBody HashMap<String, Object> deleteMenu(@RequestParam HashMap<String, Object> mapParam, HttpServletRequest request) throws Exception {
		System.out.println("deleteMenu");
		System.out.println(mapParam);
		LinkedHashMap<String, Object> returnMap = new LinkedHashMap<String, Object>();
		System.out.println(returnMap);
		return returnMap;
	}

	@RequestMapping("/menu/menu_edit_tabulator")
	public String tabulatorPage() throws Exception {
		return "/tabulator_test";
	}

	@RequestMapping("/menu/search_menu_tabulator")
	public @ResponseBody HashMap<String, Object> searchMenuTabulator(@RequestParam HashMap<String, Object> mapParam, HttpServletRequest request) throws Exception {
		LinkedHashMap<String, Object> returnMap = new LinkedHashMap<String, Object>();
		LinkedHashMap<String, Object> dataMap = new LinkedHashMap<String, Object>();
		LinkedHashMap<String, Object> paginationMap = new LinkedHashMap<String, Object>();

		ArrayList<MenuDTO> arrMenu = menuService.searchMenuList(mapParam, request);
		menuService.searchMenuTotalCount(mapParam, request);
		int totalCount = menuService.searchMenuTotalCount(mapParam, request);
		BigDecimal totalCountDecimal = new BigDecimal(totalCount);
		BigDecimal sizeDecimal = new BigDecimal(String.valueOf(mapParam.get("perPage")));
		System.out.println(totalCount);
		BigDecimal last_page = totalCountDecimal.divide(sizeDecimal,0, RoundingMode.UP);
		System.out.println(last_page);
		if(arrMenu.size()!=0){
			returnMap.put("last_page", last_page);
			returnMap.put("data", arrMenu);
		}
		else{
			returnMap.put("result",false);
		}
		return returnMap;
	}
}