import Input from "../../../Wolfie2D/Input/Input";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { PlayerStates } from "../PlayerController";
import PlayerState from "./PlayerState";

export default abstract class InAir extends PlayerState {
    owner: AnimatedSprite;

    update(deltaT: number): void {
        super.update(deltaT);

        let dir = this.getInputDirection();
        
		this.parent.velocity.x += dir.x * this.parent.speed/3.5 - 0.3*this.parent.velocity.x;

		this.owner.move(this.parent.velocity.scaled(deltaT));

        if(this.owner.onGround){
            if (!this.isAttacking())
                this.owner.tweens.play("flatten");
			this.finished(PlayerStates.PREVIOUS);
		}

        if (Input.isJustPressed("attack")) {
			this.finished(PlayerStates.ATTACK);
		}
    }
}