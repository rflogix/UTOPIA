package buildingpoint.menu;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;

@Slf4j
@Service
public class MenuService {
	
	@Autowired
	private MenuMapper menuMapper;

	public ArrayList<MenuDTO> searchMenu(HashMap<String, Object> mapParam) throws Exception {
		ArrayList<MenuDTO> arrReturn = new ArrayList<MenuDTO>();
		try {
			ArrayList<MenuDTO> listMenu = menuMapper.selectMenu(mapParam);
			arrReturn = listMenu;
		} catch(Exception e) {
			log.error("{}", e.toString());
		}
		return arrReturn;
	}
	public ArrayList<MenuDTO> searchMenuList(HashMap<String, Object> mapParam, HttpServletRequest request) throws Exception {
		ArrayList<MenuDTO> arrReturn = new ArrayList<MenuDTO>();
		try {
			int start = (Integer.parseInt(String.valueOf(mapParam.get("page")))
					* Integer.parseInt(String.valueOf(mapParam.get("perPage"))))
					- Integer.parseInt(String.valueOf(mapParam.get("perPage")));
			mapParam.put("start",start);
			ArrayList<MenuDTO> listMenu = menuMapper.selectMenuList(mapParam);
			arrReturn = listMenu;
		} catch(Exception e) {
			log.error("{}", e.toString());
		}
		return arrReturn;
	}

	public int searchMenuTotalCount(HashMap<String, Object> mapParam, HttpServletRequest request) throws Exception {
		int menuTotalCount = 0;
		try {
			menuTotalCount = menuMapper.searchMenuTotalCount(mapParam);
		} catch(Exception e) {
			log.error("{}", e.toString());
		}
		return menuTotalCount;
	}
	public int createMenu(HashMap<String, Object> mapParam, HttpServletRequest request) throws Exception {
		int result = 0;
		try {
			result = menuMapper.createMenu(mapParam);
		} catch(Exception e) {
			log.error("{}", e.toString());
		}
		return result;
	}
	public int updateMenu(HashMap<String, Object> mapParam, HttpServletRequest request) throws Exception {
		int result = 0;
		try {
			result = menuMapper.updateMenu(mapParam);
		} catch(Exception e) {
			log.error("{}", e.toString());
		}
		return result;
	}

	public ArrayList<MenuDTO> searchMenuTabulator(HashMap<String, Object> mapParam, HttpServletRequest request) throws Exception {
		ArrayList<MenuDTO> arrReturn = new ArrayList<MenuDTO>();
		try {
			int start = (Integer.parseInt(String.valueOf(mapParam.get("page")))
					* Integer.parseInt(String.valueOf(mapParam.get("perPage"))))
					- Integer.parseInt(String.valueOf(mapParam.get("perPage")));
			mapParam.put("start",start);
			ArrayList<MenuDTO> listMenu = menuMapper.searchMenuTabulator(mapParam);
			arrReturn = listMenu;
		} catch(Exception e) {
			log.error("{}", e.toString());
		}
		return arrReturn;
	}
}