package buildingpoint.ckeditor;

import buildingpoint.common.GC;
import buildingpoint.common.GF;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.json.JsonObject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.UUID;

@Controller
@RequestMapping(value = "/{subDomain}."+ GC.도메인)
public class CkEditorController {
    @RequestMapping("/ckeditor/ckeditor_test_page")
    public String ckEditorTestPage() throws Exception {
        return "/ckeditor_test";
    }

    @RequestMapping("/ckeditor/file_upload")
    public @ResponseBody HashMap<String, Object> fileUpload(HttpServletRequest request, HttpServletResponse resp
            , MultipartHttpServletRequest multiFile) throws Exception { //기존 소스 멀티파일로 변경.
        System.out.println("fileUpload");
        boolean developFlag = true;
        LinkedHashMap<String, Object> returnMap = new LinkedHashMap<String, Object>();
        // CKEDITOR 파라메터
        String STORE_DIR = "geo";
        String UPLOAD_DIR = "campus";
        String FILE_BOUNDARY = "*****";
        String LOCAL_DIR = "C:";
        String ROOT_DIR = "/develop/FILES";
        String ROOT_TEMP_DIR = "$temp";
        String FILE_HYPHENS = "--";
        String FILE_END = "\r\n";

        String StoreDir = GF.getString(request.getParameter("StoreDir"));
        if (StoreDir.equals("")) { StoreDir = STORE_DIR; }
        String UploadDir = GF.getString(request.getParameter("UploadDir"));
        if (UploadDir.equals("")) { UploadDir = UPLOAD_DIR; }
        String FileNM_Origin = GF.getString(request.getParameter("FileNM_Origin"));
        String ImageSize = GF.getString(request.getParameter("ImageSize"));
        if (ImageSize.equals("")) { ImageSize = ""; }
        String ShowSize = GF.getString(request.getParameter("ShowSize"));
        if (ShowSize.equals("")) { ShowSize = ""; }
        String ImageQuality = GF.getString(request.getParameter("ImageQuality"));

        String strURL = "http://upload.rflogix.com/upload_file.jsp"
                + "?StoreDir=" + URLEncoder.encode(StoreDir, "utf-8")
                + "&UploadDir=" + URLEncoder.encode(UploadDir, "utf-8")
                + "&ForceYN=" + URLEncoder.encode("Y", "utf-8");
        System.out.println("strURL : " + strURL);

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
        conn.setRequestProperty("Content-Type", "multipart/form-data;boundary=" + FILE_BOUNDARY);
        // content wrapper시작
        DataOutputStream os = new DataOutputStream(conn.getOutputStream());
        String TEMP_FILE_PATH = "";
        // 폴더 생성
        TEMP_FILE_PATH = ROOT_DIR + "/" + ROOT_TEMP_DIR;
        /* TEMP_FILE_PATH = ROOT_DIR+"/"+ROOT_TEMP_DIR; */
        if (developFlag) {
            TEMP_FILE_PATH = LOCAL_DIR + TEMP_FILE_PATH;
        }
        FileInputStream inputStream;
        byte[] buffer = new byte[4096];
        int bytesRead = -1;

        GF.makeDir(ROOT_DIR);
        GF.makeDir(TEMP_FILE_PATH);

        OutputStream out = null;
        MultipartFile file = multiFile.getFile("upload");
        if(file != null){
            if(file.getSize() > 0 && StringUtils.isNotBlank(file.getName())){
                if(file.getContentType().toLowerCase().startsWith("image/")){
                    try{
                        byte[] bytes = file.getBytes();
                        String uploadPath = TEMP_FILE_PATH;
                        File uploadFile = new File(uploadPath);
                        if(!uploadFile.exists()){
                            uploadFile.mkdirs();
                        }
                        String fileName =  file.getOriginalFilename();
                        uploadPath = uploadPath + "/" + fileName;
                        out = new FileOutputStream(new File(uploadPath));
                        out.write(bytes);

                        String fileUrl ="";

                        System.out.println("올라갈 파일명 : " + fileName);//@@@@@@@@
                        os.writeBytes(FILE_HYPHENS + FILE_BOUNDARY + FILE_END);

                        // 현재 날짜/시간
                        LocalDateTime now = LocalDateTime.now();
                        // 현재 날짜/시간 출력
                        System.out.println(now); // 2021-06-17T06:43:21.419878100
                        // 포맷팅
                        String formatedNow = now.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
                        // 포맷팅 현재 날짜/시간 출력
                        System.out.println("file_"+(formatedNow)+"."+GF.fileExtension(fileName));

                        String uploadedFileName = "file_"+formatedNow+"."+GF.fileExtension(fileName);
                        //os.writeBytes("Content-Disposition: form-data; name=\"" + strParamNM + "\";filename=\""+"file_"+(intFileCNT++)+"."+GF.fileExtension(strParamValue).toLowerCase()+"\"" + FILE_END);
                        os.writeBytes("Content-Disposition: form-data; name=\"" + fileName + "\";filename=\"geo/campus/"+"file_"+formatedNow+"."+GF.fileExtension(fileName)+"\"" + FILE_END); // .toLowerCase()
                        System.out.println("Content-Disposition: form-data; name=\"" + fileName + "\";filename=\"geo/campus/"+"file_"+formatedNow+"."+GF.fileExtension(fileName)+"\"" + FILE_END);
                        os.writeBytes(FILE_END);

                        inputStream = new FileInputStream(new File(TEMP_FILE_PATH+"/"+fileName));

                        fileUrl = "https://img.rflogix.com/geo/campus/"+uploadedFileName;
                        System.out.println(fileUrl);

                        bytesRead = -1;
                        while ((bytesRead = inputStream.read(buffer)) != -1) {
                            os.write(buffer, 0, bytesRead);
                        }
                        inputStream.close();
                        os.writeBytes(FILE_END);

                        os.writeBytes(FILE_HYPHENS + FILE_BOUNDARY + FILE_HYPHENS + FILE_END);

                        // buffer flush
                        os.flush();
                        os.close();

                        int responseCode = conn.getResponseCode();
                        BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                        String inputLine;
                        StringBuffer responseBuff = new StringBuffer();
                        while ((inputLine = in.readLine()) != null) {
                            responseBuff.append(inputLine);
                        }
                        in.close();

                        // 결과값 파싱
                        JsonObject json = null;
                        String strJson = responseBuff.toString().trim();
                        if (strJson != null) {
                            if (strJson.equals("") == false) {
                                if (GF.left(strJson, 1).equals("[") == true) {
                                    strJson = strJson.substring(1);
                                }
                                if (GF.right(strJson, 1).equals("]") == true) {
                                    strJson = strJson.substring(0, strJson.length() - 1);
                                }

                                JsonParser parser = new JsonParser();
                                JsonElement jsonTree = parser.parse( strJson );
                                System.out.println(jsonTree);
                            }
                        }

                        // ckeditor 업로드 return 형식 -- 모듈마다 동일
                        // json 데이터로 등록
                        // {"uploaded" : 1, "fileName" : "test.jpg", "url" : "/img/test.jpg"}
                        // 이런 형태로 리턴이 나가야함.
                        returnMap.put("uploaded", 1);
                        returnMap.put("fileName", fileName);
                        returnMap.put("url", fileUrl);

                    }catch(IOException e){
                        //e.printStackTrace();
                    }finally{
                        if(out != null){
                            out.close();
                        }
                    }
                }
            }
        }
        System.out.println(returnMap);

        return returnMap;
    }
}
