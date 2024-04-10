import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import HitboxController from "./HitboxController";


export default class Hitbox {
    box: AnimatedSprite

    constructor(owner: AnimatedSprite, sprite: AnimatedSprite, eventType: string, center: Vec2, halfSize: Vec2, invertX: boolean, offset: Vec2) {
        this.box = sprite;

        this.box.addPhysics(new AABB(center, halfSize), new Vec2(0, 0));

        this.box.addAI(HitboxController, {
            invertX: invertX,
            offset: offset,
            eventType: eventType,
            owner: owner,
          });
    }
}