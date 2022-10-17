package siaa.admin.board;

import javax.persistence.*;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import siaa.admin.common.GC;
import siaa.admin.common.DomainEntity;

@Entity(name=GC.도메인+"."+BoardEntity.TABLE_NAME)
@Table(name=BoardEntity.TABLE_NAME)
@Data
@ToString(callSuper=true)
@EqualsAndHashCode(callSuper=false)
@SuppressWarnings("serial")
public class BoardEntity extends DomainEntity {
	public static final String TABLE_NAME = "tb_board";
	
	@Id
	private long boardCD;
	
	private String boardType;
	private Integer boardOrder;
	
	private String titleText;
	private String titleHtml;
	private String contentText;
	private String contentHtml;
	private String contentEditor;
	
	private Integer readCount;
	
	private Long writeUserCD;
	private String writeDT;
}