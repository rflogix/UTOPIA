package buildingpoint.menu;

import buildingpoint.common.DomainDTO;
import buildingpoint.common.GC;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name=GC.도메인+"."+ MenuAuthEntity.TABLE_NAME)
@Table(name= MenuAuthEntity.TABLE_NAME)
@Data
@ToString(callSuper=true)
@EqualsAndHashCode(callSuper=false)
@SuppressWarnings("serial")
public class MenuAuthEntity extends DomainDTO {
	public static final String TABLE_NAME = "tc_menuauth";
	
	@Id
	private long userCD;
	private long menuCD;

	private Integer showYN;
	private Integer useYN;
}