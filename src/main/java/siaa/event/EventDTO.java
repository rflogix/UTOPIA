package siaa.event;

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
public class EventDTO extends DomainDTO {
	private long eventCD;
	
	private String eventTitle;
	private int eventType;
	
	private String startDT;
	private String endDT;
}