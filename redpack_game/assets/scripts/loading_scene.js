// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {},

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.progress_limit = 0.33;
    this.bar = this.node.getComponent(cc.ProgressBar);
    this.bar.progress = 0;
  },

  start() {
    cc.director.preloadScene("begin_scene", () => {
      this.progress_limit = 0.98;
      this.bar.progress = 0.53;

      cc.director.preloadScene("game", () => {
        cc.director.loadScene("begin_scene");
        this.bar.progress = 1;
      });
    });
  },

  update(dt) {
    let progress = this.bar.progress;
    if (progress < this.progress_limit) {
      progress += dt / 20;
      this.bar.progress = progress;
    }
  },
});