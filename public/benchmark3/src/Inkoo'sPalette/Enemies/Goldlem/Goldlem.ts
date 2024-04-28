import AABB from "../../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { inkooEvents } from "../../inkooEvents";
import Enemy from "../Enemy";
import GoldlemController from "./GoldlemController";


export default class Goldlem extends Enemy{
    owner: AnimatedSprite;
    speed: number = 100;

    constructor(options: Record<string, any>,hp:number) {
        super(hp);
        this.owner = options.owner;

        this.owner.addPhysics(new AABB(Vec2.ZERO, new Vec2(14, 14)));
        this.owner.addAI(GoldlemController, options);
        this.owner.position.copy(options.spawn);
        this.owner.scale.set(1.5, 1.5);
        this.owner.setCollisionShape(new AABB(new Vec2(0,0), new Vec2(29, 27)));
        this.owner.colliderOffset.set(0, 1);
    }

}