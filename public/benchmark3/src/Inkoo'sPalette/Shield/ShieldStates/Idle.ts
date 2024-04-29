import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import SheildState from "./ShieldState";

export default class Idle extends SheildState {
    onEnter(options: Record<string, any>) {
        this.shield.animation.play("IDLE", true);
    }

    update(deltaT: number): void {
        this.shield.animation.playIfNotAlready("IDLE", true);
    }

    handleInput(event: GameEvent): void {
        
    }

    onExit(): Record<string, any> {
        return {};
    }
}