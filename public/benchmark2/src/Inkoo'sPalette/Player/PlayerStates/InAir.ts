import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { PlayerStates } from "../PlayerController";
import PlayerState from "./PlayerState";

export default abstract class InAir extends PlayerState {
    owner: AnimatedSprite;

    update(deltaT: number): void {
        super.update(deltaT);
        
        this.owner.animation.playIfNotAlready("FALLING", true);
        let dir = this.getInputDirection();
        
		this.parent.velocity.x += dir.x * this.parent.speed/3.5 - 0.3*this.parent.velocity.x;

		this.owner.move(this.parent.velocity.scaled(deltaT));

        if(this.owner.onGround){
			this.finished(PlayerStates.PREVIOUS);
		}
    }
}
