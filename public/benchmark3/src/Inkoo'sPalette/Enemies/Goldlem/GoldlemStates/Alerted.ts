import IP_Level from "../../../scenes/IP_Level";
import { GoldlemStates } from "../GoldlemController";
import GoldlemState from "./GoldlemState";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";

export default class Alerted extends GoldlemState {
    onEnter(options: Record<string, any>): void {
    }

    update(deltaT: number): void {
        super.update(deltaT);
        this.parent.direction = this.owner.position.dirTo(this.playerPosition);
        if(this.parent.direction.x < 0){
            this.parent.directionPatrol = 'left';
            this.owner.invertX = false;
        } else{
            this.parent.directionPatrol = 'right';
            this.owner.invertX = true;
        }
        if(this.attackTimer.isStopped()){
            this.finished(GoldlemStates.ATTACKING);
            this.attackTimer.start()
        }
        
        if (this.parent.patrolArea.leftBound > this.owner.position.x || this.parent.patrolArea.rightBound < this.owner.position.x) {
            this.finished(GoldlemStates.IDLE);
        }
       
    }

    onExit(): Record<string, any> {
        return {};
    }
}