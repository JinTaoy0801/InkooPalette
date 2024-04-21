import { GoblinStates } from "../GoblinController";
import GoblinState from "./GoblinState";
import IP_Level from "../../../scenes/IP_Level";

export default class Alerted extends GoblinState{
    
    onEnter(options: Record<string, any>): void {
        this.owner.animation.playIfNotAlready("TURN_LEFT", false);
        this.playerPosition = (<IP_Level>this.owner.getScene()).player.position;
    }
    update(deltaT: number): void {
        if (!this.owner.animation.isPlaying("TURN_LEFT")) {
            this.owner.animation.playIfNotAlready("WALKING_LEFT", true);
        }
        super.update(deltaT);
        this.playerPosition = (<IP_Level>this.owner.getScene()).player.position;
        this.parent.direction = this.owner.position.dirTo(this.playerPosition);
        if(this.parent.direction.x < 0){
            this.parent.directionPatrol = 'left';
        } else{
            this.parent.directionPatrol = 'right';
        }
        if (this.parent.patrolArea.leftBound > this.owner.position.x) {
            this.finished(GoblinStates.WALKING);
        }
        else if (this.parent.patrolArea.rightBound < this.owner.position.x)
            this.finished(GoblinStates.WALKING);

        this.parent.velocity.x = this.parent.direction.x * this.parent.speed;
        this.owner.move(this.parent.velocity.scaled(deltaT));
    }
    onExit(): Record<string, any> {
        return {};
    }

}