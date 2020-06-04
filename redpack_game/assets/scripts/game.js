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
    },
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.audio = this.node.getComponent(cc.AudioSource);
  },

  start() {

    this.title1 = cc.find("Canvas/1");
    this.title2 = cc.find("Canvas/2");
    this.title3 = cc.find("Canvas/3");
    this.title4 = cc.find("Canvas/4");
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
      if (this.air.x < (this.node.width + this.air.width * 2) / 2) {
        this.air.x += 250 * dt;
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
      this.title1.active = true;
    } else if (parseInt(this.time.string) == 35) {
      this.title2.active = true;
    } else if (parseInt(this.time.string) == 25) {
      this.title3.active = true;
    } else if (parseInt(this.time.string) == 15) {
      this.title4.active = true;
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
    this.airFlag = false;
    cc.find("Canvas/people_light").active = false;
    cc.find("Canvas/people_teach").active = false;
    cc.find("Canvas/overlay").active = false;
    cc.find("Canvas/result_text").active = false;
    cc.find("Canvas/result_num").active = false;
    cc.find("Canvas/congratulation").active = false;
    cc.find("Canvas/again_game").active = false;
    this.title1.y = (this.node.height - this.title1.height) / 2;
    this.title2.y = (this.node.height - this.title2.height) / 2;
    this.title3.y = (this.node.height - this.title3.height) / 2;
    this.title4.y = (this.node.height - this.title4.height) / 2;

    this.title1.opacity = 255;
    this.title2.opacity = 255;
    this.title3.opacity = 255;
    this.title4.opacity = 255;

    this.title1.active = false;
    this.title2.active = false;
    this.title3.active = false;
    this.title4.active = false;



    // cc.find("Canvas/congratulation/go_to_gift").active = false;

    // cc.find("Canvas/score_bg").active = true;
    // cc.find("Canvas/time_bg").active = true;



    //重置
    this.air.x = -(this.node.width * 2 + this.air.width * 2) / 2;
    this.time = cc.find("Canvas/time_bg/time_text").getComponent(cc.Label).string = 60;
    cc.find("Canvas/score_bg/score_text").getComponent(cc.Label).string = 0;

    this.audio.play();

    this.node.on(cc.Node.EventType.TOUCH_START, this.control_player, this);
    this.schedule(this.make_red_package, 0.5);
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
      this.scheduleOnce(this.show_result, 5);
    }
  },

  control_player(e) {
    let pos = this.node.convertToNodeSpaceAR(
      cc.v2(e.getLocationX(), e.getLocationY())
    );
    this.posX = pos.x;
  },

  show_result() {
    this.audio.stop();

    cc.find("Canvas/overlay").active = true;
    cc.find("Canvas/result_text").active = true;
    let text_num = cc.find("Canvas/result_num");
    text_num.getComponent(cc.Label).string = cc
      .find("Canvas/score_bg/score_text")
      .getComponent(cc.Label).string;
    text_num.active = true;

    if (parseInt(text_num.getComponent(cc.Label).string) >= 1000) {
      cc.find("Canvas/congratulation").active = true;
    } else {
      cc.find("Canvas/again_game").active = true;
      cc.find("Canvas/again_game/again_btn").on(cc.Node.EventType.TOUCH_START, this.to_again, this);
    }

    // cc.find("Canvas/congratulation/go_to_gift").active = true;
  },

  to_again(e) {
    e.stopPropagation();
    this.begin_game();
  }
});