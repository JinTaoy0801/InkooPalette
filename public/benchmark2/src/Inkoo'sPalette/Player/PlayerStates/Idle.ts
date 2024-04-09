
import InkooAnimatedSprite from "../../Nodes/InkooAnimatedSprite";
import { PlayerStates } from "../PlayerController";
import OnGround from "./onGround";
import Input from "../../../Wolfie2D/Input/Input";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";

export default class Idle extends OnGround{
    owner : AnimatedSprite;
    
	onEnter(options: Record<string, any>): void {
		this.parent.speed = this.parent.MIN_SPEED;
	}

	update(deltaT: number): void {
		
		super.update(deltaT);
		this.owner.animation.playIfNotAlready("IDLE_RIGHT", true);
		let dir = this.getInputDirection();

		if(!dir.isZero() && dir.y === 0){
			if(Input.isPressed("run")){
				this.finished(PlayerStates.RUN);
			} else {
				this.finished(PlayerStates.WALK);
			}
		}
		
		this.parent.velocity.x = 0;

		this.owner.move(this.parent.velocity.scaled(deltaT));
	}

	onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}