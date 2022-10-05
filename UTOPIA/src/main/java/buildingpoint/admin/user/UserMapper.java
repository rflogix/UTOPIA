package buildingpoint.admin.user;

import java.util.HashMap;
import java.util.List;

import org.egovframe.rte.psl.dataaccess.mapper.Mapper;

@Mapper
public interface UserMapper {
	List<UserDTO> selectUser(HashMap<String, Object> param) throws Exception;
	//HashMap<?, ?> selectUser(HashMap<?, ?> mapParam) throws Exception;
}
