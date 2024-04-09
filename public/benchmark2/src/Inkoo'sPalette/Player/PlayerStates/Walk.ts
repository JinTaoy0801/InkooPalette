
import { PlayerStates } from "../PlayerController";
import OnGround from "./onGround";
import InkooAnimatedSprite from "../../Nodes/InkooAnimatedSprite";

export default class Walk extends OnGround{
    owner:InkooAnimatedSprite;

    onEnter(options: Record<string, any>): void {
        this.parent.speed = this.parent.MIN_SPEED;
    }

    update(deltaT: number): void {
        super.update(deltaT);
        this.owner.animation.playIfNotAlready("WALK", true)
        let dir = this.getInputDirection();
        console.log("walk input:", dir);
        if(dir.isZero()) {
            this.finished(PlayerStates.IDLE);
        }

        this.parent.velocity.x = dir.x * this.parent.speed;

        this.owner.move(this.parent.velocity.scaled(deltaT));
    }

	onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}