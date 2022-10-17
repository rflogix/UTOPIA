package siaa.www.page;

import javax.persistence.*;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import siaa.www.common.GC;
import siaa.www.common.DomainEntity;

@Entity(name=GC.도메인+"."+PageEntity.TABLE_NAME)
@Table(name=PageEntity.TABLE_NAME)
@Data
@ToString(callSuper=true)
@EqualsAndHashCode(callSuper=false)
@SuppressWarnings("serial")
public class PageEntity extends DomainEntity {
	public static final String TABLE_NAME = "tb_page";
	
	@Id
	private String pageURL;
	@Id
	private String selectorNM;
	
	private String contentType;
	private String contentValue;
}