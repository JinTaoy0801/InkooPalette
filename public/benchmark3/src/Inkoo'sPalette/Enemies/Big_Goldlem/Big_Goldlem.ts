import AABB from "../../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Enemy from "../Enemy";
import Big_GoldlemController from "./Big_GoldlemController";

export default class Big_Goldlem extends Enemy {
    owner: AnimatedSprite;
    speed: number = 100;

    constructor(options: Record<string, any>,hp:number) {
        super(hp);
        this.owner = options.owner;

        //spawn goblin
        this.owner.addPhysics(new AABB(Vec2.ZERO, new Vec2(14, 14)));
        this.owner.addAI(Big_GoldlemController, options);
        this.owner.position.copy(options.spawn);
        this.owner.scale.set(1.5, 1.5);
        this.owner.setCollisionShape(new AABB(new Vec2(0,0), new Vec2(29, 27)));
        this.owner.colliderOffset.set(0, 1);
        this.owner.setGroup("enemy");
    }
}