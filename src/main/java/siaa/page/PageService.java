package siaa.page;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import siaa.common.GF;

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
	
	public HashMap<String, Object> 업데이트(HashMap<String, Object> mapParam) {
		HashMap<String, Object> mapReturn = new HashMap<String, Object>();
		
		try {
			mapReturn.putAll(mapParam); // 기본적으로 들어온 파라미터 그대로 돌려준다
			
			int updateCNT = 0;
			String pageURL = GF.getString(mapParam.get("pageURL"));
			for (String key : mapParam.keySet()){
				if (key.equals("pageURL") == false) {
					String contentValue = GF.getString(mapParam.get(key)).replaceAll("\t", "    ")
						.replaceAll("\r", "\n").replaceAll("\n\n", "\n").replaceAll("\n", "<br/>")
						.replaceAll(" ", "&nbsp;");
					
					PageDTO clsPage = new PageDTO();
					clsPage.setPageURL(pageURL);
					clsPage.setSelectorNM(key);
					clsPage.setContentType("HTML");
					clsPage.setContentValue(contentValue);
					updateCNT += pageMapper.updatePage(clsPage);
				}
			}
			if (updateCNT > 0) {
				mapReturn.put("result", "Y");
				
			} else {
				mapReturn.put("result", "N");
				mapReturn.put("message", "변경된 내용이 없습니다");
			}
			
		} catch(Exception e) {
			mapReturn.put("result", "E");
			mapReturn.put("message", "네트워크 문제로 저장되지 않았습니다");
			log.error("{}", e.toString());
		}
		
		return mapReturn;
	}
}