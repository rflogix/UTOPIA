package siaa.page;

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
public class PageDTO extends DomainDTO {
	private String pageURL;
	private String selectorNM;
	
	private String contentType;
	private String contentValue;
}