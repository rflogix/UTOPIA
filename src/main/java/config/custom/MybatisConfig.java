package config.custom;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import config.spring.BeanNameConfig;

public class MybatisConfig {
	// 도메인별로 DB 접속 정보가 상이하므로 application.yml 에 도메인별로 세팅
	
	// 패키지1 에는 @Primary 추가
	public static final String 패키지1 = "buildingpoint.admin";
	public static final String 패키지1_마이바티스경로 = 패키지1; // 패키지 구조와 mybatis 경로가 다를경우 따로 설정
	
	// 패키지2부터는 @Primary 제외
	public static final String 패키지2 = "siaa";
	public static final String 패키지2_마이바티스경로 = 패키지2; // 패키지 구조와 mybatis 경로가 다를경우 따로 설정
}




//****************************************************************************
// 패키지1
//****************************************************************************

@Configuration
@MapperScan(basePackages = {MybatisConfig.패키지1}, sqlSessionFactoryRef = "SqlSessionFactory_패키지1", nameGenerator = BeanNameConfig.class)
@EnableTransactionManagement
class MybatisConfig_패키지1 {
	@Primary
	@Bean(name = "DataSource_패키지1")
	@ConfigurationProperties(prefix = GC.마이바티스_YML+"."+MybatisConfig.패키지1) // application.yml 의 도메인별 mybatis db 정보
	public DataSource DataSource_패키지1() {
		return DataSourceBuilder.create().build();
	}
	
	@Primary
	@Bean(name = "SqlSessionFactory_패키지1")
	public SqlSessionFactory SqlSessionFactory_패키지1(@Qualifier("DataSource_패키지1") DataSource dataSource) throws Exception {
		SqlSessionFactoryBean sqlSessionFactory = new SqlSessionFactoryBean();
		sqlSessionFactory.setDataSource(dataSource);
		sqlSessionFactory.setTypeAliasesPackage(MybatisConfig.패키지1);
		sqlSessionFactory.setMapperLocations(new PathMatchingResourcePatternResolver().getResources(GC.마이바티스_루트경로+MybatisConfig.패키지1_마이바티스경로.replaceAll("[.]", "/")+"/*.xml"));
		return sqlSessionFactory.getObject();
	}
	
	@Primary
	@Bean(name = "SqlSessionTemplate_패키지1")
	public SqlSessionTemplate SqlSessionTemplate_패키지1(@Qualifier("SqlSessionFactory_패키지1") SqlSessionFactory sqlSessionFactory) throws Exception {
		return new SqlSessionTemplate(sqlSessionFactory);
	}
	
	@Primary
	@Bean(name = "DataSourceTransactionManager_패키지1")
	public PlatformTransactionManager DataSourceTransactionManager_패키지1(@Qualifier("DataSource_패키지1") DataSource dataSource) {
		return new DataSourceTransactionManager(dataSource);
	}
}




//****************************************************************************
// 패키지2
//****************************************************************************

@Configuration
@MapperScan(basePackages = {MybatisConfig.패키지2}, sqlSessionFactoryRef = "SqlSessionFactory_패키지2", nameGenerator = BeanNameConfig.class)
@EnableTransactionManagement
class MybatisConfig_패키지2 {
	//@Primary
	@Bean(name = "DataSource_패키지2")
	@ConfigurationProperties(prefix = GC.마이바티스_YML+"."+MybatisConfig.패키지2) // application.yml 의 도메인별 mybatis db 정보
	public DataSource DataSource_패키지2() {
		return DataSourceBuilder.create().build();
	}
	
	//@Primary
	@Bean(name = "SqlSessionFactory_패키지2")
	public SqlSessionFactory SqlSessionFactory_패키지2(@Qualifier("DataSource_패키지2") DataSource dataSource) throws Exception {
		SqlSessionFactoryBean sqlSessionFactory = new SqlSessionFactoryBean();
		sqlSessionFactory.setDataSource(dataSource);
		sqlSessionFactory.setTypeAliasesPackage(MybatisConfig.패키지2);
		sqlSessionFactory.setMapperLocations(new PathMatchingResourcePatternResolver().getResources(GC.마이바티스_루트경로+MybatisConfig.패키지2_마이바티스경로.replaceAll("[.]", "/")+"/*.xml"));
		return sqlSessionFactory.getObject();
	}
	
	//@Primary
	@Bean(name = "SqlSessionTemplate_패키지2")
	public SqlSessionTemplate SqlSessionTemplate_패키지2(@Qualifier("SqlSessionFactory_패키지2") SqlSessionFactory sqlSessionFactory) throws Exception {
		return new SqlSessionTemplate(sqlSessionFactory);
	}
	
	//@Primary
	@Bean(name = "DataSourceTransactionManager_패키지2")
	public PlatformTransactionManager DataSourceTransactionManager_패키지2(@Qualifier("DataSource_패키지2") DataSource dataSource) {
		return new DataSourceTransactionManager(dataSource);
	}
}