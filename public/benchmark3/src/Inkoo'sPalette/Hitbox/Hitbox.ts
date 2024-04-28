import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Circle from "../../Wolfie2D/DataTypes/Shapes/Circle";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { inkooEvents } from "../inkooEvents";
import HitboxController from "./HitboxController";
import IP_Level from "../scenes/IP_Level";

export default class Hitbox {
    box: AnimatedSprite

    constructor(settings: Record<string, any>,group:string) {
        if (settings.shape != "circle") {
            this.box = settings.sprite;
            this.box.addPhysics(new AABB(settings.center, settings.halfSize), new Vec2(0, 0));
            this.box.addAI(HitboxController, settings);
        }
        else {
            this.box = settings.sprite;
            this.box.addPhysics(new Circle(settings.center, settings.halfSize), new Vec2(0, 0));
            this.box.addAI(HitboxController, settings);
        }

        this.box.setGroup(group); 
        console.log('box', this.box);
        if(group === "enemy"){
            this.box.setTrigger("player", inkooEvents.PLAYER_ATTACK,null);
        } else if(group === "player"){
            this.box.setTrigger("enemy", inkooEvents.TRASH_MOB_HIT,null);  
        }
    }
}