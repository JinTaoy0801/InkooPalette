
import { PlayerStates } from "../PlayerController";
import OnGround from "./onGround";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { setLastPlayerPosition } from "../../Global/lastPlayerPosition";
export default class Walk extends OnGround{
    owner:AnimatedSprite;

    onEnter(options: Record<string, any>): void {
        this.parent.speed = this.parent.MIN_SPEED;
        if (!this.isAttacking())
            this.owner.animation.play("MOVE_RIGHT", false);
		setLastPlayerPosition(this.owner.position,this.owner.invertX);
    }

    update(deltaT: number): void {
        super.update(deltaT);
        let dir = this.getInputDirection();
        if (!this.owner.animation.isPlaying("MOVE_RIGHT") && !this.isAttacking()) {
            this.owner.animation.playIfNotAlready("MOVING_RIGHT", true);
        }
        if(dir.isZero()) {
            this.finished(PlayerStates.IDLE);
        }

        this.parent.velocity.x = dir.x * this.parent.speed;

        this.owner.move(this.parent.velocity.scaled(deltaT));
    }

	onExit(): Record<string, any> {

        //setLastPlayerPosition(this.owner.position);
        
        //console.log("after walk",this.owner.position);
		return {};
	}
}