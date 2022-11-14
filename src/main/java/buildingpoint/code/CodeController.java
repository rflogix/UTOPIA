package buildingpoint.code;

import buildingpoint.common.GF;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;

@Controller
public class CodeController {

    @Autowired
    private CodeService codeService;

    public long makeCodeCD(long p_StoreCD, int p_CodeType, int p_CodeMax, String p_CodeDate) throws Exception{
        String strError = "(CodeController) makeCodeCD : ";
        long lngReturn = 0;

        // 코드 생성에 필요한 상수 설정
        String CodeDate = "";
        if(!"".equals(p_CodeDate)&&p_CodeDate!=null){
            CodeDate = GF.getString(p_CodeDate);
        }else{
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            Date now = new Date();
            String nowDateTime = format.format(now);
            CodeDate = nowDateTime; // 2017 년 단위까지
        }
        int CodeType = p_CodeType; //GC.CODE_TYPE_USER;
        int MaxCode  = p_CodeMax; //GC.CODE_MAX_USER;

        // 코드가 이미 따졌었는지 보고 없으면 +1하여 새로 추가, 있으면 업데이트
        HashMap<String, Object> mapParam = new LinkedHashMap<String,Object>();
        mapParam.put("storeCD",p_StoreCD);
        mapParam.put("codeDate",CodeDate);
        mapParam.put("codeType",CodeType);

        CodeDTO clsCodeDTO = codeService.searchCode(mapParam);
        System.out.println(clsCodeDTO.toString());

        long CodeSEQ = clsCodeDTO.getCodeSEQ() + 1;
        mapParam.put("codeSEQ",CodeSEQ);

        if (clsCodeDTO.getCodeSEQ() > 0) { // 이미 따졌다면 DB에 업데이트
            codeService.updateCode(mapParam);
        } else { // 아직 없다면 1로 새로 추가
            codeService.insertCode(mapParam);
        }
        clsCodeDTO = codeService.searchCode(mapParam);
        if (clsCodeDTO.getCodeSEQ() == CodeSEQ) { // 정상적으로 코드가 따졌다면
            // 최대치보다 크다면 년 + 순번 - 17 + 000001
            String strTemp = GF.right(CodeDate.replaceAll("-", ""), 2);
            if (MaxCode < CodeSEQ) { // 최대치보다 크다면 뒤쪽에 그냥 붙임
                lngReturn = Long.parseLong(strTemp + String.valueOf(CodeSEQ));

            } else {
                strTemp = strTemp + GF.right(String.valueOf(MaxCode + 1), String.valueOf(MaxCode).length());
                lngReturn = Long.parseLong(strTemp) + CodeSEQ;
            }
        }
        System.out.print(lngReturn);
        return lngReturn;
    }
    public long makeCodeCD(int p_CodeType, int p_CodeMax, String p_CodeDate) throws Exception {
        return makeCodeCD(0, p_CodeType, p_CodeMax, p_CodeDate);
    }

}