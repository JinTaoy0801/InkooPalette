import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Idle from "./ShieldStates/Idle";

export default class ShieldController extends StateMachineAI {
    settings: Record<string, any>;
    sheild: AnimatedSprite;

    initializeAI(owner: AnimatedSprite, options: Record<string, any>): void {
        this.sheild = owner;
        this.settings = options;
        this.addState("Idle", new Idle(this, this.sheild));
        this.initialize("Idle");
    }

    update(deltaT: number): void {
        super.update(deltaT);
    }
}