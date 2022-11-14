package buildingpoint.user;

import buildingpoint.common.DomainDTO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import javax.persistence.Id;

@Data
@ToString(callSuper=true)
@EqualsAndHashCode(callSuper=false)
@JsonIgnoreProperties(ignoreUnknown=true)
@SuppressWarnings("serial")
public class UserLoginDTO extends DomainDTO {
    private long userCD;

    private Integer loginSEQ;
    private String  loginDT;
}