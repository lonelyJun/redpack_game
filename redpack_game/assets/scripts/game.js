// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    player: {
      type: cc.Node,
      default: null,
    },
    speedX: 500,
    redpack: {
      type: cc.Prefab,
      default: null
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    //开启碰撞检测
  },

  start() {
    this.scheduleOnce(this.teach_next, 2);
  },


  update(dt) {
    if (this.posX > 0) {
      if (this.player.x < (this.node.width - this.player.width) / 2) {
        this.player.x += this.speedX * dt;
      }
      this.player.scaleX = 1;
    } else if (this.posX < 0) {
      if (this.player.x > -(this.node.width - this.player.width) / 2) {
        this.player.x -= this.speedX * dt;
      }
      this.player.scaleX = -1;
    }
  },


  teach_next() {
    cc.find('Canvas/time_bg_light').active = false;
    cc.find('Canvas/time_teach').active = false;

    cc.find('Canvas/score_bg_light').active = true;
    cc.find('Canvas/score_teach').active = true;

    this.scheduleOnce(this.begin_game, 2)
  },

  begin_game() {
    cc.find('Canvas/score_bg_light').active = false;
    cc.find('Canvas/score_teach').active = false;
    cc.find('Canvas/overlay').active = false;

    cc.find('Canvas/score_bg').active = true;
    cc.find('Canvas/time_bg').active = true;

    this.node.on(cc.Node.EventType.TOUCH_START, this.control_player, this);
    this.rp_schedule = this.schedule(this.make_red_package, 0.2 + Math.random())
    this.time_schedule = this.schedule(this.control_time, 1)
  },

  make_red_package() {
    let rp = cc.instantiate(this.redpack);
    this.node.addChild(rp);

  },

  control_time() {
    let time = cc.find('Canvas/time_bg/time_text').getComponent(cc.Label);
    time.string = parseInt(time.string) - 1;
    if (parseInt(time.string) == 58) {
      this.unschedule(this.rp_schedule);
      console.log(this.rp_schedule)
    }
  },

  control_player(e) {
    let pos = this.node.convertToNodeSpaceAR(
      cc.v2(e.getLocationX(), e.getLocationY())
    );
    this.posX = pos.x;
  },
});