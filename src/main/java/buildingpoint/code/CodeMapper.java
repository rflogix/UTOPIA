package buildingpoint.code;

import org.egovframe.rte.psl.dataaccess.mapper.Mapper;
import java.util.HashMap;
import java.util.List;

@Mapper
public interface CodeMapper {
	List<CodeDTO> selectCode(HashMap<String, Object> mapParam) throws Exception;
	int updateCode(HashMap<String, Object> mapParam) throws Exception;
	int insertCode(HashMap<String, Object> mapParam) throws Exception;
}
