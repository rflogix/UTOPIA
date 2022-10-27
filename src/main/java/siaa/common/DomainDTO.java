package siaa.common;

import java.io.Serializable;

import javax.persistence.MappedSuperclass;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@MappedSuperclass
@EqualsAndHashCode(callSuper=false)
@SuppressWarnings("serial")
public abstract class DomainDTO implements Serializable { // 직접 생성해서 사용할일이 없으므로 추상 클래스로
	private String id; // 그리드에서 쓰는 id
	
	private String insertDT;
	private long insertUserCD;
	private String updateDT;
	private long updateUserCD;
	private String deleteDT;
	private long deleteUserCD;
	private String deleteRemark;
	private int deleteYN;
}