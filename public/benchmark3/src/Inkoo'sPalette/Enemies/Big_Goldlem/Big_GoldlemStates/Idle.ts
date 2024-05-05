import AABB from "../../../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import { Big_GoldlemStates } from "../Big_GoldlemController";
import Big_GoldlemState from "./Big_GoldlemState";

export default class Idle extends Big_GoldlemState {
  onEnter(options: Record<string, any>): void {
    this.owner.setCollisionShape(new AABB(new Vec2(0,0), new Vec2(42, 56)));
    this.owner.colliderOffset.set(0, 1);
  }

  update(deltaT: number): void {
    super.update(deltaT);
    if (!this.checkPriorityAnimations()) {
      this.owner.animation.playIfNotAlready("IDLE", true);
      if (this.parent.coinFlip()) {
        this.finished(Big_GoldlemStates.WALKING);
      }
      else if(this.playerInPatrol(this.patrolArea) && this.attackTimer.isStopped()){
        this.finished(Big_GoldlemStates.SLAM);
        this.attackTimer.start();
      }
    }
  }

  onExit(): Record<string, any> {

    return {};
  }
}