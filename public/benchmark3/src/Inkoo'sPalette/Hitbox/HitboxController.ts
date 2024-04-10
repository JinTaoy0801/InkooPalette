import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import GameNode from "../../Wolfie2D/Nodes/GameNode";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Active from "./HitboxStates/Active";


export default class HitboxController extends StateMachineAI {
    actor: AnimatedSprite;
    owner: GameNode;
    velocity: Vec2 = Vec2.ZERO;
    invertX: boolean;
    offset: Vec2;
    eventType: string;

    initializeAI(owner: GameNode, options: Record<string, any>): void {
        this.owner = owner;
        this.invertX = options.invertX;
        this.offset = options.offset;
        this.eventType = options.eventType;
        this.actor = options.owner;

        this.initializeStates();
    }

    initializeStates() {
        this.addState("Active", new Active(this, this.owner));

        this.initialize("Active");
    }

    update(deltaT: number): void {
        super.update(deltaT);
    }
}