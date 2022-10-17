package siaa.admin.user;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import siaa.admin.common.GC;
import siaa.admin.common.GF;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserService {
	
	@Autowired
	private UserMapper userMapper;
	
	// PK 로 DTO 조회하는 함수
	public UserDTO getUserByPK(long userCD) {
		UserDTO clsReturn = new UserDTO();
		
		try {
			if (userCD != 0) {
				HashMap<String, Object> mapParam = new HashMap<String, Object>();
				mapParam.put("userCD", userCD);
				List<UserDTO> arrReturn = userMapper.selectUser(mapParam);
				if (arrReturn.size() == 1) {
					clsReturn = arrReturn.get(0);
				}
			}
			
		} catch (Exception e) {
			log.error("{}", e.toString());
		}
		
		return clsReturn;
	}
	
	public UserDTO 사용자ID조회(HashMap<String, Object> mapParam) throws Exception {
		UserDTO clsReturn = new UserDTO();
		
		try {
			List<UserDTO> listUser = userMapper.selectUser(mapParam);
			if (listUser.size() > 0) {
				clsReturn = listUser.get(0);
			}
			
		} catch(Exception e) {
			log.error("{}", e.toString());
		}
		
		return clsReturn;
	}
	
	public HashMap<String, Object> 로그인(HashMap<String, Object> mapParam, HttpServletRequest request) throws Exception {
		HashMap<String, Object> mapReturn = new HashMap<String, Object>();
		
		try {
			// ID 로만 조회 후, 가져온 정보로 PW 비교 후 처리
			UserDTO clsParam = (new ObjectMapper()).convertValue(mapParam, UserDTO.class);
			if ((clsParam.getUserID().equals("") == false) && (clsParam.getUserPW().equals("") == false)) {
				List<UserDTO> arrUser = userMapper.selectUser(mapParam); // Mybatis
				if (arrUser.size() == 1) { // ID 1개 존재할때
					UserDTO clsLoginUser = arrUser.get(0); // DB에서 가져온 정보로 세팅
					
					String UserPW_MD5 = GF.encodeMD5(GF.getString(mapParam.get("userPW"))); // 입력된 암호 MD5 변환
					if ((clsLoginUser.getUserPW().equals(UserPW_MD5)) || (GF.encodeMD5(GC.슈퍼관리자암호).equals(UserPW_MD5))) { // 비밀번호 일치한다면
						if (clsLoginUser.getDeleteYN() != 1) {
							if (clsLoginUser.getUserType() == null) {
								clsLoginUser.setUserType(0);
							}
							if ((clsLoginUser.getUserType() == GC.USER_TYPE_ADMIN) || (clsLoginUser.getUserType() == GC.USER_TYPE_SUPER)) {
								// 세션 설정하기
								HashMap<String, Object> 세션변수 = GF.get세션변수(request);
								세션변수.put(GC.세션KEY_로그인사용자, clsLoginUser);
								GF.set세션변수(request, 세션변수);
								request.getSession(false).setMaxInactiveInterval(GC.세션유지시간);
								
								mapReturn.put("result", "Y");
								mapReturn.put("message", "로그인 되었습니다");
								log.debug("{}", "♥♥♥♥♥ " + clsLoginUser.getUserNM() + "(" + clsLoginUser.getUserID() + ") 님 로그인!! ♥♥♥♥♥");
								
							} else {
								mapReturn.put("result", "AUTH");
								mapReturn.put("message", "권한이 없는 아이디 입니다");
							}
							
						} else {
							mapReturn.put("result", "ID");
							mapReturn.put("message", "탈퇴처리된 회원 입니다");
						}
						
					} else {
						mapReturn.put("result", "PW");
						mapReturn.put("message", "비밀번호가 일치하지 않습니다");
					}
					
				} else if (arrUser.size() == 0) {
					mapReturn.put("result", "ID");
					mapReturn.put("message", "가입되지 않은 아이디 입니다");
					
				} else {
					mapReturn.put("result", "ID");
					mapReturn.put("message", "중복 가입된 아이디 입니다");
				}
				
			} else {
				if (clsParam.getUserID().equals("") == false) {
					mapReturn.put("result", "ID");
					mapReturn.put("message", "아이디가 입력되지 않았습니다");
					
				} else {
					mapReturn.put("result", "PW");
					mapReturn.put("message", "비밀번호가 입력되지 않았습니다");
				}
			}
			
		} catch(Exception e) {
			mapReturn.put("result", "E");
			mapReturn.put("message", "네트워크 문제로 로그인이 되지 않았습니다");
			log.error("{}", e.toString());
		}
		
		return mapReturn;
	}
	
	public HashMap<String, Object> 로그아웃(HttpSession session) throws Exception {
		HashMap<String, Object> mapReturn = new HashMap<String, Object>();
		
		try {
			mapReturn.put("result", "Y");
			mapReturn.put("message", "로그아웃 되었습니다");
			
			// TODO:로그아웃 관련 프로세스 추가
			
			// 세션 종료전 세션변수에 셀프로그아웃 처리
			HashMap<String, Object> 세션변수 = GF.get세션변수(session);
			세션변수.put(GC.세션KEY_셀프로그아웃, "Y");
			GF.set세션변수(session, 세션변수);
			session.invalidate();
			log.debug("{}", "로그아웃 되었습니다");

		} catch(Exception e) {
			mapReturn.put("result", "E");
			mapReturn.put("message", "네트워크 문제로 로그아웃 되지 않았습니다");
			log.error("{}", e.toString());
		}
		
		return mapReturn;
	}

	public HashMap<String, Object> 로그인사용자(HttpSession session) throws Exception {
		HashMap<String, Object> mapReturn = new HashMap<String, Object>();
		
		try {
			UserDTO clsLoginUser = GF.로그인사용자(session);
			if (clsLoginUser.getUserCD() != 0) {
				mapReturn.put("result", "Y");
				mapReturn.put("clsLoginUser", clsLoginUser);
				
			} else {
				mapReturn.put("result", "N");
			}
			
		} catch(Exception e) {
			mapReturn.put("result", "E");
			mapReturn.put("message", "네트워크 문제로 로그인이 되지 않았습니다");
			log.error("{}", e.toString());
		}
		
		return mapReturn;
	}
	
	public HashMap<String, Object> 그리드조회(HashMap<String, Object> mapParam) throws Exception {
		HashMap<String, Object> mapReturn = new HashMap<String, Object>();
		
		try {
			mapReturn.put("result", "Y");
			
			List<UserDTO> arrUser = userMapper.selectUser(mapParam);
			for (int i=0; i<arrUser.size(); i++) {
				arrUser.get(i).setId(""+(i+1)); // 그리드에서 쓰는 id 세팅
			}
			mapReturn.put("list", arrUser);
			
			String temp = GF.getString(mapParam.get("Search_Page"));
			if (temp.equals("") || temp.equals("0")) {
				mapParam.put("Search_Page", 1);
			}
			mapReturn.put("Search_Page", mapParam.get("Search_Page"));
			mapReturn.put("Search_ShowCNT", mapParam.get("Search_ShowCNT"));
			mapReturn.put("Search_ResultCNT", mapParam.get("Search_ShowCNT"));
			mapReturn.put("Search_TotalCNT", mapParam.get("Search_ShowCNT"));
			mapReturn.put("Search_TotalPage", mapParam.get("Search_Page"));
			
		} catch(Exception e) {
			mapReturn.put("result", "E");
			mapReturn.put("message", "네트워크 문제로 조회되지 않았습니다");
			log.error("{}", e.toString());
		}
		
		return mapReturn;
	}
	
	public HashMap<String, Object> 업데이트(HashMap<String, Object> mapParam, HttpSession session) throws Exception {
		HashMap<String, Object> mapReturn = new HashMap<String, Object>();
		
		try {
			UserDTO clsLoginUser = GF.로그인사용자(session);
			if (clsLoginUser.getUserCD() != 0) {
				long pkCode = GF.getLong(mapParam.get("userCD"));
				if (pkCode == 0) { // PK 가 없다면 신규 추가
					mapParam.put("insertUserCD", clsLoginUser.getUserCD());
					pkCode = userMapper.insertUser(mapParam);
					if (pkCode != 0) { // 정상적으로 추가되었다면 조회
						mapReturn.put("result", "Y");
						mapReturn.put("clsUser", this.getUserByPK(pkCode));
						
					} else {
						mapReturn.put("result", "N");
						mapReturn.put("message", "추가되지 않았습니다. 다시한번 저장하세요.");
					}
					
				} else { // PK 가 들어왔다면 수정/삭제
					int deleteYN = GF.getInt(mapParam.get("deleteYN"));
					if (deleteYN == 1) {
						mapParam.put("deleteUserCD", clsLoginUser.getUserCD());
						
					} else {
						mapParam.put("updateUserCD", clsLoginUser.getUserCD());
					}
					if (userMapper.updateUser(mapParam) > 0) {
						mapReturn.put("result", "Y");
						mapReturn.put("clsUser", this.getUserByPK(pkCode));
						
					} else {
						mapReturn.put("result", "N");
						mapReturn.put("message", "변경된 내역이 없습니다");
					}
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