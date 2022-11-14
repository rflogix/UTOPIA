package buildingpoint.user;

import buildingpoint.code.CodeController;
import buildingpoint.common.GC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;

@Controller
@RequestMapping(value = "/{subDomain}."+GC.도메인)
public class UserGridController {

	@Autowired
	private UserGridService userGridService;
	@Autowired
	private CodeController codeController;

	@RequestMapping("/user/search_user_list")
	public @ResponseBody HashMap<String, Object> searchUserList(@RequestParam HashMap<String, Object> mapParam, HttpServletRequest request) throws Exception {
		LinkedHashMap<String, Object> returnMap = new LinkedHashMap<String, Object>();
		LinkedHashMap<String, Object> dataMap = new LinkedHashMap<String, Object>();
		LinkedHashMap<String, Object> paginationMap = new LinkedHashMap<String, Object>();

		//페이지네이션을 위해 현재 페이지
		int start = (Integer.parseInt(String.valueOf(mapParam.get("page")))
				* Integer.parseInt(String.valueOf(mapParam.get("perPage"))))
				- Integer.parseInt(String.valueOf(mapParam.get("perPage")));
		mapParam.put("start",start);

		ArrayList<UserDTO> arrUser = userGridService.searchUserList(mapParam);
		if(arrUser.size()!=0){
			returnMap.put("result",true);
			dataMap.put("contents",userGridService.searchUserList(mapParam));

			paginationMap.put("page", Integer.parseInt(String.valueOf(mapParam.get("page"))));
			paginationMap.put("totalCount", Integer.parseInt(String.valueOf(userGridService.searchUserTotalCount(mapParam, request))));
			dataMap.put("pagination", paginationMap);
			returnMap.put("data", dataMap);
		}
		else{
			returnMap.put("result",false);
		}
		return returnMap;
	}

	@RequestMapping("/user/search_user_tabulator")
	public @ResponseBody HashMap<String, Object> searchUserTabulator(@RequestParam HashMap<String, Object> mapParam, HttpServletRequest request) throws Exception {
		LinkedHashMap<String, Object> returnMap = new LinkedHashMap<String, Object>();
		LinkedHashMap<String, Object> dataMap = new LinkedHashMap<String, Object>();
		LinkedHashMap<String, Object> paginationMap = new LinkedHashMap<String, Object>();

		//페이지네이션을 위해 현재 페이지
		int start = (Integer.parseInt(String.valueOf(mapParam.get("page")))
				* Integer.parseInt(String.valueOf(mapParam.get("perPage"))))
				- Integer.parseInt(String.valueOf(mapParam.get("perPage")));
		mapParam.put("start",start);

		ArrayList<UserDTO> arrUser = userGridService.searchUserList(mapParam);
		if(arrUser.size()!=0){
			returnMap.put("result",true);

			int totalCount = userGridService.searchUserTotalCount(mapParam, request);
			BigDecimal totalCountDecimal = new BigDecimal(totalCount);
			BigDecimal sizeDecimal = new BigDecimal(String.valueOf(mapParam.get("perPage")));
			BigDecimal last_page = totalCountDecimal.divide(sizeDecimal,0, RoundingMode.UP);

			returnMap.put("last_page", last_page);
			returnMap.put("data", arrUser);
		}
		else{
			returnMap.put("result",false);
		}
		return returnMap;
	}

	@RequestMapping("/user/create_user_list")
	public @ResponseBody HashMap<String, Object> createUserList(@RequestParam HashMap<String, Object> mapParam, HttpServletRequest request) throws Exception {
		System.out.println("createUserList");

		mapParam.put("userCD", codeController.makeCodeCD(GC.CODE_TYPE_USER,GC.CODE_MAX_USER,""));

		int result = userGridService.createUserList(mapParam, request);
		LinkedHashMap<String, Object> returnMap = new LinkedHashMap<String, Object>();

		if(result > 0){
			returnMap.put("result", "Y");
		}
		return returnMap;
	}
	@RequestMapping("/user/update_user_list")
	public @ResponseBody HashMap<String, Object> updateUserList(@RequestParam HashMap<String, Object> mapParam, HttpServletRequest request) throws Exception {
		System.out.println("updateUserList");

		int result = userGridService.updateUserList(mapParam, request);
		LinkedHashMap<String, Object> returnMap = new LinkedHashMap<String, Object>();
		if(result > 0){
			returnMap.put("result", "Y");
		}
		return returnMap;
	}
	@RequestMapping("/user/delete_user_list")
	public @ResponseBody HashMap<String, Object> deleteUserList(@RequestParam HashMap<String, Object> mapParam, HttpServletRequest request) throws Exception {
		System.out.println("deleteUserList");
		System.out.println(mapParam);
		LinkedHashMap<String, Object> returnMap = new LinkedHashMap<String, Object>();
		System.out.println(returnMap);
		return returnMap;
	}
}