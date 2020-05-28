cc.Class({
  extends: cc.Component,

  properties: {
    redpack_type: {
      type: cc.SpriteFrame,
      default: []
    },
  },


  onLoad() {
    let r = Math.floor(Math.random() * 3);
    if (r == 3) {
      r = 2;
    }
    let sp = this.node.getComponent(cc.Sprite);
    sp.spriteFrame = this.redpack_type[r];
    this.speedY = Math.random() * 1000 + 500;
    let windowSize = cc.view.getVisibleSize();
    this.c_width = windowSize.width;
    this.c_height = windowSize.height;
    this.node.x = (this.c_width - this.node.width / 2) * (Math.random() - 0.5)
    this.node.y = (this.c_height + this.node.height) / 2
  },

  start() {
    cc.director.getCollisionManager().enabled = true;
    // cc.director.getCollisionManager().enabledDebugDraw = true;
    // cc.director.getCollisionManager().enabledDrawBoundingBox = true;
  },

  update(dt) {
    this.node.y -= this.speedY * dt;
    if (this.node.y < -this.c_height / 2) {
      this.node.removeFromParent();
    }
  },

  onCollisionEnter(other, self) {
    this.node.removeFromParent();
    let score = cc.find('Canvas/score_bg/score_text')
    score.getComponent(cc.Label).string = parseInt(score.getComponent(cc.Label).string) + 1;
  },
});