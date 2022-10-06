package com.trippiece.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Collections;

@Configuration
public class CorsConfig {

   @Bean
   public CorsFilter corsFilter() {
      UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
      CorsConfiguration config = new CorsConfiguration();
      config.setAllowCredentials(true);
      config.addAllowedOriginPattern("*");// e.g. http://domain1.com
      config.addAllowedHeader("*");
      config.addAllowedMethod("*");
      config.setExposedHeaders(Collections.singletonList("msg"));
      config.addAllowedHeader("msg");

      source.registerCorsConfiguration("/**", config);
      return new CorsFilter(source);
   }

}
