import State from "../../../Wolfie2D/DataTypes/State/State";
import StateMachine from "../../../Wolfie2D/DataTypes/State/StateMachine";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import HitboxController from "../HitboxController";

export default abstract class HitboxStates extends State {
    owner: AnimatedSprite;
    parent: HitboxController;
    stateName: string;

    constructor(parent: StateMachine, owner: GameNode) {
        super(parent);
        this.owner = <AnimatedSprite>owner;
    }

    update(deltaT: number): void {
        
    }
}