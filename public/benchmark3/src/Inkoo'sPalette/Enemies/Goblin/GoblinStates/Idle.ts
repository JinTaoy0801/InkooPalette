import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Timer from "../../../../Wolfie2D/Timing/Timer";
import GoblinState from "./GoblinState";
import { GoblinStates } from "../GoblinController";

export default class Idle extends GoblinState {
    onEnter(options: Record<string, any>): void {
        this.owner.animation.playIfNotAlready("IDLE_LEFT", true);
        console.log('went inside goblin idle')
    }

    update(deltaT: number): void {
		    super.update(deltaT);
        
        if (this.parent.coinFlip()) {
          this.finished(GoblinStates.WALKING);
        }
    }

    onExit(): Record<string, any> {
        this.owner.animation.stop();
		    return {};
    }
}