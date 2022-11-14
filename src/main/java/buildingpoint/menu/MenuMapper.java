package buildingpoint.menu;

import org.egovframe.rte.psl.dataaccess.mapper.Mapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Mapper
public interface MenuMapper {
	ArrayList<MenuDTO> selectMenu(HashMap<String, Object> param) throws Exception;
	ArrayList<MenuDTO> selectMenuList(HashMap<String, Object> param) throws Exception;
	int searchMenuTotalCount(HashMap<String, Object> param) throws Exception;
	int createMenu(HashMap<String, Object> param) throws Exception;
	int updateMenu(HashMap<String, Object> param) throws Exception;

	ArrayList<MenuDTO> searchMenuTabulator(HashMap<String, Object> param) throws Exception;
}
