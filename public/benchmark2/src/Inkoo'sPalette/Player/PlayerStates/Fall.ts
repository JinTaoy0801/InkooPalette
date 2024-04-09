
import InAir from "./InAir";
import InkooAnimatedSprite from "../../Nodes/InkooAnimatedSprite";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
export default class Fall extends InAir{
    owner: AnimatedSprite
    onEnter(options: Record<string, any>): void { 
        this.owner.animation.playIfNotAlready("IDLE_LEFT", true);
        this.owner.animation.playIfNotAlready("MOVE_RIGHT", true);
    }

    update(deltaT: number): void {
        if(!this.owner.onGround)
            this.owner.animation.playIfNotAlready("FALLING", true);
        else this.finished("fall");
    }

    onExit(): Record<string, any> {
        this.owner.animation.playIfNotAlready("FELL", true);
        this.owner.animation.stop();
        return {};
    }

}
