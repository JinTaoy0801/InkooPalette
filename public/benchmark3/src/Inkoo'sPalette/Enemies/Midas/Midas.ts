import AABB from "../../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Enemy from "../Enemy";
import MidasController from "./MidasController";

export default class Midas extends Enemy {
    owner: AnimatedSprite;

    constructor(options: Record<string, any>,hp:number) {
        super(hp);
        this.owner = options.owner;
        this.name = 'midas';

        this.owner.addPhysics(new AABB(Vec2.ZERO, new Vec2(14, 14)));
        this.owner.addAI(MidasController, options);
        this.owner.position.copy(options.spawn);
        this.owner.scale.set(1.5, 1.5);
        this.owner.setCollisionShape(new AABB(new Vec2(0,0), new Vec2(24, 34)));
        this.owner.colliderOffset.set(2, 1);
        this.owner.setGroup("enemy");
    }

    setHp(dmg: number): void {
        super.setHp(dmg);
        this.owner.animation.play("DAMAGED");
    }
}