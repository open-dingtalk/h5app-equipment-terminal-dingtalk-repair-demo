package com.dingtalk.service;

import com.aliyun.dingboot.common.login.DingTalkUser;
import com.aliyun.dingboot.common.token.ITokenManager;
import com.dingtalk.api.response.OapiV2UserGetResponse;
import com.dingtalk.config.AppConfig;
import com.taobao.api.ApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 用户管理
 */
@Service
public class UserManager {

    @Autowired
    ITokenManager tokenManager;

    @Autowired
    DingTalkUser dingTalkUser;

    @Autowired
    private AppConfig appConfig;

    /**
     * 根据免登授权码登录
     *
     * @param authCode 免登授权码
     * @return
     */
    public OapiV2UserGetResponse.UserGetResponse login(String authCode) throws ApiException {
        // 1. 获取access_token
        String accessToken = tokenManager.getAccessToken(appConfig.getAppKey(), appConfig.getAppSecret());
        // 2. 登录
        return dingTalkUser.login(authCode, accessToken);
    }
}
