import Timer from "../../../../Wolfie2D/Timing/Timer";
import { MidasStates } from "../MidasController";
import Stage1State from "./Stage1State";

export default class Idle extends Stage1State {
    onEnter(options: Record<string, any>): void {
        this.attackCooldown = new Timer(5000);
        this.attackCooldown.start();
    }
  
    update(deltaT: number): void {
        super.update(deltaT);
        this.owner.animation.playIfNotAlready("IDLE_LEFT", true);
        // if (this.parent.coinFlip()) {
        //     this.finished(GoblinStates.WALKING);
        // }
        // if(this.playerInPatrol(this.patrolArea)){
        //     this.finished(GoblinStates.ALERTED);
        // }
        if (this.attackCooldown.isStopped()) {
            this.finished(MidasStates.SNAP);
        }
    }
  
    onExit(): Record<string, any> {
        this.owner.animation.stop();
        return {};
    }
}