cc.Class({
  extends: cc.Component,

  properties: {},

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},
  start() {
    this.node.on(cc.Node.EventType.TOUCH_START, this.to_gift, this);
  },

  // update (dt) {},

  to_gift(e) {
    e.stopPropagation();
    const oauth2_url =
      "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6d4c967a36137d82" +
      "&redirect_uri=" +
      encodeURI("http://tongan-gov.jihoukeji.vip/gift.html") +
      "&response_type=code&scope=snsapi_userinfo&state=oauth_approved#wechat_redirect";
    window.location.href = oauth2_url;
    // cc.director.loadScene('gift');
  },
});