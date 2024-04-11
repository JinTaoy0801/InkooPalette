import Input from "../../../Wolfie2D/Input/Input";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Sprite from "../../../Wolfie2D/Nodes/Sprites/Sprite";
import MathUtils from "../../../Wolfie2D/Utils/MathUtils";
import { PlayerStates } from "../PlayerController";
import PlayerState from "./PlayerState";

export default abstract class InAir extends PlayerState {
    owner: AnimatedSprite;

    update(deltaT: number): void {
        super.update(deltaT);

        let dir = this.getInputDirection();

		if(dir.x !== 0) {
			(<Sprite>this.owner).invertX = MathUtils.sign(dir.x) < 0;
		}
        
		this.parent.velocity.x += dir.x * this.parent.speed/3.5 - 0.3*this.parent.velocity.x;

		this.owner.move(this.parent.velocity.scaled(deltaT));

        if(this.owner.onGround){
			this.finished(PlayerStates.PREVIOUS);
		}
        
        if (Input.isJustPressed("attack") && !this.owner.animation.isPlaying("ATTACK_RIGHT")) {
			this.finished(PlayerStates.ATTACK);
		}
    }
}