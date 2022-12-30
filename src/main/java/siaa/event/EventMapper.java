package siaa.event;

import java.util.HashMap;
import java.util.List;

import org.egovframe.rte.psl.dataaccess.mapper.Mapper;

@Mapper
public interface EventMapper {
	List<EventDTO> selectEvent(HashMap<String, Object> param) throws Exception;
	int updateEvent(HashMap<String, Object> param) throws Exception;
}
