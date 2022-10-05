package config.custom;

import java.io.IOException;
import java.util.Collections;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

//@Configuration // 파라미터 커스터마이징 할 필요가 있을때 주석 풀어서 사용
public class ParamConfig implements Filter {
	@Override
	public void doFilter(ServletRequest serveletRequest, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		// request parameter 에 매번 추가 / 변경 / 복호화 해야할 파라미터 세팅
		CustomRequest request = new CustomRequest((HttpServletRequest)serveletRequest);
		request.setParameter("test", "custom 파라미터 값");
		
		chain.doFilter(request, response);
	}
	
	private static class CustomRequest extends HttpServletRequestWrapper {
		Map<String, String[]> map파라미터;
		
		public CustomRequest(HttpServletRequest request) {
			super(request);
			this.map파라미터 = new HashMap<String, String[]>(request.getParameterMap()); // 기존 request 값을 수정가능한 map 으로 새로 생성
		}
		
		@Override
		public String getParameter(String 파라미터Key) {
			String 파라미터Value = null;
			String[] paramArray = getParameterValues(파라미터Key);
			if (paramArray != null && paramArray.length > 0) {
				파라미터Value = paramArray[0];
			}
			return 파라미터Value;
		}
		
		@Override
		public String[] getParameterValues(String 파라미터Key) {
			String[] 파라미터Value = null;
			String[] temp = this.map파라미터.get(파라미터Key);
			if (temp != null) {
				파라미터Value = new String[temp.length];
				// 파라미터Value = GF.파라미터암호화(파라미터Value);
				System.arraycopy(temp, 0, 파라미터Value, 0, temp.length);
			}
			return 파라미터Value;
		}
		
		@Override
		public Map<String, String[]> getParameterMap() {
			return Collections.unmodifiableMap(this.map파라미터);
		}

		@Override
		public Enumeration<String> getParameterNames() {
			return Collections.enumeration(this.map파라미터.keySet());
		}
		
		// 아래 정의된 setParameter 함수가 Custom Parameter 추가/수정 가능하게 함
		public void setParameter(String name, String value) {
			String[] oneParam = {value};
			setParameter(name, oneParam);
		}
		
		public void setParameter(String name, String[] values) {
			this.map파라미터.put(name, values);
		}
	}
}