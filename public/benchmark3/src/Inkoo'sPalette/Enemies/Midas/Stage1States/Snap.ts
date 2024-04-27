import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Timer from "../../../../Wolfie2D/Timing/Timer";
import Hitbox from "../../../Hitbox/Hitbox";
import { Layers } from "../../../scenes/IP_Level";
import { MidasStates } from "../MidasController";
import Stage1State from "./Stage1State";

export default class Snap extends Stage1State {
    attack: AnimatedSprite;

    onEnter(options: Record<string, any>): void {
        this.attackTimer.start()
        this.owner.animation.play("SNAP", false);
        // this.attack = this.owner.getScene().add.animatedSprite("GOBLIN_LIGHT_ATTACK", Layers.Main);
        // this.attack.scale.set(2, 2);
        // const HB_options = {
        //     actor: this.owner,
        //     sprite: this.attack,
        //     attack_name: "GOBLIN_LIGHT_ATTACK",
        //     eventType: "enemy",
        //     center: new Vec2(0, 0),
        //     halfSize: new Vec2(40, 14),
        //     invertX: this.owner.invertX,
        //     offset : new Vec2(-15, 0),
        //     shape: "AABB",
        //     colliderOffset: new Vec2(0, 5),
        //     delay: new Timer(300)
        // }
        // let hitbox = new Hitbox(HB_options,"enemy");
    }
    update(deltaT: number): void {
        if (!this.owner.animation.isPlaying("SNAP")) {
            console.log('dude snapping')
            this.emitter.fireEvent("SPAWNBEAM");
            this.finished(MidasStates.STAGE1_IDLE);
        }
        super.update(deltaT);
    }
    onExit(): Record<string, any> {
        this.owner.animation.stop();
		return {};
    }
}