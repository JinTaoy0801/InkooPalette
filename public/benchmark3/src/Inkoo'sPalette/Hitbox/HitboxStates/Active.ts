import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import HitboxState from "./HitboxState";
import IP_Level from "../../scenes/IP_Level";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";


export default class Active extends HitboxState {
    onEnter(options: Record<string, any>) {
        this.stateName = "Active";
        this.owner.animation.play("ARM_RIGHT", false);
      }

    update(deltaT: number): void {
        super.update(deltaT);
        const player = (<IP_Level>this.owner.getScene()).player;

        let boxX = player.position.x + this.parent.offset.x;
        let boxY = player.position.y + this.parent.offset.y;
        if (this.parent.invertX) {
            boxX = player.position.x - this.parent.offset.x;
            this.owner.invertX = true;
        }

        this.owner.position = new Vec2(boxX, boxY);


        if (!this.owner.animation.isPlaying("ARM_RIGHT")) {
            this.owner.destroy();
        }
    }

    handleInput(event: GameEvent): void {
        
    }

    onExit(): Record<string, any> {
        return {};
    }
}