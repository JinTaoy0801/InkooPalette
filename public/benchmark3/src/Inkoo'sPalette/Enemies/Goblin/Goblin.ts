import AABB from "../../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import GoblinController from "./GoblinController";


export default class Goblin {
    protected _health: number;
    protected _maxHealth: 10;
    owner: AnimatedSprite;
    speed: number = 100;

    constructor(options: Record<string, any>) {
        this.owner = options.owner;

        //spawn goblin
        this.owner.addPhysics(new AABB(Vec2.ZERO, new Vec2(14, 14)));
        this.owner.addAI(GoblinController, options);
        this.owner.position.copy(options.spawn);
        this.owner.scale.set(2, 2);
        this.owner.setCollisionShape(new AABB(new Vec2(0,0), new Vec2(29, 27)));
        this.owner.colliderOffset.set(0, 1);
        this.owner.setGroup("goblin");
        this._health = this._maxHealth;
    }

}