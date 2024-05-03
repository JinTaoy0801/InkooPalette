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
        this.sheild.setGroup("shield");

        this.receiver.subscribe("SHIELDHIT");
    }

    update(deltaT: number): void {
        super.update(deltaT);
        while (this.receiver.hasNextEvent()) {
            let event = this.receiver.getNextEvent();
            console.log('event: ', event.type);
            switch (event.type) {
                case "SHIELDHIT": {
                    console.log("event");
                    break;
                }
            }
        }
    }
}