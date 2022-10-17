package siaa.www.common;

import java.io.Serializable;

import javax.persistence.MappedSuperclass;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@MappedSuperclass
@EqualsAndHashCode(callSuper=false)
@SuppressWarnings("serial")
public abstract class DomainEntity implements Serializable { // 직접 생성해서 사용할일이 없으므로 추상 클래스로
	private String insertDT;
	private Long insertUserCD;
	private String updateDT;
	private Long updateUserCD;
	private String deleteDT;
	private Long deleteUserCD;
	private String deleteRemark;
	private Integer deleteYN;
}