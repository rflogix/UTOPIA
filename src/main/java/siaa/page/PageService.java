package siaa.page;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import siaa.common.GF;
import siaa.user.UserDTO;

@Slf4j
@Service
public class PageService {
	
	@Autowired
	private PageMapper pageMapper;

	public HashMap<String, Object> 페이지조회(HashMap<String, Object> mapParam) {
		HashMap<String, Object> mapReturn = new HashMap<String, Object>();
		
		try {
			mapReturn.putAll(mapParam); // 기본적으로 들어온 파라미터 그대로 돌려준다
			
			mapReturn.put("result", "Y");
			mapReturn.put("list", pageMapper.selectPage(mapParam));
			
		} catch(Exception e) {
			mapReturn.put("result", "E");
			mapReturn.put("message", "네트워크 문제로 조회되지 않았습니다");
			log.error("{}", e.toString());
		}
		
		return mapReturn;
	}
	
	public HashMap<String, Object> 페이지세팅(HashMap<String, Object> mapParam) {
		HashMap<String, Object> mapReturn = new HashMap<String, Object>();
		
		try {
			mapReturn.putAll(mapParam); // 기본적으로 들어온 파라미터 그대로 돌려준다
			
			List<PageDTO> arrPage = pageMapper.selectPage(mapParam);
			for (PageDTO page : arrPage) {
				String contentValue = GF.getString(page.getContentValue()).replaceAll("\r", "").replaceAll("\n", "")
					.replaceAll("<br/>", "\n")
					.replaceAll("&nbsp;", " ");
				page.setContentValue(contentValue);
			}
			mapReturn.put("result", "Y");
			mapReturn.put("list", arrPage);
			
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
				int updateCNT = 0;
				String pageURL = GF.getString(mapParam.get("pageURL"));
				String bgImgSelectorNM = GF.getString(mapParam.get("bgImgSelectorNM"));
				for (String key : mapParam.keySet()){
					if ((key.equals("pageURL") == false) && (key.equals("bgImgSelectorNM") == false)) { // 매핑키 이름이 pageURL, bgImgSelectorNM 이 아니라면
						PageDTO clsPage = new PageDTO();
						clsPage.setPageURL(pageURL);
						clsPage.setSelectorNM(key);
						clsPage.setInsertUserCD(clsLoginUser.getUserCD());
						clsPage.setUpdateUserCD(clsLoginUser.getUserCD());
						
						// 타입 구분
						if ((bgImgSelectorNM.equals("") == false) && (key.indexOf(bgImgSelectorNM) > -1)) { // 백그라운드 이미지라면
							clsPage.setContentType("BG_IMG");
							// TODO: 실제 이미지 경로로 옮겨주기 실행
							clsPage.setContentValue(GF.getString(mapParam.get(key)));
							
						} else {
							clsPage.setContentType("HTML");
							String contentValue = GF.getString(mapParam.get(key)).replaceAll("\t", "    ")
									.replaceAll("\r", "\n").replaceAll("\n\n", "\n").replaceAll("\n", "<br/>")
									.replaceAll(" ", "&nbsp;");
							clsPage.setContentValue(contentValue);
						}
						
						updateCNT += pageMapper.insertPage(clsPage);
					}
				}
				if (updateCNT > 0) {
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
	
	public HashMap<String, Object> 삭제(HashMap<String, Object> mapParam, HttpSession session) {
		HashMap<String, Object> mapReturn = new HashMap<String, Object>();
		
		try {
			mapReturn.putAll(mapParam); // 기본적으로 들어온 파라미터 그대로 돌려준다
			
			UserDTO clsLoginUser = GF.로그인사용자(session);
			if (clsLoginUser.getUserCD() != 0) {
				if (pageMapper.deletePage(mapParam) > 0) {
					mapReturn.put("result", "Y");
					
				} else {
					mapReturn.put("result", "N");
					mapReturn.put("message", "삭제된 내용이 없습니다");
				}
				
			} else {
				mapReturn.put("result", "L");
				mapReturn.put("message", "로그아웃 상태여서 삭제되지 않았습니다");
			}
			
		} catch(Exception e) {
			mapReturn.put("result", "E");
			mapReturn.put("message", "네트워크 문제로 삭제되지 않았습니다");
			log.error("{}", e.toString());
		}
		
		return mapReturn;
	}
}