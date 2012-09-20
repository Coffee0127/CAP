/* 
 * 
 * Copyright (c) 2009-2012 International Integrated System, Inc. 
 * All Rights Reserved.
 * 
 * Licensed Materials - Property of International Integrated System, Inc.
 * 
 * This software is confidential and proprietary information of 
 * International Integrated System, Inc. (&quot;Confidential Information&quot;).
 */
package com.iisigroup.cap.service.impl;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iisigroup.cap.base.dao.CodeTypeDao;
import com.iisigroup.cap.base.model.CodeType;
import com.iisigroup.cap.response.AjaxFormResult;
import com.iisigroup.cap.service.AbstractService;
import com.iisigroup.cap.service.CodeTypeService;

/**
 * <pre>
 * CodeType Service
 * </pre>
 * 
 * @since 2011/11/28
 * @author rodeschen
 * @version <ul>
 *          <li>2011/11/28,rodeschen,new
 *          </ul>
 */
@Service
public class CodeTypeServiceImpl extends AbstractService implements
		CodeTypeService {

	@Autowired
	private CodeTypeDao dao;

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.bqd.mci.service.CodeTypeService#saveCodeType(com.bqd.mci.model.CodeType
	 * )
	 */
	@Override
	public void saveCodeType(CodeType codeType) {
		dao.save(codeType);
	}

	@Override
	public Map<String, String> findByCodeType(String codeType, String locale) {
		List<CodeType> codeList = dao.findByCodeType(codeType, locale);
		Map<String, String> m = new LinkedHashMap<String, String>();
		if (!codeList.isEmpty()) {
			for (CodeType c : codeList) {
				m.put(c.getCodeType(), c.getCodeDesc());
			}
		}
		return m;
	}

	@Override
	public Map<String, Map<String, String>> findByCodeTypes(String[] types,
			String locale) {
		List<CodeType> codes = dao.findByCodeType(types, locale);
		Map<String, Map<String, String>> m = new LinkedHashMap<String, Map<String, String>>();
		if (!codes.isEmpty()) {
			for (int i = 0; i < types.length; i++) {
				Map<String, String> map = new LinkedHashMap<String, String>();
				for (CodeType c : codes) {
					if (types[i].equals(c.getCodeType())) {
						map.put(c.getCodeValue(), c.getCodeDesc());
						m.put(types[i], map);
					}
				}
			}
		}
		return m;
	}

	@Override
	public Map<String, AjaxFormResult> getCodeTypeByTypes(String[] types,
			String locale) {
		List<CodeType> codes = dao.findByCodeType(types, locale);
		Map<String, AjaxFormResult> m = new LinkedHashMap<String, AjaxFormResult>();
		for (CodeType c : codes) {
			String type = c.getCodeType();
			AjaxFormResult sm = m.get(type);
			if (sm == null) {
				sm = new AjaxFormResult();
			}
			sm.set(c.getCodeValue(), c.getCodeDesc());
			m.put(type, sm);
		}
		return m;
	}

	@Override
	public CodeType getByCodeTypeAndValue(String type, String value,
			String locale) {
		return dao.findByCodeTypeAndCodeValue(type, value, locale);
	}

	@Override
	public CodeType getById(String oid) {
		return dao.find(oid);
	}

	@Override
	public void deleteById(String oid) {
		CodeType codeType = dao.find(oid);
		if (codeType != null) {
			dao.delete(codeType);
		}
	}

}
