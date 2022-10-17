package siaa.www.page;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import siaa.www.common.GF;

@Slf4j
@Service
public class PageService {
	
	@Autowired
	private PageMapper pageMapper;
	
	public HashMap<String, Object> 페이지세팅(HashMap<String, Object> mapParam) {
		HashMap<String, Object> mapReturn = new HashMap<String, Object>();
		
		try {
			mapReturn.put("result", "Y");
			mapReturn.put("list", pageMapper.selectPage(mapParam));
			
		} catch(Exception e) {
			mapReturn.put("result", "E");
			mapReturn.put("message", "네트워크 문제로 조회되지 않았습니다");
			log.error("{}", e.toString());
		}
		
		return mapReturn;
	}
	
}