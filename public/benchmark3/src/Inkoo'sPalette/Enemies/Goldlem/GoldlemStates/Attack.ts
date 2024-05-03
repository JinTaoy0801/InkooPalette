import GoldlemState from "./GoldlemState"
import IP_Level from "../../../scenes/IP_Level";

export default class Attack extends GoldlemState{
    onEnter(options: Record<string, any>): void {
        this.owner.animation.playIfNotAlready("ATTACK", false);
        this.playerPosition = (<IP_Level>this.owner.getScene()).player.position;
    }
    onExit(): Record<string, any> {
        throw new Error("Method not implemented.");
    }

}
