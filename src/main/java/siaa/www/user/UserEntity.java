package siaa.www.user;

import java.math.BigDecimal;

import javax.persistence.*;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import siaa.www.common.GC;
import siaa.www.common.DomainEntity;

@Entity(name=GC.도메인+"."+UserEntity.TABLE_NAME)
@Table(name=UserEntity.TABLE_NAME)
@Data
@ToString(callSuper=true)
@EqualsAndHashCode(callSuper=false)
@SuppressWarnings("serial")
public class UserEntity extends DomainEntity {
	public static final String TABLE_NAME = "tb_user";
	
	@Id
	private long userCD;
	
	private Long storeCD;
	
	private String userID;
	private String userPW;
	private String userPW_Origin;
	private String userNM;
	private String userNM_en;
	private String userLastNM_en;
	private String userFirstNM_en;
	private String userNickNM;
	private String companyNO;
	private String companyTel;
	private String email;
	private String cellPhoneNO;
	private Integer smsYN;
	private String department;
	private String position;
	private Integer userType;
	private Integer joinType;
	private String joinDT;
	private Integer userLevel;
	
	private String zipCD;
	private String address1;
	private String address2;
	private BigDecimal userPoint;
	private String birth;
	private Integer sex;
	
	private String deviceID;
	private String fcmID;
	private Integer noticeYN;
	private Integer tickerYN;
	private Integer soundYN;
	private Integer vibrateYN;
	
	private String lastConnectDT;
	private Integer loginCNT;
	private Integer loginYN;
	private String loginIP;
	private String loginBrowser;
	private String loginSessionID;
	
	private String companyKind;
	private String chargeUserNM;
	private String area;
	private String chargeUserNM_en;
	private Integer oneID_YN;
	private String userProfileURL;
	private Integer oneID_PopupYN;
}