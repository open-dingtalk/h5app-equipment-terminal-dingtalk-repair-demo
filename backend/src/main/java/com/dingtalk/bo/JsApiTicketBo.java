package com.dingtalk.bo;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * JsApiTicketBo
 *
 * @author whj
 * @date 2020-08-07 16:38:43
 */
@Data
public class JsApiTicketBo {

    /**
     * ticket
     */
    private String ticket;

    /**
     * 截止时间
     */
    private LocalDateTime deadline;
}
