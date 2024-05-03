import Timer from "../../../../Wolfie2D/Timing/Timer";
import { MidasStates } from "../MidasController";
import Stage1State from "./Stage1State";

export default class Idle extends Stage1State {
    onEnter(options: Record<string, any>): void {
    }
  
    update(deltaT: number): void {
        super.update(deltaT);
        if (!this.checkPriorityAnimations()) {
            this.owner.animation.playIfNotAlready("IDLE_LEFT", true);
            if (this.playerInPatrol(this.patrolArea) && this.attackCooldown.isStopped()) {
                this.finished(MidasStates.SNAP);
                this.attackCooldown.start();
            }
        }
    }
  
    onExit(): Record<string, any> {
        this.owner.animation.stop();
        return {};
    }
}