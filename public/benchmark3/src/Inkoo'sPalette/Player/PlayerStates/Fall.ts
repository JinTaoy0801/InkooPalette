import InAir from "./InAir";
import InkooAnimatedSprite from "../../Nodes/InkooAnimatedSprite";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { PlayerStates } from "../PlayerController";
import { setLastPlayerPosition } from "../../Global/lastPlayerPosition";

export default class Fall extends InAir{
    owner: AnimatedSprite
    onEnter(options: Record<string, any>): void { 
        this.parent.velocity.y = 0;

        if (this.owner.isColliding && 
            !this.owner.onCeiling && 
            !this.owner.onWall) 
            this.finished(PlayerStates.IDLE);
    }

    update(deltaT: number): void {
        super.update(deltaT);
        if (!this.owner.animation.isPlaying("STOP_IN_AIR") && !this.isAttacking()) {
            this.owner.animation.playIfNotAlready("FALLING", true);
        }

        if (this.owner.isColliding && 
            !this.owner.onCeiling && 
            !this.owner.onWall) {
                this.finished(PlayerStates.IDLE);
            }

    }

    onExit(): Record<string, any> {
        if (!this.isAttacking()) {
            this.owner.animation.stop();
            this.owner.tweens.play("flatten");
        }
        //setLastPlayerPosition(this.owner.position);
        return {};
    }

}
