package buildingpoint.user;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import buildingpoint.common.DomainDTO;

@Data
@ToString(callSuper=true)
@EqualsAndHashCode(callSuper=false)
@JsonIgnoreProperties(ignoreUnknown=true)
@SuppressWarnings("serial")
public class UserDTO extends DomainDTO {
	private long userCD;
	
	private long storeCD;
	
	private String userID;
	private String userPW;
	private String userPW_Origin;
	private String userPW_Check; // 비밀번호 체크
	private String userNM;
	private String userNM_en;
	private String userLastNM_en;
	private String userFirstNM_en;
	private String userNickNM;
	private String companyNO;
	private String companyTel;
	private String email;
	private String cellPhoneNO;
	private int smsYN;
	private String department;
	private String position;
	private int userType;
	private int joinType;
	private String joinDT;
	private int userLevel;
	
	private String zipCD;
	private String address1;
	private String address2;
	private BigDecimal userPoint;
	private String birth;
	private int sex;
	
	private String deviceID;
	private String fcmID;
	private int noticeYN;
	private int tickerYN;
	private int soundYN;
	private int vibrateYN;
	
	private String lastConnectDT;
	private int loginCNT;
	private int loginYN;
	private String loginIP;
	private String loginBrowser;
	private String loginSessionID;
	
	private String companyKind;
	private String chargeUserNM;
	private String area;
	private String chargeUserNM_en;
	private int oneID_YN;
	private String userProfileURL;
	private int oneID_PopupYN;
}