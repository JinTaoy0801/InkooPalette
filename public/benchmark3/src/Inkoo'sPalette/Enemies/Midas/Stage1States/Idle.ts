import Stage1State from "./Stage1State";

export default class Idle extends Stage1State {
    onEnter(options: Record<string, any>): void {
        //console.log('went inside goblin idle')
        //console.log('asdhkasdhaskdasd', this.owner);
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
    }
  
    onExit(): Record<string, any> {
        this.owner.animation.stop();
        return {};
    }
}