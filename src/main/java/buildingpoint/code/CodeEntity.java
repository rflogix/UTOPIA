package buildingpoint.code;

import buildingpoint.common.DomainDTO;
import buildingpoint.common.GC;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity(name= GC.도메인+"."+ CodeEntity.TABLE_NAME)
@Table(name= CodeEntity.TABLE_NAME)
@Data
@ToString(callSuper=true)
@EqualsAndHashCode(callSuper=false)
@SuppressWarnings("serial")
public class CodeEntity extends DomainDTO {
	public static final String TABLE_NAME = "tc_code";
	
	private long storeCD;
	private int codeType;
	private String codeDate;
	private long codeSEQ;
}