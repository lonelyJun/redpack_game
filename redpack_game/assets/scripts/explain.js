cc.Class({
  extends: cc.Component,

  properties: {
    explain_type: {
      type: cc.SpriteFrame,
      default: []
    },
  },


  onLoad() {
    //设置礼包图片样式
    this.speed = 200;
  },


  start() {
    cc.director.getCollisionManager().enabled = true;
    // cc.director.getCollisionManager().enabledDebugDraw = true;
    // cc.director.getCollisionManager().enabledDrawBoundingBox = true;
  },

  update(dt) {
    // if (this.node.y >= -this.c_height / 2) {
    this.node.y -= this.speed * dt;
    // }
    // if () {
    //   this.node.removeFromParent();
    // }
  },

  onCollisionEnter(other, self) {
    this.node.removeFromParent();
    let score = cc.find('Canvas/score_bg/score_text')
    score.getComponent(cc.Label).string = parseInt(score.getComponent(cc.Label).string) + 100;
  },
});