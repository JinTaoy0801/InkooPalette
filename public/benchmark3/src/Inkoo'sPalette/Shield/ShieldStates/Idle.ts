import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import SheildState from "./ShieldState";

export default class Idle extends SheildState {
    onEnter(options: Record<string, any>) {
    }

    update(deltaT: number): void {
        if (!this.checkPriorityAnimations()) {
            this.shield.animation.playIfNotAlready("IDLE", true);
        }
        
    }

    handleInput(event: GameEvent): void {
    }

    onExit(): Record<string, any> {
        return {};
    }
}