import Timer from "../../../../Wolfie2D/Timing/Timer";
import { GoblinStates } from "../GoblinController";
import GoblinState from "./GoblinState";


export default class Walking extends GoblinState {
    onEnter(options: Record<string, any>): void {
        this.owner.animation.playIfNotAlready("TURN_LEFT", false);
        //console.log('went inside goblin walking elft')
    }

    update(deltaT: number): void {
        if (!this.owner.animation.isPlaying("TURN_LEFT")) {
            this.owner.animation.playIfNotAlready("WALKING_LEFT", true);
        }
        super.update(deltaT);
        // console.log('ownerposition', this.owner.position);
        if (this.parent.coinFlip()) {
            //console.log('AVENTURINE')
            this.finished(GoblinStates.IDLE);
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