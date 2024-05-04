import AABB from "../../../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import { Big_GoldlemStates } from "../Big_GoldlemController";
import Big_GoldlemState from "./Big_GoldlemState";


export default class Awaken extends Big_GoldlemState {
    onEnter(options: Record<string, any>): void {

        this.owner.animation.play("AWAKEN",false);
    }
    update(deltaT: number): void {
        if(!this.owner.animation.isPlaying("AWAKEN")){
            this.finished(Big_GoldlemStates.IDLE)
        }
    }
    onExit(): Record<string, any> {

        return {};
    }

}
