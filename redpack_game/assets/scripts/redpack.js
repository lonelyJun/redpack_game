cc.Class({
  extends: cc.Component,

  properties: {
    redpack_type: {
      type: cc.SpriteFrame,
      default: []
    },
  },


  onLoad() {
    //设置礼包图片样式
    let r = Math.floor(Math.random() * 3);
    if (r == 3) {
      r = 2;
    }
    let sp = this.node.getComponent(cc.Sprite);
    sp.spriteFrame = this.redpack_type[r];
    this.scale = 0.5 + Math.random();
    this.node.scaleX = this.scale;
    this.node.scaleY = this.scale;
    this.score = Math.floor(1 / this.scale * 10)
    this.speedY = (Math.random() * 1000 + 500) / this.scale;
    let windowSize = cc.view.getVisibleSize();
    this.c_height = windowSize.height;
    this.c_width = windowSize.width > (1200 * this.c_height / 1920) ? (1200 * this.c_height / 1920) : windowSize.width;
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
      this.node.opacity = 0;
      this.scheduleOnce(() => {
        this.node.removeFromParent();
      }, 10)
    }
  },

  onCollisionEnter(other, self) {
    this.node.getComponent(cc.AudioSource).play();
    this.node.opacity = 0;
    let score = cc.find('Canvas/score_bg/score_text')
    score.getComponent(cc.Label).string = parseInt(score.getComponent(cc.Label).string) + this.score;
    this.scheduleOnce(() => {
      this.node.removeFromParent();
    }, 10)

  },
});