
import PlayerState from "./PlayerState";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import InAir from "./inAir";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import InkooAnimatedSprite from "../../Nodes/InkooAnimatedSprite";

export default class Fall extends PlayerState{
    owner: InkooAnimatedSprite
    onEnter(options: Record<string, any>): void { 
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
