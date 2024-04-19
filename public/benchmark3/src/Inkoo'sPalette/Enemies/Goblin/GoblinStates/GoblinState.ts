import State from "../../../../Wolfie2D/DataTypes/State/State";
import StateMachine from "../../../../Wolfie2D/DataTypes/State/StateMachine";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import GameNode from "../../../../Wolfie2D/Nodes/GameNode";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Sprite from "../../../../Wolfie2D/Nodes/Sprites/Sprite";
import { inkooEvents } from "../../../inkooEvents";
import GoblinController, { GoblinStates } from "../GoblinController";

export default abstract class GoblinState extends State {
    owner: AnimatedSprite;
    parent: GoblinController;
	playerPosition: Vec2 = Vec2.ZERO;

    constructor(parent: StateMachine, owner: AnimatedSprite) {
		super(parent);
		this.owner = owner;
	}

    handleInput(event: GameEvent): void {
   
    }
    

    update(deltaT: number): void {
        let direction = this.parent.directionPatrol;
        (<Sprite>this.owner).invertX = (direction == "right") ? true : false;
        // console.log('goblin position', this.owner.position);
    }
    
}