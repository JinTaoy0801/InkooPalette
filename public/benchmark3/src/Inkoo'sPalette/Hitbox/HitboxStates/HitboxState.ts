import State from "../../../Wolfie2D/DataTypes/State/State";
import StateMachine from "../../../Wolfie2D/DataTypes/State/StateMachine";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import HitboxController from "../HitboxController";

export default abstract class HitboxState extends State {
    attack: AnimatedSprite;
    parent: HitboxController;
    stateName: string;

    constructor(parent: StateMachine, owner: AnimatedSprite,group:string) {
        super(parent);
        this.attack = owner;
        this.attack.setGroup(group);
    }

    update(deltaT: number): void {
        
    }
}