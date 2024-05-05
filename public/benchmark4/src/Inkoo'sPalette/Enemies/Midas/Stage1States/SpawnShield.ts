import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Shield from "../../../Shield/Shield";
import { Layers } from "../../../scenes/IP_Level";
import { MidasStates } from "../MidasController";
import Stage1State from "./Stage1State";

export default class SpawnShield extends Stage1State {
    sheild: AnimatedSprite

    onEnter(options: Record<string, any>): void {
        this.sheild = this.owner.getScene().add.animatedSprite("shield", Layers.Main);
        this.sheild.scale.set(1.5, 1.5);
        
        const HB_options = {
            actor: this.owner,
            sprite: this.sheild,
            center: new Vec2(0, 0),
            halfSize: new Vec2(60, 60),
            offset : new Vec2(0, 0)
        }
        let hitbox = new Shield(HB_options,"enemy");
        this.owner.animation.play("SNAP", false);
    }
  
    update(deltaT: number): void {
        super.update(deltaT);
        if (!this.owner.animation.isPlaying("SNAP")) {
            this.finished(MidasStates.STAGE1_IDLE);
        }
    }
  
    onExit(): Record<string, any> {
        this.owner.animation.stop();
        return {};
    }
}