import { setBG_Invincible } from "../../../Global/big_Goldem_Invincible";
import { Big_GoldlemStates } from "../Big_GoldlemController";
import Big_GoldlemState from "./Big_GoldlemState";

export default class Sleeping extends Big_GoldlemState {
    onEnter(options: Record<string, any>): void {
        setBG_Invincible(true);
        this.owner.animation.playIfNotAlready("SLEEP", true);
    }
    
    update(deltaT: number): void {
        super.update(deltaT);
        if(this.playerInPatrol(this.patrolArea)){
            setTimeout(() => {
                this.finished(Big_GoldlemStates.AWAKEN);
            }, 1000);
        }
    }
    
    onExit(): Record<string, any> {
        setBG_Invincible(false);
        return {};
    }
}