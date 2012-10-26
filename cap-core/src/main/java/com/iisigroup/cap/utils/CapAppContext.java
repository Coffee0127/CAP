package com.iisigroup.cap.utils;

import java.util.Locale;

import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.core.io.Resource;

import com.iisigroup.cap.operation.simple.SimpleContextHolder;

/**
 * <pre>
 * ApplicationContext
 * </pre>
 * 
 * @since 2011/11/4
 * @author rodeschen
 * @version <ul>
 *          <li>2011/11/4,rodeschen,new
 *          </ul>
 */
public class CapAppContext implements ApplicationContextAware {

	@Override
	public void setApplicationContext(ApplicationContext ctx) {
		applicationContext = ctx;
	}

	private static ApplicationContext applicationContext;

	public static ApplicationContext getApplicationContext() {
		return applicationContext;
	}

	@SuppressWarnings("unchecked")
	public static <T> T getBean(String beanName) {
		return (T) (applicationContext.containsBean(beanName) ? applicationContext
				.getBean(beanName) : null);
	}

	public static Resource getResource(String path) {
		Resource resource = applicationContext.getResource(path);
		return resource;
	}

	@SuppressWarnings("unchecked")
	public static <T> T getBean(String beanName, Class<Object> c) {
		return (T) applicationContext.getBean(beanName, c);
	}

	public static String getMessage(String key) {
		Locale locale = (Locale) SimpleContextHolder.get(CapWebUtil.localeKey);
		return getMessage(key, null, locale == null ? Locale.getDefault()
				: locale);
	}

	public static String getMessage(String key, Object[] args) {
		Locale locale = (Locale) SimpleContextHolder.get(CapWebUtil.localeKey);
		return getMessage(key, args, locale == null ? Locale.getDefault()
				: locale);
	}

	public static String getMessage(String key, Locale locale) {
		return getMessage(key, null, locale);
	}

	public static String getMessage(String key, Object[] args, Locale locale) {
		return applicationContext.getMessage(key, args, locale);
	}

}