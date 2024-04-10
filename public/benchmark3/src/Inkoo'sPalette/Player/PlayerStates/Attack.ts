import PlayerState from "./PlayerState";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Timer from "../../../Wolfie2D/Timing/Timer";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { PlayerStates } from "../PlayerController";
import { Layers } from "../../scenes/IP_Level";
import Hitbox from "../../Hitbox/Hitbox";

export default class Attack extends PlayerState {
    owner: AnimatedSprite;
    onEnter(options: Record<string, any>): void {
        console.log('eneteRerasdkaksdakdh')
        this.owner.animation.play("ATTACK_RIGHT", false);
        const sprite = this.owner.getScene().add.animatedSprite("arm_right", Layers.Main);
        sprite.scale.set(1.5, 1.5);


        const timer = new Timer(
            100,
            () => {
              let hitbox = new Hitbox(this.owner, sprite, "Ally", new Vec2(0, 0), new Vec2(21, 10.5), this.owner.invertX, new Vec2(30, 9));
            },
            false,
        );
        
        timer.start();
    }

    update(deltaT: number): void {
        if (!this.owner.animation.isPlaying("ATTACK_RIGHT")) {
            console.log('playing attack aniamtions')
            this.finished(PlayerStates.IDLE);
        }
    }

    onExit(): Record<string, any> {
        return {};
    }
}