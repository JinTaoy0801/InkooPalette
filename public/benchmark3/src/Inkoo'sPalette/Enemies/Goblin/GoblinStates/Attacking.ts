import { GoblinStates } from "../GoblinController";
import GoblinState from "./GoblinState";


export default class Attacking extends GoblinState{
    onEnter(options: Record<string, any>): void {
        this.attackTimer.start();
        this.Aggro = true;
    }
    update(deltaT: number): void {
        super.update(deltaT);
        this.owner.animation.playIfNotAlready("LIGHT_ATTACK", false);
    }
    onExit(): Record<string, any> {
        this.owner.animation.stop();
		return {};
    }

}