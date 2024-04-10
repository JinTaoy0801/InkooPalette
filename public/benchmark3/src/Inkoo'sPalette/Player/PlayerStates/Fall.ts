import InAir from "./InAir";
import InkooAnimatedSprite from "../../Nodes/InkooAnimatedSprite";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { PlayerStates } from "../PlayerController";
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
        if (!this.owner.animation.isPlaying("STOP_IN_AIR")) {
            this.owner.animation.playIfNotAlready("FALLING", true);
        }

        if (this.owner.isColliding && 
            !this.owner.onCeiling && 
            !this.owner.onWall) 
            this.finished(PlayerStates.IDLE);

    }

    onExit(): Record<string, any> {
        this.owner.animation.stop();
        this.owner.tweens.play("flatten");
        return {};
    }

}
