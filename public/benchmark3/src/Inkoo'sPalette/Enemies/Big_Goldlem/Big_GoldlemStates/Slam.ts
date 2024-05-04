import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { Big_GoldlemStates } from "../Big_GoldlemController";
import Big_GoldlemState from "./Big_GoldlemState"
import { Layers } from "../../../scenes/IP_Level";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import Timer from "../../../../Wolfie2D/Timing/Timer";
import Hitbox from "../../../Hitbox/Hitbox";
import { setBG_Invincible } from "../../../Global/big_Goldem_Invincible";

export default class Slam extends Big_GoldlemState{
    attack: AnimatedSprite;
    onEnter(options: Record<string, any>): void {
        this.attackTimer.start()
        this.owner.animation.play("SLAM",false);
        this.attack = this.owner.getScene().add.animatedSprite("goldlem_wave", Layers.Main);
        this.attack.scale.set(2, 2);
        const HB_options = {
            actor: this.owner,
            sprite: this.attack,
            attack_name: "WAVE_ATTACK",
            eventType: "enemy",
            center: new Vec2(0, 0),
            halfSize: 32,
            invertX: false,
            offset : new Vec2(0, 0),
            shape: "circle",
            customLocation: new Vec2(this.owner.position.x,this.owner.position.y+24),
            customProperties: "left_wave",
            colliderOffset: new Vec2(0, 0),
            delay: new Timer(0),
            wait:200
        }
        let hitbox = new Hitbox(HB_options,"enemy");
        this.attack = this.owner.getScene().add.animatedSprite("goldlem_wave", Layers.Main);
        this.attack.scale.set(2, 2);
        const HB_options2 = {
            actor: this.owner,
            sprite: this.attack,
            attack_name: "WAVE_ATTACK",
            eventType: "enemy",
            center: new Vec2(0, 0),
            halfSize: 32,
            invertX: true,
            offset : new Vec2(0, 0),
            shape: "circle",
            customLocation: new Vec2(this.owner.position.x,this.owner.position.y+24),
            customProperties: "right_wave",
            colliderOffset: new Vec2(0, 0),
            delay: new Timer(0),
            wait: 200
        }
        let hitbox2 = new Hitbox(HB_options2, "enemy");
    }
    update(deltaT: number): void {
        super.update(deltaT);
        if(!this.owner.animation.isPlaying("SLAM")){
            this.finished(Big_GoldlemStates.REFORM)
            
        }
    }
    onExit(): Record<string, any> {
        console.log("exit slam");
        return {};
    }
    
}