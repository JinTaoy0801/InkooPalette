import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import GoblinState from "./GoblinState";

export default class Idle extends GoblinState {
    onEnter(options: Record<string, any>): void {
        this.parent.speed = 100;
        console.log("ran?????")
        this.owner.animation.playIfNotAlready("IDLE_LEFT", true);
    }
    update(deltaT: number): void {
		super.update(deltaT);
    }

    onExit(): Record<string, any> {
        this.owner.animation.stop();
		return {};
    }
}