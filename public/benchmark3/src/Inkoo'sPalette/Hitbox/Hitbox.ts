import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Circle from "../../Wolfie2D/DataTypes/Shapes/Circle";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import HitboxController from "./HitboxController";


export default class Hitbox {
    box: AnimatedSprite
    circle: AnimatedSprite

    constructor(settings: Record<string, any>) {
        if (settings.shape != "circle") {
            this.box = settings.sprite;
            this.box.addPhysics(new AABB(settings.center, settings.halfSize), new Vec2(0, 0));
            this.box.addAI(HitboxController, settings);
        }
        else {
            this.circle = settings.sprite;
            this.circle.addPhysics(new Circle(settings.center, settings.halfSize), new Vec2(0, 0));
            this.circle.addAI(HitboxController, settings);
        }
    }
}