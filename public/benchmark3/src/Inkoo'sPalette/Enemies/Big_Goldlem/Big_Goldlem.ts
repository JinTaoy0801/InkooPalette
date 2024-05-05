import AABB from "../../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Enemy from "../Enemy";
import Big_GoldlemController from "./Big_GoldlemController";
import { getBG_Invincible } from "../../Global/big_Goldem_Invincible";
import { Layers } from "../../scenes/IP_Level";
import Hitbox from "../../Hitbox/Hitbox";
import Timer from "../../../Wolfie2D/Timing/Timer";
import { TweenableProperties } from "../../../Wolfie2D/Nodes/GameNode";
import { EaseFunctionType } from "../../../Wolfie2D/Utils/EaseFunctions";
export default class Big_Goldlem extends Enemy {
    owner: AnimatedSprite;
    dead: AnimatedSprite;
    speed: number = 100;
    constructor(options: Record<string, any>,hp:number) {
        super(hp);
        this.owner = options.owner;
        this.name = 'big_goldlem';
        this.owner.addPhysics(new AABB(Vec2.ZERO, new Vec2(14, 14)));
        this.owner.addAI(Big_GoldlemController, options);
        this.owner.position.copy(options.spawn);
        this.owner.scale.set(1.5, 1.5);
        this.owner.setGroup("enemy");
        this.owner.tweens.add("take_DMG", {
            startDelay: 0,
            duration: 500,
            effects: [
                {
                    property: TweenableProperties.alpha,
                    start: 0,
                    end: 1,
                    ease: EaseFunctionType.LINEAR,
                    resetOnComplete: true
                }
            ]
        });
    }
    setHp(dmg:number){
        if(!getBG_Invincible()){
            super.setHp(dmg);
            this.owner.tweens.play("take_DMG");
        }
            
        if (this.getHp() == 0) {
            console.log("dying");
            // this.owner.removePhysics();
            this.owner.animation.play("DYING",false,"BOSS_DEFEATED");
            this.dead = this.owner.getScene().add.animatedSprite("deadsplit", Layers.Main);
            this.dead.scale.set(1.5, 1.5);
            const HB_options = {
                actor: this.owner,
                sprite: this.dead,
                attack_name: "DYING",
                eventType: "enemy",
                center: new Vec2(0, 0),
                halfSize: new Vec2(80, 56),
                invertX: this.owner.invertX,
                offset : new Vec2(0, 0),
                shape: "AABB",
                colliderOffset: new Vec2(5, 5),
                delay: new Timer(0)
            }
            let hitbox = new Hitbox(HB_options,"enemy");
            this.dead.removePhysics();
        }
    }
}