import State from "../../../../Wolfie2D/DataTypes/State/State";
import StateMachine from "../../../../Wolfie2D/DataTypes/State/StateMachine";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import GameNode from "../../../../Wolfie2D/Nodes/GameNode";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
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
        if (event.type == inkooEvents.PLAYER_MOVE) 
            this.playerPosition = event.data.get("position");
    }

    update(deltaT: number): void {
        console.log('buhhh');
    }
}