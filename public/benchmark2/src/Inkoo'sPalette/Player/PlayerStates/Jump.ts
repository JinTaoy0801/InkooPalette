
import { PlayerStates } from "../PlayerController";
import InkooAnimatedSprite from "../../Nodes/InkooAnimatedSprite";
import InAir from "./inAir";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
export default class Jump extends InAir{
    owner: AnimatedSprite;

    onEnter(options: Record<string, any>): void {
    //this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "jump", loop: false, holdReference: false});
    
    }

    update(deltaT: number): void {
        super.update(deltaT);
        this.owner.animation.playIfNotAlready("JUMP", true);
        if(this.owner.onCeiling){
            this.parent.velocity.y = 0;
        }
        if(this.parent.velocity.y >= 0){
			this.finished(PlayerStates.FALL);
		}
	}

	onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}