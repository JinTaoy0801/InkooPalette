
import InAir from "./inAir";
import InkooAnimatedSprite from "../../Nodes/InkooAnimatedSprite";

export default class Fall extends InAir{
    owner: InkooAnimatedSprite
    onEnter(options: Record<string, any>): void { 
        this.owner.animation.playIfNotAlready("FALL", true);
    }

    onExit(): Record<string, any> {
        this.owner.animation.stop();
        return {};
    }

}
