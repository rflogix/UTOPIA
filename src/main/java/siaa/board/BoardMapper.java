package siaa.board;

import java.util.HashMap;
import java.util.List;

import org.egovframe.rte.psl.dataaccess.mapper.Mapper;

@Mapper
public interface BoardMapper {
	List<BoardDTO> selectBoard(HashMap<String, Object> param) throws Exception;
	int selectBoardCnt(HashMap<String, Object> param) throws Exception;
	long insertBoard(HashMap<String, Object> param) throws Exception;
	int updateBoard(HashMap<String, Object> param) throws Exception;
}
