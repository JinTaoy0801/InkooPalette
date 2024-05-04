import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import { Big_GoldlemStates } from "../Big_GoldlemController";
import Big_GoldlemState from "./Big_GoldlemState";

export default class Idle extends Big_GoldlemState {
  onEnter(options: Record<string, any>): void {
    this.owner.animation.playIfNotAlready("IDLE", true);
  }

  update(deltaT: number): void {
    super.update(deltaT);
    
    if (this.parent.coinFlip()) {
      this.finished(Big_GoldlemStates.WALKING);
    }
    // if(this.playerInPatrol(this.patrolArea)){
    //   this.finished(Big_GoldlemStates.ALERTED);
    // }
    this.owner.move(Vec2.ZERO);
  }

  onExit(): Record<string, any> {
    return {};
  }
}