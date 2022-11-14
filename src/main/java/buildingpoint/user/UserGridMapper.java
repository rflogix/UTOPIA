package buildingpoint.user;

import org.egovframe.rte.psl.dataaccess.mapper.Mapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Mapper
public interface UserGridMapper {
	ArrayList<UserDTO> searchUserList(HashMap<String, Object> param) throws Exception;
	//HashMap<?, ?> selectUser(HashMap<?, ?> mapParam) throws Exception;
	int searchUserTotalCount(HashMap<String, Object> param) throws Exception;
	int createUserList(HashMap<String, Object> param) throws Exception;
	int updateUserList(HashMap<String, Object> param) throws Exception;
}
