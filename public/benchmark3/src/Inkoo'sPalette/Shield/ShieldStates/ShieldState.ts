import State from "../../../Wolfie2D/DataTypes/State/State";
import StateMachine from "../../../Wolfie2D/DataTypes/State/StateMachine";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import ShieldController from "../ShieldController";

export default abstract class SheildState extends State {
    shield: AnimatedSprite;
    parent: ShieldController;
    stateName: string;

    constructor(parent: StateMachine, owner: AnimatedSprite) {
        super(parent);
        this.shield = owner;
    }

    update(deltaT: number): void {
        
    }
}