import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import HitboxState from "./HitboxState";
import IP_Level from "../../scenes/IP_Level";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";


export default class Active extends HitboxState {
    owner: AnimatedSprite;
    setting: Record<string, any>;
    onEnter(options: Record<string, any>) {
        this.owner = this.attack;
        this.setting = this.parent.settings;
        
        this.owner.animation.play(this.setting.attack_name, false);
    }

    update(deltaT: number): void {
        super.update(deltaT);
        const player = this.setting.actor;
        
        let boxX = player.position.x + this.setting.offset.x;
        let boxY = player.position.y + this.setting.offset.y;
        if (this.setting.invertX) {
            boxX = player.position.x - this.setting.offset.x;
        }
        this.owner.invertX = this.setting.invertX

        this.owner.position = new Vec2(boxX, boxY);

        if (this.setting.attack_name == "ATTACK_UP") {
            this.owner.colliderOffset.set(0, 16);
        }

        if (!this.owner.animation.isPlaying(this.setting.attack_name)) {
            this.owner.destroy();
        }
    }

    handleInput(event: GameEvent): void {
        
    }

    onExit(): Record<string, any> {
        return {};
    }
}