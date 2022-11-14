package buildingpoint.menu;

import buildingpoint.common.DomainDTO;
import buildingpoint.common.GC;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;

@Entity(name= GC.도메인+"."+ MenuEntity.TABLE_NAME)
@Table(name= MenuEntity.TABLE_NAME)
@Data
@ToString(callSuper=true)
@EqualsAndHashCode(callSuper=false)
@SuppressWarnings("serial")
public class MenuEntity extends DomainDTO {
	public static final String TABLE_NAME = "tc_menu";
	
	@Id
	private long menuCD;
	
	private Long storeCD;
	
	private String menuNM;
	private Integer menuLevel;
	private Integer menuOrder;
	private String menuURL;
	private Long parentCD;
	private Integer showYN;
	private Integer userType;
	private String i_ClassNM;
	private String sectionHtml1;
	private String sectionHtml2;
	private String sectionText1;
	private String sectionText2;
}