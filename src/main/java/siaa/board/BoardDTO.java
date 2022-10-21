package siaa.board;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import siaa.common.DomainDTO;

@Data
@ToString(callSuper=true)
@EqualsAndHashCode(callSuper=false)
@JsonIgnoreProperties(ignoreUnknown=true)
@SuppressWarnings("serial")
public class BoardDTO extends DomainDTO {
	private long boardCD;
	
	private String boardType;
	private int boardOrder;
	
	private String titleText;
	private String titleHtml;
	private String contentText;
	private String contentHtml;
	private String contentEditor;
	
	private int readCount;
	
	private long writeUserCD;
	private String writeUserNM;
	private String writeDT;
}