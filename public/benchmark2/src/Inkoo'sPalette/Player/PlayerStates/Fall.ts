import InAir from "./InAir";
import InkooAnimatedSprite from "../../Nodes/InkooAnimatedSprite";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
export default class Fall extends InAir{
    owner: AnimatedSprite
    onEnter(options: Record<string, any>): void { 
        this.owner.animation.playIfNotAlready("STOP_IN_AIR", true);
    }

    onExit(): Record<string, any> {
        this.owner.animation.playIfNotAlready("FELL", true);
        this.owner.animation.stop();
        return {};
    }

}
