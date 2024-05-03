import GoldlemState from "./GoldlemState"
import IP_Level, { Layers } from "../../../scenes/IP_Level";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Timer from "../../../../Wolfie2D/Timing/Timer";
import Hitbox from "../../../Hitbox/Hitbox";
import { GoldlemStates } from "../GoldlemController";

export default class Attack extends GoldlemState{
    attack: AnimatedSprite;
    onEnter(options: Record<string, any>): void {
        this.playerPosition = (<IP_Level>this.owner.getScene()).player.position;
        this.owner.animation.playIfNotAlready("ATTACK", false);
        this.attack = this.owner.getScene().add.animatedSprite("rock", Layers.Main);
        this.attack.scale.set(2, 2);
        const projectile = {
            actor: this.owner,
            sprite: this.attack,
            attack_name: "ROCK_ATTACK",
            eventType: "enemy",
            center: new Vec2(0, 0),
            halfSize: new Vec2(36, 36),
            invertX: this.owner.invertX,
            offset : new Vec2(-15, 0),
            targetPosition: new Vec2(this.playerPosition.x, this.playerPosition.y),
            shape: "AABB",
            colliderOffset: new Vec2(0, 5),
            customLocation: new Vec2(this.owner.position.x,this.owner.position.y-128),
            delay: new Timer(0),
            customProperties: "projectile"
        }
        let hitbox2 = new Hitbox(projectile, "enemy");
        
    }
    update(deltaT: number): void {
        super.update(deltaT);
        if (!this.owner.animation.isPlaying("ATTACK")) {

            if(this.playerInPatrol(this.patrolArea)){
                this.finished(GoldlemStates.ALERTED);
            } else{
                this.finished(GoldlemStates.IDLE);
            } 
       }
    }
    onExit(): Record<string, any> {
        this.owner.animation.stop();
		return {};
    }

}
