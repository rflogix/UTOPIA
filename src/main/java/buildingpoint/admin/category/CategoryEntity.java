package buildingpoint.admin.category;

import buildingpoint.admin.common.GC;
import buildingpoint.admin.common.DomainEntity;

import javax.persistence.*;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity(name=GC.도메인+"."+CategoryEntity.TABLE_NAME)
@Table(name=CategoryEntity.TABLE_NAME)
@Data
@ToString(callSuper=true)
@EqualsAndHashCode(callSuper=false)
@SuppressWarnings("serial")
public class CategoryEntity extends DomainEntity {
	public static final String TABLE_NAME = "tc_category";
	
	@Id
	private long categoryCD;
	
	private Long storeCD;
	
	private String categoryNM;
	private Integer categoryLevel;
	private Integer categoryOrder;
	private Long parentCategoryCD;
	private String categoryTEXT;
	private String categoryHTML;
	private Integer categoryColumn;
	private String categoryImageURL;
	
	private String categoryNM_en;
	private Integer mainShowOrder;
	private Integer classLevel;
	private String classLevelText;
	private String categoryThumbnailURL;
	private String categoryFileURL;
	private String categoryFile_OriginName;
	private Integer recommandClassYN;
	private Integer categoryFreeYN;
	private Integer showYN;
	private Long rootCategoryCD;
}