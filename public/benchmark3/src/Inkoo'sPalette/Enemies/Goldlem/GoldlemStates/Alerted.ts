import IP_Level from "../../../scenes/IP_Level";
import { GoldlemStates } from "../GoldlemController";
import GoldlemState from "./GoldlemState";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";

export default class Alerted extends GoldlemState {
    onEnter(options: Record<string, any>): void {
        this.owner.animation.playIfNotAlready("ATTACK", false);
        this.playerPosition = (<IP_Level>this.owner.getScene()).player.position;
    }

    update(deltaT: number): void {
        super.update(deltaT);

        // if (this.parent.patrolArea.leftBound > this.owner.position.x || this.parent.patrolArea.rightBound < this.owner.position.x) {
        //     this.finished(GoldlemStates.IDLE);
        // }
        this.owner.move(Vec2.ZERO);
    }

    onExit(): Record<string, any> {
        return {};
    }
}