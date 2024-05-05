import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Timer from "../../../../Wolfie2D/Timing/Timer";
import GoldlemState from "./GoldlemState";
import { GoldlemStates } from "../GoldlemController";

export default class Idle extends GoldlemState {
  onEnter(options: Record<string, any>): void {
    this.owner.animation.playIfNotAlready("IDLE_LEFT", true);
  }

  update(deltaT: number): void {
    super.update(deltaT);
    if(this.playerInPatrol(this.patrolArea)){
      this.finished(GoldlemStates.ALERTED);
    }
  }

  onExit(): Record<string, any> {
    this.owner.animation.stop();
    return {};
  }
}