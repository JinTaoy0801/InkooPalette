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
        this.owner.animation.play("ATTACK", false);
        this.attack = this.owner.getScene().add.animatedSprite("gold", Layers.Main);
        this.attack.scale.set(3, 3);
        const projectile = {
            actor: this.owner,
            sprite: this.attack,
            attack_name: "ATTACK",
            eventType: "enemy",
            center: new Vec2(0, 0),
            halfSize: 6,
            invertX: this.owner.invertX,
            offset : new Vec2(0, 0),
            targetPosition: new Vec2(this.playerPosition.x, this.playerPosition.y),
            shape: "circle",
            colliderOffset: new Vec2(0, 0),
            customLocation: new Vec2(this.owner.position.x,this.owner.position.y-40),
            delay: new Timer(0),
            //wait: new Timer(0),
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
