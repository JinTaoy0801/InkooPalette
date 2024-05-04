import AABB from "../../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { inkooEvents } from "../../inkooEvents";
import Enemy from "../Enemy";
import GoblinController from "./GoblinController";
import { EaseFunctionType } from "../../../Wolfie2D/Utils/EaseFunctions";
import { TweenableProperties } from "../../../Wolfie2D/Nodes/GameNode";

export default class Goblin extends Enemy{
    owner: AnimatedSprite;
    speed: number = 100;

    constructor(options: Record<string, any>,hp:number) {
        super(hp);
        this.owner = options.owner;

        //spawn goblin
        this.owner.addPhysics(new AABB(Vec2.ZERO, new Vec2(14, 14)));
        this.owner.addAI(GoblinController, options);
        this.owner.position.copy(options.spawn);
        this.owner.scale.set(2, 2);
        this.owner.setCollisionShape(new AABB(new Vec2(0,0), new Vec2(29, 27)));
        this.owner.colliderOffset.set(0, 1);
        this.owner.tweens.add("DEATH", {
            startDelay: 0,
            duration: 200,
            effects: [
                {
                    property: TweenableProperties.alpha,
                    start: 0,
                    end: 1,
                    ease: EaseFunctionType.LINEAR,
                }
            ],
            onEnd: inkooEvents.TRASH_MOB_KILLED
        });
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
        super.setHp(dmg);
        if(this._health <= 0)
            this.owner.tweens.play("DEATH");
        else
            this.owner.tweens.play("take_DMG");

    }
    
}
