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
      default: null,
    },
    air: {
      type: cc.Node,
      default: null,
    },
    explain: {
      type: cc.Prefab,
      default: null,
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.air.x = -(this.node.width + this.air.width) / 2;
  },

  start() {
    // //正式
    this.scheduleOnce(this.teach_next, 3);
    //调试
    // this.begin_game();
  },

  update(dt) {
    //控制玩家
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
    //end
    //控制飞机
    if (this.airFlag) {
      this.air.x += 250 * dt;
      if (this.air.x > (this.node.width + this.air.width) / 2) {
        this.air.removeFromParent();
      }
    }
  },

  air_controller() {
    if (parseInt(this.time.string) == 55) {
      this.airFlag = true;
    }
  },

  explain_controller() {
    if (parseInt(this.time.string) == 45) {
      cc.find("Canvas/1").active = true;
    } else if (parseInt(this.time.string) == 35) {
      cc.find("Canvas/2").active = true;
    } else if (parseInt(this.time.string) == 25) {
      cc.find("Canvas/3").active = true;
    } else if (parseInt(this.time.string) == 15) {
      cc.find("Canvas/4").active = true;
    }
  },

  teach_next() {
    cc.find("Canvas/time_bg_light").active = false;
    cc.find("Canvas/time_teach").active = false;

    cc.find("Canvas/score_bg_light").active = true;
    cc.find("Canvas/score_teach").active = true;

    this.scheduleOnce(this.teach_people, 3);
  },

  teach_people() {
    cc.find("Canvas/people_light").active = true;
    cc.find("Canvas/people_teach").active = true;

    cc.find("Canvas/score_bg_light").active = false;
    cc.find("Canvas/score_teach").active = false;

    this.scheduleOnce(this.begin_game, 3);
  },

  begin_game() {
    cc.find("Canvas/people_light").active = false;
    cc.find("Canvas/people_teach").active = false;
    cc.find("Canvas/overlay").active = false;

    cc.find("Canvas/score_bg").active = true;
    cc.find("Canvas/time_bg").active = true;

    this.node.on(cc.Node.EventType.TOUCH_START, this.control_player, this);
    this.schedule(this.make_red_package, 0.2 + Math.random());
    this.schedule(this.control_time, 1);
  },

  make_red_package() {
    let rp = cc.instantiate(this.redpack);
    this.node.addChild(rp);
  },

  control_time() {
    this.time = cc.find("Canvas/time_bg/time_text").getComponent(cc.Label);
    this.time.string = parseInt(this.time.string) - 1;
    this.air_controller();
    this.explain_controller();
    if (parseInt(this.time.string) == 0) {
      this.unschedule(this.control_time);
      this.unschedule(this.make_red_package);
      this.scheduleOnce(this.show_result, 3);
    }
  },

  control_player(e) {
    let pos = this.node.convertToNodeSpaceAR(
      cc.v2(e.getLocationX(), e.getLocationY())
    );
    this.posX = pos.x;
  },

  show_result() {
    cc.find("Canvas/overlay").active = true;
    cc.find("Canvas/result_text").active = true;
    let text_num = cc.find("Canvas/result_num");
    text_num.getComponent(cc.Label).string = cc.find("Canvas/score_bg/score_text").getComponent(cc.Label).string;
    text_num.active = true;
    cc.find("Canvas/congratulation").active = true;
    cc.find("Canvas/go_to_gift").active = true;
  }
});