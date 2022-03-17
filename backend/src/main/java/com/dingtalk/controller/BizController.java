package com.dingtalk.controller;

import com.alibaba.fastjson.JSONObject;
import com.dingtalk.config.AppConfig;
import com.dingtalk.model.RpcServiceResult;
import com.dingtalk.service.BizManager;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 主业务Controller，编写你的代码
 */
@Slf4j
@RestController
@RequestMapping("/biz")
public class BizController {

    @Autowired
    BizManager bizManager;

    @Autowired
    private AppConfig appConfig;

    @RequestMapping("/hello")
    public RpcServiceResult hello() {
        String hello = bizManager.hello();
        if (StringUtils.isEmpty(hello)) {
            return RpcServiceResult.getFailureResult("-1", "fail");
        }
        return RpcServiceResult.getSuccessResult(hello);
    }

    /**
     * 获取JsApi鉴权
     */
    @PostMapping("/getJsApiAuth")
    public RpcServiceResult getJsApiAuth(@RequestBody JSONObject params) {
        try {
            JSONObject json = bizManager.getJsApiAuth(params.getString("url"));
            return RpcServiceResult.getSuccessResult(json);
        } catch (Exception e) {
            log.error("", e);
            return RpcServiceResult.getFailureResult("-1", "fail");
        }
    }

    /**
     * 获取部门用户基础信息
     */
    @PostMapping("/getDepartmentUserBasicInfo")
    public RpcServiceResult getDepartmentUserBasicInfo() {
        try {
            JSONObject json = bizManager.getDepartmentUserBasicInfo();
            return RpcServiceResult.getSuccessResult(json);
        } catch (Exception e) {
            log.error("", e);
            return RpcServiceResult.getFailureResult("-1", "fail");
        }
    }

    /**
     * 发送工作通知
     */
    @PostMapping("/sendWorkNotification")
    public RpcServiceResult sendWorkNotification(@RequestBody JSONObject params) {
        try {
            bizManager.sendWorkNotification(params);
            return RpcServiceResult.getSuccessResult(null);
        } catch (Exception e) {
            log.error("", e);
            return RpcServiceResult.getFailureResult("-1", "fail");
        }
    }

    /**
     * 获取钉钉秘钥
     */
    @PostMapping("/getDingSecretKey")
    public RpcServiceResult getDingSecretKey() {
        try {
            JSONObject json = new JSONObject();
            json.put("appKey", appConfig.getAppKey());
            json.put("appSecret", appConfig.getAppSecret());
            json.put("corpId", appConfig.getCorpId());
            json.put("agentId", appConfig.getAgentId());
            return RpcServiceResult.getSuccessResult(json);
        } catch (Exception e) {
            log.error("", e);
            return RpcServiceResult.getFailureResult("-1", "fail");
        }
    }
}
