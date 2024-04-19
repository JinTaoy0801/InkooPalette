
import Input from "../../../Wolfie2D/Input/Input";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Sprite from "../../../Wolfie2D/Nodes/Sprites/Sprite";
import MathUtils from "../../../Wolfie2D/Utils/MathUtils";
import { PlayerStates } from "../PlayerController";
import PlayerState from "./PlayerState";

export default class OnGround extends PlayerState {
	owner: AnimatedSprite
	onEnter(options: Record<string, any>): void {
	}

	update(deltaT: number): void {
		if(this.parent.velocity.y > 0){
			this.parent.velocity.y = 0;
		}
		super.update(deltaT);

		let direction = this.getInputDirection();

		if(direction.x !== 0){
			(<Sprite>this.owner).invertX = MathUtils.sign(direction.x) < 0;
		}

		if(Input.isJustPressed("jump")){
			// console.log('ran');
			this.finished(PlayerStates.JUMP);
			this.parent.velocity.y = -500;
		} else if(!this.owner.onGround) {
			this.finished(PlayerStates.FALL);
		}
	}

	onExit(): Record<string, any> {
		return {};
	}
}