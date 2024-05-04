import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Timer from "../../../../Wolfie2D/Timing/Timer";
import GoblinState from "./GoblinState";
import { GoblinStates } from "../GoblinController";

export default class Idle extends GoblinState {
  onEnter(options: Record<string, any>): void {
  }

  update(deltaT: number): void {
    super.update(deltaT);
    this.owner.animation.playIfNotAlready("IDLE_LEFT", true);
    if (this.parent.coinFlip()) {
      this.finished(GoblinStates.WALKING);
    }
    if(this.playerInPatrol(this.patrolArea)){
      this.finished(GoblinStates.ALERTED);
    }
    this.owner.move(Vec2.ZERO);
  }

  onExit(): Record<string, any> {
      this.owner.animation.stop();
  return {};
  }
}