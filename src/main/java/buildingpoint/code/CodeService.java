package buildingpoint.code;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Slf4j
@Service
public class CodeService {
	
	@Autowired
	private CodeMapper codeMapper;
	
	public CodeDTO searchCode(HashMap<String, Object> mapParam) throws Exception {
		CodeDTO objReturn = new CodeDTO();
		try {
			List<CodeDTO> listCode = codeMapper.selectCode(mapParam);
			if(listCode.size()!=0){
				objReturn = listCode.get(0);
			}
		} catch(Exception e) {
			log.error("{}", e.toString());
		}
		return objReturn;
	}

	public int updateCode(HashMap<String, Object> mapParam) throws Exception {
		int result = 0;
		try {
			result = codeMapper.updateCode(mapParam);
		} catch(Exception e) {
			log.error("{}", e.toString());
		}
		return result;
	}

	public int insertCode(HashMap<String, Object> mapParam) throws Exception {
		int result = 0;
		try {
			result = codeMapper.insertCode(mapParam);
		} catch(Exception e) {
			log.error("{}", e.toString());
		}
		return result;
	}
}