import PlayerState from "./PlayerState";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Timer from "../../../Wolfie2D/Timing/Timer";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { PlayerStates } from "../PlayerController";
import { Layers } from "../../scenes/IP_Level";
import HitboxController from "../../Hitbox/HitboxController";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import Hitbox from "../../Hitbox/Hitbox";

export default class Attack extends PlayerState {
    attack: AnimatedSprite;
    onEnter(options: Record<string, any>): void {
        this.owner.animation.playIfNotAlready("ATTACK_RIGHT", false);
        this.attack = this.owner.getScene().add.animatedSprite("arm_right", Layers.Main);
        this.attack.scale.set(1.5, 1.5);

        const HB_options = {
            actor: this.owner,
            sprite: this.attack,
            eventType: "Ally",
            center: new Vec2(0, 0),
            halfSize: new Vec2(21, 10.5),
            invertX: this.owner.invertX,
            offset: new Vec2(30, 9)
        }
        let hitbox = new Hitbox(HB_options);

        if (this.owner.onGround)
            this.finished(PlayerStates.IDLE);
        else
            this.finished(PlayerStates.FALL);
    }

    update(deltaT: number): void {
        // if (!this.owner.animation.isPlaying("ATTACK_RIGHT")) {
            if (this.owner.onGround)
                this.finished(PlayerStates.IDLE);
            else
                this.finished(PlayerStates.FALL);
        // }
    }

    onExit(): Record<string, any> {
        return {};
    }
}