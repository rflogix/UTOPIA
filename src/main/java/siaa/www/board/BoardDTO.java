package siaa.www.board;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString(callSuper=true)
@EqualsAndHashCode(callSuper=false)
@JsonIgnoreProperties(ignoreUnknown=true)
@SuppressWarnings("serial")
public class BoardDTO extends BoardEntity {
	private String id; // 그리드에서 쓰는 id
	
	private String writeUserNM;
}