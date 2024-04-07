import Input from "../../../Wolfie2D/Input/Input";
import InkooAnimatedSprite from "../../Nodes/InkooAnimatedSprite";
import { inkooEvents } from "../../inkooEvents";
import { PlayerStates } from "../PlayerController";
import OnGround from "./onGround";


export default class Walking extends OnGround{
    owner:InkooAnimatedSprite;

    onEnter(options: Record<string, any>): void {
        this.parent.speed = this.parent.MIN_SPEED;
        this.owner.animation.playIfNotAlready("WALK", true);
    }

    update(deltaT: number): void {
        super.update(deltaT);

        let dir = this.getInputDirection();
        if(dir.isZero()) this.finished(PlayerStates.IDLE);

        this.parent.velocity.x = dir.x * this.parent.speed;

        this.owner.move(this.parent.velocity.scaled(deltaT));
    }

	onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}