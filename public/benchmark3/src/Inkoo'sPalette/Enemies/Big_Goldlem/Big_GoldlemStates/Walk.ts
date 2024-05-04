import Timer from "../../../../Wolfie2D/Timing/Timer";
import { Big_GoldlemStates } from "../Big_GoldlemController";
import Big_GoldlemState from "./Big_GoldlemState";

export default class Walking extends Big_GoldlemState {
    onEnter(options: Record<string, any>): void {
        this.owner.animation.playIfNotAlready("TURN_LEFT", false);
    }

    update(deltaT: number): void {
        super.update(deltaT);
        if (!this.owner.animation.isPlaying("TURN_LEFT")) {
            this.owner.animation.playIfNotAlready("WALKING_LEFT", true);
        }
        if(this.inRanged(2) && this.attackTimer.isStopped()){
            this.finished(Big_GoldlemStates.SLAM);
            this.attackTimer.start();
        }

        let dir = 0;
        if (this.parent.directionPatrol == "right")
            dir = 1;
        else if (this.parent.directionPatrol == "left")
            dir = -1;

        if (this.parent.patrolArea.leftBound > this.owner.position.x) {
            this.parent.directionPatrol = 'right';
        }
        else if (this.parent.patrolArea.rightBound < this.owner.position.x)
            this.parent.directionPatrol = 'left';

        this.parent.velocity.x = dir * this.parent.speed;

        this.owner.move(this.parent.velocity.scaled(deltaT));
    }

    onExit(): Record<string, any> {
        return {};
    }
}