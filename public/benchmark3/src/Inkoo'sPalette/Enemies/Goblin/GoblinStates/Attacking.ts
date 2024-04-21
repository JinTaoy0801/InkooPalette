import { GoblinStates } from "../GoblinController";
import GoblinState from "./GoblinState";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import Hitbox from "../../../Hitbox/Hitbox";
import { Layers } from "../../../scenes/IP_Level";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";

export default class Attacking extends GoblinState{
    attack: AnimatedSprite
    onEnter(options: Record<string, any>): void {
        this.attackTimer.start()
        this.owner.animation.playIfNotAlready("GOBLIN_LIGHT_ATTACK", false);
        this.attack = this.owner.getScene().add.animatedSprite("GOBLIN_LIGHT_ATTACK", Layers.Main);
        this.attack.scale.set(2, 2);
        const HB_options = {
            actor: this.owner,
            sprite: this.attack,
            attack_name: "GOBLIN_LIGHT_ATTACK",
            eventType: "Enemy",
            center: new Vec2(0, 0),
            halfSize: new Vec2(48,14),
            invertX: this.owner.invertX,
            offset : new Vec2(-15, 0),
            shape: "AABB"
        }
        let hitbox = new Hitbox(HB_options);
    }
    update(deltaT: number): void {
        super.update(deltaT);

        if (!this.owner.animation.isPlaying("GOBLIN_LIGHT_ATTACK")) {
            if(this.playerInPatrol(this.patrolArea)){
                this.finished(GoblinStates.ALERTED);
            } else{
                this.finished(GoblinStates.WALKING);
            } 
       }
        
    }
    onExit(): Record<string, any> {
        this.owner.animation.stop();
		return {};
    }

}