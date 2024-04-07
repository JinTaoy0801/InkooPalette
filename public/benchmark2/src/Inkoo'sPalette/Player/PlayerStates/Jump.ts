import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import { GameEventType } from "../../../Wolfie2D/Events/GameEventType";
import { inkooEvents } from "../../inkooEvents";
import { PlayerStates } from "../PlayerController";
import InkooAnimatedSprite from "../../Nodes/InkooAnimatedSprite";
import InAir from "./inAir";

export default class Jump extends InAir{
    owner: InkooAnimatedSprite;

    onEnter(options: Record<string, any>): void {
    //this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "jump", loop: false, holdReference: false});
    this.owner.animation.playIfNotAlready("JUMP", false);
    }

    update(deltaT: number): void {
        super.update(deltaT);
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