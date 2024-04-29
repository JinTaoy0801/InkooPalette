import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Circle from "../../Wolfie2D/DataTypes/Shapes/Circle";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { inkooEvents } from "../inkooEvents";
import ShieldController from "./ShieldController";

export default class Shield {
    box: AnimatedSprite
    hp: number

    constructor(settings: Record<string, any>, group:string) {
        this.box = settings.sprite;
        this.box.addPhysics(new Circle(settings.center, settings.halfSize), new Vec2(0, 0));
        this.box.addAI(ShieldController, settings);


        this.box.setGroup(group); 
        this.hp = 3;
        // // console.log('box', this.box);
        // if(group === "enemy"){
        //     this.box.setTrigger("player", inkooEvents.PLAYER_ATTACK,null);
        // } else if(group === "player"){
        //     this.box.setTrigger("enemy", inkooEvents.TRASH_MOB_HIT,null);  
        // }
    }

    setHp(dmg:number){
        this.hp += dmg;
        // if(this.hp <= 0){
        //     this.hp.tweens.play("DEATH");
        // }
    }
}