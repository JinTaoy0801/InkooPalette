import InAir from "./InAir";
import InkooAnimatedSprite from "../../Nodes/InkooAnimatedSprite";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
export default class Fall extends InAir{
    owner: AnimatedSprite
    onEnter(options: Record<string, any>): void { 
        this.owner.animation.play("STOP_IN_AIR", false);
    }

    update(deltaT: number): void {
        super.update(deltaT);
        if (!this.owner.animation.isPlaying("STOP_IN_AIR")) {
            this.owner.animation.playIfNotAlready("FALLING", true);
        }
    }

    onExit(): Record<string, any> {
        return {};
    }

}
