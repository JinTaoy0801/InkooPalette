import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import { Big_GoldlemStates } from "../Big_GoldlemController";
import Big_GoldlemState from "./Big_GoldlemState";
import { setBG_Invincible } from "../../../Global/big_Goldem_Invincible";

export default class Reform extends Big_GoldlemState{
    onEnter(options: Record<string, any>): void {
        setBG_Invincible(true);
        this.owner.animation.play("REFORM", false);
    }
    update(deltaT: number): void {
        if(!this.owner.animation.isPlaying("REFORM")){
            
            this.finished(Big_GoldlemStates.IDLE);
        }
        this.owner.move(Vec2.ZERO);
    }
    onExit(): Record<string, any> {
        setBG_Invincible(false);
        return {};
    }

}