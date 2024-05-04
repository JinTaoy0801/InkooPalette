import { Big_GoldlemStates } from "../Big_GoldlemController";
import Big_GoldlemState from "./Big_GoldlemState"


export default class Slam extends Big_GoldlemState{
    onEnter(options: Record<string, any>): void {
        this.owner.animation.play("SLAM",false);
    }
    update(deltaT: number): void {
        if(!this.owner.animation.isPlaying("SLAM")){
            this.finished(Big_GoldlemStates.REFORM)
        }
    }
    onExit(): Record<string, any> {
        return {};
    }
    
}