
import { PlayerStates } from "../PlayerController";
import OnGround from "./onGround";
import InkooAnimatedSprite from "../../Nodes/InkooAnimatedSprite";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
export default class Walk extends OnGround{
    owner:AnimatedSprite;

    onEnter(options: Record<string, any>): void {
        this.parent.speed = this.parent.MIN_SPEED;
        if (!this.owner.animation.isPlaying("ATTACK_RIGHT"))
            this.owner.animation.play("MOVE_RIGHT", false);
    }

    update(deltaT: number): void {
        super.update(deltaT);
        let dir = this.getInputDirection();
        if (!this.owner.animation.isPlaying("MOVE_RIGHT") && !this.owner.animation.isPlaying("ATTACK_RIGHT")) {
            this.owner.animation.playIfNotAlready("MOVING_RIGHT", true);
        }
        if(dir.isZero()) {
            this.finished(PlayerStates.IDLE);
        }

        this.parent.velocity.x = dir.x * this.parent.speed;

        this.owner.move(this.parent.velocity.scaled(deltaT));
    }

	onExit(): Record<string, any> {
		// this.owner.animation.stop();
		return {};
	}
}