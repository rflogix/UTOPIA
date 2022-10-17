package siaa.www.page;

import java.util.HashMap;
import java.util.List;

import org.egovframe.rte.psl.dataaccess.mapper.Mapper;

@Mapper
public interface PageMapper {
	List<PageDTO> selectPage(HashMap<String, Object> param) throws Exception;
}
