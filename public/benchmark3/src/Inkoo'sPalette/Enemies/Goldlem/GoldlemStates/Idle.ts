import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Timer from "../../../../Wolfie2D/Timing/Timer";
import GoldlemState from "./GoldlemState";
import { GoldlemStates } from "../GoldlemController";

export default class Idle extends GoldlemState {
  onEnter(options: Record<string, any>): void {
    this.owner.animation.playIfNotAlready("IDLE_LEFT", true);
      //console.log('went inside goblin idle')
  }

  update(deltaT: number): void {
    super.update(deltaT);
    // if(this.playerInPatrol(this.patrolArea)){
    //   this.finished(GoldlemStates.ALERTED);
    // }
    this.owner.move(Vec2.ZERO);
  }

  onExit(): Record<string, any> {
    this.owner.animation.stop();
    return {};
  }
}