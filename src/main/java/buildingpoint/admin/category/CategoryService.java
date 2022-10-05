package buildingpoint.admin.category;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CategoryService {
	
	@Autowired
	private CategoryMapper categoryMapper;
	
	public List<CategoryDTO> 카테고리조회(HashMap<String, Object> mapParam) {
		List<CategoryDTO> listCategory = new ArrayList<CategoryDTO>();
		
		try {
			if (mapParam == null) {
				mapParam = new HashMap<String, Object>();
				mapParam.put("deleteYN", -1);
			}
			//CategoryDTO clsParam = (new ObjectMapper()).convertValue(mapParam, CategoryDTO.class);
			listCategory = categoryMapper.selectCategory(mapParam); // (clsParam);
			
		} catch(Exception e) {
			log.error("{}", e.toString());
		}
		
		return listCategory;
	}
	public List<CategoryDTO> 카테고리조회() {
		return 카테고리조회(null);
	}
}
