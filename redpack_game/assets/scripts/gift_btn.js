cc.Class({
  extends: cc.Component,

  properties: {
    gift_node: {
      type: cc.Node,
      default: []
    },
    gift_ori: {
      type: cc.SpriteFrame,
      default: []
    },
    gift_light: {
      type: cc.SpriteFrame,
      default: []
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.node.on(cc.Node.EventType.TOUCH_START, this.get_gift, this);
    this.index = 0;
    this.preIndex = 7;
    this.counter = 0;
    this.speed = 0.1;
    this.gift_index = 0;
  },

  start() {

  },

  get_gift() {
    this.schedule(this.gifting, this.speed)
  },

  gifting() {
    this.index++;
    if (this.index > 7) {
      this.index = 0;
      this.counter++;
      this.unschedule(this.gifting);
      if (this.counter == 1) {
        this.speed = 0.2
      } else if (this.counter == 2) {
        this.speed = 0.3
      } else if (this.counter == 3) {
        this.speed = 0.4
      }

      this.schedule(this.gifting, this.speed)

    }
    this.preIndex++;
    if (this.preIndex > 7) {
      this.preIndex = 0;
    }
    let node_cur = this.gift_node[this.index];
    let node_prev = this.gift_node[this.preIndex]
    node_cur.getComponent(cc.Sprite).spriteFrame = this.gift_light[this.index];
    node_prev.getComponent(cc.Sprite).spriteFrame = this.gift_ori[this.preIndex];

    if (this.counter == 3 && this.index == this.gift_index) {
      this.unschedule(this.gifting);
      this.scheduleOnce(this.show_result, 1);
    }
  },

  show_result() {
    cc.find("Canvas/overlay").active = true;
    if (this.gift_index == 0) {
      cc.find("Canvas/no_gift").active = true;
    }
  }

  // update (dt) {},
});