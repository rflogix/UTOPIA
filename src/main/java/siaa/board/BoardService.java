package siaa.board;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;
import siaa.common.GC;
import siaa.common.GF;
import siaa.user.UserDTO;

@Slf4j
@Service
public class BoardService {
	
	@Autowired
	private BoardMapper boardMapper;
	
	// PK 로 DTO 조회하는 함수
	public BoardDTO getBoardByPK(long boardCD) {
		BoardDTO clsReturn = new BoardDTO();
		
		try {
			if (boardCD != 0) {
				HashMap<String, Object> mapParam = new HashMap<String, Object>();
				mapParam.put("boardCD", boardCD);
				List<BoardDTO> arrReturn = boardMapper.selectBoard(mapParam);
				if (arrReturn.size() == 1) {
					clsReturn = arrReturn.get(0);
				}
			}
			
		} catch (Exception e) {
			log.error("{}", e.toString());
		}
		
		return clsReturn;
	}
	
	public HashMap<String, Object> 그리드조회(HashMap<String, Object> mapParam) {
		HashMap<String, Object> mapReturn = new HashMap<String, Object>();
		
		try {
			// 검색조건으로 전체 검색수량 조회 후 페이징 파라미터 설정
			mapReturn = GF.setSearchPagingParam(mapParam, boardMapper.selectBoardCnt(mapParam));
			
			// 페이징 파라미터 추가된 검색조건으로 다시 조회
			List<BoardDTO> arrBoard = boardMapper.selectBoard(mapParam);
			GF.setSearchResultCnt(mapReturn, arrBoard.size()); // 조회된 검색수량 설정
			
			// 그리드 및 기타 설정값 적용
			int Search_StartRow = GF.getSearchRowStart(mapReturn); // 검색 시작 ROW 조회
			for (BoardDTO board : arrBoard) {
				board.setId(""+(Search_StartRow++)); // 그리드에서 쓰는 id 세팅
			}
			
			mapReturn.put("result", "Y");
			mapReturn.put("list", arrBoard);
			
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
			
			// 조회수 업데이트라면 로그인과 상관 없음
			if (GF.getString(mapParam.get("readCountUpdateYN")).equals("Y")) {
				HashMap<String, Object> mapNewParam = new HashMap<String, Object>();
				mapNewParam.put("boardCD", mapParam.get("boardCD"));
				mapNewParam.put("readCount_add", mapParam.get("readCount_add"));
				boardMapper.updateBoard(mapNewParam);
				
			} else {
				UserDTO clsLoginUser = GF.로그인사용자(session);
				if (clsLoginUser.getUserCD() != 0) {
					mapParam.put("contentHtml", GF.getString(mapParam.get("contentHtml")).replaceAll("<br />", "<br/>").replaceAll("\r", "").replaceAll("\n", ""));
					mapParam.put("contentText", GF.getString(mapParam.get("contentText")).replaceAll("\r", "").replaceAll("\n", " ")); // 줄바꿈은 내용검색을 위해 공백으로 처리
					
					long pkCode = GF.getLong(mapParam.get("boardCD"));
					if (pkCode == 0) { // PK 가 없다면 신규 추가
						mapParam.put("writeUserCD", clsLoginUser.getUserCD());
						mapParam.put("insertUserCD", clsLoginUser.getUserCD());
						pkCode = boardMapper.insertBoard(mapParam);
						if (pkCode != 0) { // 정상적으로 추가되었다면 조회
							mapReturn.put("result", "Y");
							mapReturn.put("clsBoard", this.getBoardByPK(pkCode));
							
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
						if (boardMapper.updateBoard(mapParam) > 0) {
							mapReturn.put("result", "Y");
							mapReturn.put("clsBoard", this.getBoardByPK(pkCode));
							
						} else {
							mapReturn.put("result", "N");
							mapReturn.put("message", "변경된 내역이 없습니다");
						}
					}
					
				} else {
					mapReturn.put("result", "L");
					mapReturn.put("message", "로그아웃 상태여서 저장되지 않았습니다");
				}
			}
			
		} catch(Exception e) {
			mapReturn.put("result", "E");
			mapReturn.put("message", "네트워크 문제로 저장되지 않았습니다");
			log.error("{}", e.toString());
		}
		
		return mapReturn;
	}
	
	@SuppressWarnings("unchecked")
	public HashMap<String, Object> 이미지업로드(HttpServletRequest request, MultipartFile[] multiFiles) {
		HashMap<String, Object> mapReturn = new HashMap<String, Object>();
		
		try {
			// CKEDITOR 파라메터
			String CKEditorFuncNum = GF.getString(request.getParameter("CKEditorFuncNum"));
			
			String StoreDir = GF.getString(request.getParameter("StoreDir"));
			if (StoreDir.equals("")) {
				StoreDir = GC.STORE_ID;
			}
			String UploadDir = GF.getString(request.getParameter("UploadDir"));
			if (UploadDir.equals("")) {
				UploadDir = GC.REAL_IMG_DIR_BOARD;
			}
			String ShowURL = GF.getString(request.getParameter("ShowURL"));
			String ImageSizeList = GF.getString(request.getParameter("ImageSizeList"));
			if (ImageSizeList.equals("")) {
				ImageSizeList = GC.IMG_SIZE_LIST_BOARD;
			}
			String ImageSizeShow = GF.getString(request.getParameter("ImageSizeShow"));
			//if (ImageSizeShow.equals("")) {
			//	ImageSizeShow = IMG_SIZE_SHOW_BOARD;
			//}
			String ImageQuality = GF.getString(request.getParameter("ImageQuality"));
			if (ImageQuality.equals("")) {
				ImageQuality = GC.IMG_QUALITY_BOARD;
			}
			String Division = GF.getString(request.getParameter("Division"));
			
			String strURL = (request.isSecure()?"https:":"http:") + GC.FILE_UPLOAD_URL
				+ "?StoreDir="+URLEncoder.encode(StoreDir, "utf-8")
				+ "&UploadDir="+URLEncoder.encode(UploadDir, "utf-8")
				+ "&ShowURL="+URLEncoder.encode(ShowURL, "utf-8")
				+ "&ImageSizeList="+URLEncoder.encode(ImageSizeList, "utf-8")
				+ "&ImageSizeShow="+URLEncoder.encode(ImageSizeShow, "utf-8")
				+ "&ImageQuality="+URLEncoder.encode(ImageQuality, "utf-8")
				+ "&Division="+URLEncoder.encode(Division, "utf-8")
				;
			
			/***********************************************************************************
			* 2. URL 설정
			***********************************************************************************/
			
			// 1. URL
			URL url = new URL(strURL);
			
			// 2. Open connection
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setUseCaches(false);
			conn.setDoOutput(true);
			
			/***********************************************************************************
			* 3. 파일 설정
			***********************************************************************************/
			
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Connection", "Keep-Alive");
			conn.setRequestProperty("Cache-Control", "no-cache");
			conn.setRequestProperty("Content-Type", "multipart/form-data;boundary=" + GC.FILE_BOUNDARY);

			// content wrapper시작
			DataOutputStream os = new DataOutputStream(conn.getOutputStream());
			
			// OS 체크
			String ROOT_DIR = GC.ROOT_DIR;
			String OS = System.getProperty("os.name").toLowerCase();
			if ((GF.left(ROOT_DIR.toLowerCase(),2).equals("c:")) || (GF.left(ROOT_DIR.toLowerCase(),2).equals("d:"))) {
				if (OS.indexOf("win") == -1) {
					ROOT_DIR = ROOT_DIR.substring(2);
				}
			} else {
				if (OS.indexOf("win") >= 0) {
					ROOT_DIR = "c:" + ROOT_DIR;
				}
			}
			
			// 폴더 생성
			String TEMP_FILE_PATH = ROOT_DIR+"/"+GC.ROOT_TEMP_DIR;
			FileInputStream inputStream;
			byte[] buffer = new byte[4096];
			int bytesRead = -1;
			GF.makeDir(ROOT_DIR); GF.makeDir(TEMP_FILE_PATH);
			
			for (MultipartFile file : multiFiles) {
				if (!file.isEmpty()) {
					String strElement = file.getName();
					String strFileNM = file.getOriginalFilename().toLowerCase();
					File newFile = new File(TEMP_FILE_PATH+"/"+strFileNM);
					file.transferTo(newFile); // 로컬에 파일 생성
					
					os.writeBytes(GC.FILE_HYPHENS + GC.FILE_BOUNDARY + GC.FILE_END);
					os.writeBytes("Content-Disposition: form-data; name=\"" + strElement + "\";filename=\"" + (new String(strFileNM.getBytes("UTF-8"), "ISO-8859-1")) + "\"" + GC.FILE_END);
					os.writeBytes(GC.FILE_END);
					
					inputStream = new FileInputStream(newFile);
					bytesRead = -1;
					while ((bytesRead = inputStream.read(buffer)) != -1) {
						os.write(buffer, 0, bytesRead);
					}
					inputStream.close();
					
					os.writeBytes(GC.FILE_END);
				}
			}
			
			// content wrapper종료
			os.writeBytes(GC.FILE_HYPHENS + GC.FILE_BOUNDARY + GC.FILE_HYPHENS + GC.FILE_END);
			
			// buffer flush
			os.flush();
			os.close();
			
			
			
			/***********************************************************************************
			* 4. 결과값 설정
			***********************************************************************************/
			
			BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String inputLine;
			StringBuffer responseBuff = new StringBuffer();
			while ((inputLine = in.readLine()) != null) {
				responseBuff.append(inputLine);
			}
			in.close();
			
			// 결과값 파싱
			mapReturn = (new ObjectMapper()).readValue(responseBuff.toString(), HashMap.class);
			mapReturn.put("CKEditorFuncNum", CKEditorFuncNum);
			
		} catch(Exception e) {
			mapReturn.put("result", "E");
			mapReturn.put("message", "네트워크 문제로 업로드되지 않았습니다");
			log.error("{}", e.toString());
		}
		
		return mapReturn;
	}
	
}