package com.dingtalk.service;

import com.alibaba.fastjson.JSONObject;
import com.aliyun.dingboot.common.token.ITokenManager;
import com.dingtalk.api.DefaultDingTalkClient;
import com.dingtalk.api.DingTalkClient;
import com.dingtalk.api.request.OapiGetJsapiTicketRequest;
import com.dingtalk.api.request.OapiMessageCorpconversationAsyncsendV2Request;
import com.dingtalk.api.request.OapiUserListsimpleRequest;
import com.dingtalk.api.response.OapiGetJsapiTicketResponse;
import com.dingtalk.api.response.OapiMessageCorpconversationAsyncsendV2Response;
import com.dingtalk.api.response.OapiUserListsimpleResponse;
import com.dingtalk.bo.JsApiTicketBo;
import com.dingtalk.config.AppConfig;
import com.dingtalk.util.DdConfigSign;
import com.taobao.api.ApiException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * 主业务service，编写你的代码
 */
@Slf4j
@Service
public class BizManager {

    private static final JsApiTicketBo JS_API_TICKET_BO = new JsApiTicketBo();

    @Autowired
    private ITokenManager tokenManager;

    @Autowired
    private AppConfig appConfig;

    public String hello() {
        return "HelloWorld";
    }

    /**
     * 获取JsApiTicket
     */
    public String getJsApiTicket() throws ApiException {
        String ticket = JS_API_TICKET_BO.getTicket();
        LocalDateTime deadline = JS_API_TICKET_BO.getDeadline();
        if (deadline != null && deadline.isAfter(LocalDateTime.now()) && StringUtils.isNotBlank(ticket)) {
            return ticket;
        }
        String accessToken = tokenManager.getAccessToken(appConfig.getAppKey(), appConfig.getAppSecret());
        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/get_jsapi_ticket");
        OapiGetJsapiTicketRequest request = new OapiGetJsapiTicketRequest();
        request.setHttpMethod("GET");
        OapiGetJsapiTicketResponse response = client.execute(request, accessToken);
        String res = response.getBody();
        JSONObject json = JSONObject.parseObject(res);
        Integer errCode = json.getInteger("errcode");
        if (!new Integer(0).equals(errCode)) {
            throw new RuntimeException(String.format("获取JsApiTicket失败: %s", res));
        }
        ticket = json.getString("ticket");
        deadline = LocalDateTime.now().plusMinutes(110L);
        JS_API_TICKET_BO.setTicket(ticket);
        JS_API_TICKET_BO.setDeadline(deadline);
        return ticket;
    }

    /**
     * 获取JsApi鉴权
     */
    public JSONObject getJsApiAuth(String url) throws Exception {
        String jsApiTicket = this.getJsApiTicket();
        long timeStamp = System.currentTimeMillis();
        String nonceStr = UUID.randomUUID().toString();
        String signature = DdConfigSign.sign(jsApiTicket, nonceStr, timeStamp, url);
        JSONObject json = new JSONObject();
        json.put("timeStamp", String.valueOf(timeStamp));
        json.put("nonceStr", nonceStr);
        json.put("signature", signature);
        return json;
    }

    /**
     * 获取部门用户基础信息
     */
    public JSONObject getDepartmentUserBasicInfo() throws ApiException {
        String accessToken = tokenManager.getAccessToken(appConfig.getAppKey(), appConfig.getAppSecret());
        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/topapi/user/listsimple");
        OapiUserListsimpleRequest request = new OapiUserListsimpleRequest();
        request.setDeptId(1L);
        request.setCursor(0L);
        request.setSize(50L);
        request.setOrderField("modify_desc");
        request.setContainAccessLimit(false);
        request.setLanguage("zh_CN");
        OapiUserListsimpleResponse response = client.execute(request, accessToken);
        String res = response.getBody();
        JSONObject json = JSONObject.parseObject(res);
        Integer errCode = json.getInteger("errcode");
        if (!new Integer(0).equals(errCode)) {
            throw new RuntimeException(String.format("获取部门用户基础信息失败: %s", res));
        }
        return json.getJSONObject("result");
    }

    /**
     * 发送工作通知
     */
    public void sendWorkNotification(JSONObject params) throws ApiException {
        String accessToken = tokenManager.getAccessToken(appConfig.getAppKey(), appConfig.getAppSecret());
        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/topapi/message/corpconversation/asyncsend_v2");
        OapiMessageCorpconversationAsyncsendV2Request request = new OapiMessageCorpconversationAsyncsendV2Request();
        request.setAgentId(appConfig.getAgentId());
        request.setUseridList(params.getString("userIdList"));
        request.setToAllUser(false);

        OapiMessageCorpconversationAsyncsendV2Request.Msg msg = new OapiMessageCorpconversationAsyncsendV2Request.Msg();
        msg.setMsgtype("text");
        msg.setText(new OapiMessageCorpconversationAsyncsendV2Request.Text());
        msg.getText().setContent(params.getString("content"));
        request.setMsg(msg);

        OapiMessageCorpconversationAsyncsendV2Response response = client.execute(request, accessToken);
        String res = response.getBody();
        JSONObject json = JSONObject.parseObject(res);
        Integer errCode = json.getInteger("errcode");
        if (!new Integer(0).equals(errCode)) {
            throw new RuntimeException(String.format("发送工作通知失败: %s", res));
        }
    }
}
