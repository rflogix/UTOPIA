package buildingpoint.user;

import buildingpoint.menu.MenuAuthDTO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import java.util.List;

@Data
@ToString(callSuper=true)
@EqualsAndHashCode(callSuper=false)
@JsonIgnoreProperties(ignoreUnknown=true)
@SuppressWarnings("serial")
public class UserMenuAuthVO extends UserDTO {
	private Integer menuLevel; // 메뉴레벨
	private List<MenuAuthDTO> _children;
}