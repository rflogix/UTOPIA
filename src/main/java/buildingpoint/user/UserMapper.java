package buildingpoint.user;

import java.util.HashMap;
import java.util.List;

import org.egovframe.rte.psl.dataaccess.mapper.Mapper;

@Mapper
public interface UserMapper {
	List<UserDTO> selectUser(HashMap<String, Object> param) throws Exception;
	long insertUser(HashMap<String, Object> param) throws Exception;
	int updateUser(HashMap<String, Object> param) throws Exception;
}
