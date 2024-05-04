import AABB from "../../../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import { setBG_Invincible } from "../../../Global/big_Goldem_Invincible";
import { Big_GoldlemStates } from "../Big_GoldlemController";
import Big_GoldlemState from "./Big_GoldlemState";

export default class Sleeping extends Big_GoldlemState {
    onEnter(options: Record<string, any>): void {
        this.owner.setCollisionShape(new AABB(new Vec2(0,0), new Vec2(42, 36)));
        this.owner.colliderOffset.set(0, 35);
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