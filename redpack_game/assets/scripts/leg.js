cc.Class({
  extends: cc.Component,

  properties: {},

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    let actionBy = cc.rotateBy(0.5, 360);
    let action = cc.repeatForever(actionBy);
    this.node.runAction(action);
  },

  start() {},

  // update (dt) {},
});
