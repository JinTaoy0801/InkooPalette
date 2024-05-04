import { Big_GoldlemStates } from "../Big_GoldlemController";
import Big_GoldlemState from "./Big_GoldlemState";


export default class Reform extends Big_GoldlemState{
    onEnter(options: Record<string, any>): void {
        this.owner.animation.play("REFORM", false);
    }
    update(deltaT: number): void {
        if(!this.owner.animation.isPlaying("REFORM")){
            this.finished(Big_GoldlemStates.IDLE);
        }
    }
    onExit(): Record<string, any> {
        return {};
    }

}