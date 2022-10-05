package buildingpoint.admin.category;

import java.util.HashMap;
import java.util.List;

import org.egovframe.rte.psl.dataaccess.mapper.Mapper;

@Mapper
public interface CategoryMapper {
	List<CategoryDTO> selectCategory(HashMap<String, Object> param) throws Exception;
	//List<CategoryDTO> selectCategory(CategoryDTO param) throws Exception;
}
