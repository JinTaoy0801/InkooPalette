import { Big_GoldlemStates } from "../Big_GoldlemController";
import Big_GoldlemState from "./Big_GoldlemState";

export default class Sleeping extends Big_GoldlemState {
    onEnter(options: Record<string, any>): void {
        this.owner.animation.playIfNotAlready("SLEEP", true);
    }
    
    update(deltaT: number): void {
        super.update(deltaT);
        if(this.playerInPatrol(this.patrolArea)){
            this.finished(Big_GoldlemStates.AWAKEN);
        }
    }
    
    onExit(): Record<string, any> {
        return {};
    }
}