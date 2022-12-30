package siaa.event;

import java.util.HashMap;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import siaa.common.GF;
import siaa.user.UserDTO;

@Slf4j
@Service
public class EventService {
	
	@Autowired
	private EventMapper pageMapper;

	public HashMap<String, Object> 이벤트조회(HashMap<String, Object> mapParam) {
		HashMap<String, Object> mapReturn = new HashMap<String, Object>();
		
		try {
			mapReturn.putAll(mapParam); // 기본적으로 들어온 파라미터 그대로 돌려준다
			
			mapReturn.put("result", "Y");
			mapReturn.put("list", pageMapper.selectEvent(mapParam));
			
		} catch(Exception e) {
			mapReturn.put("result", "E");
			mapReturn.put("message", "네트워크 문제로 조회되지 않았습니다");
			log.error("{}", e.toString());
		}
		
		return mapReturn;
	}
	
	public HashMap<String, Object> 업데이트(HashMap<String, Object> mapParam, HttpSession session) {
		HashMap<String, Object> mapReturn = new HashMap<String, Object>();
		
		try {
			mapReturn.putAll(mapParam); // 기본적으로 들어온 파라미터 그대로 돌려준다
			
			UserDTO clsLoginUser = GF.로그인사용자(session);
			if (clsLoginUser.getUserCD() != 0) {
				mapParam.put("insertUserCD", clsLoginUser.getUserCD());
				mapParam.put("updateUserCD", clsLoginUser.getUserCD());
				if (pageMapper.updateEvent(mapParam) > 0) {
					mapReturn.put("result", "Y");
					
				} else {
					mapReturn.put("result", "N");
					mapReturn.put("message", "변경된 내용이 없습니다");
				}
				
			} else {
				mapReturn.put("result", "L");
				mapReturn.put("message", "로그아웃 상태여서 저장되지 않았습니다");
			}
			
		} catch(Exception e) {
			mapReturn.put("result", "E");
			mapReturn.put("message", "네트워크 문제로 저장되지 않았습니다");
			log.error("{}", e.toString());
		}
		
		return mapReturn;
	}
}