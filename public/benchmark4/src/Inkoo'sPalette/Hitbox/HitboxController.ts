import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import GameNode from "../../Wolfie2D/Nodes/GameNode";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Active from "./HitboxStates/Active";
import { Layers } from "../scenes/IP_Level";


export default class HitboxController extends StateMachineAI {
    settings: Record<string, any>;
    attack: AnimatedSprite;

    // owner is the actor
    initializeAI(owner: AnimatedSprite, options: Record<string, any>): void {
        this.attack = owner;
        this.settings = options;
        this.addState("Active", new Active(this, this.attack));
        this.initialize("Active");
    }

    update(deltaT: number): void {
        super.update(deltaT);
    }
}