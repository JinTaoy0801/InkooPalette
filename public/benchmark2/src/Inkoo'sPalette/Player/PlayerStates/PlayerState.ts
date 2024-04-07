import State from "../../../Wolfie2D/DataTypes/State/State";
import StateMachine from "../../../Wolfie2D/DataTypes/State/StateMachine";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import MathUtils from "../../../Wolfie2D/Utils/MathUtils";
import Input from "../../../Wolfie2D/Input/Input";
import Timer from "../../../Wolfie2D/Timing/Timer";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import { inkooEvents } from "../../inkooEvents";
import PlayerController from "../PlayerController";

import InkooAnimatedSprite from "../../Nodes/InkooAnimatedSprite";

//if this code does not work change owner to GameNode and 
export default abstract class PlayerState extends State{
    owner:InkooAnimatedSprite;
    gravity: number=1000;
    parent:PlayerController;
    positionTimer:Timer;
//this parent to Statemachine
    constructor (parent: PlayerController, owner: InkooAnimatedSprite){
        super(parent);
        this.owner = owner;
        this.positionTimer = new Timer(250);
		this.positionTimer.start();

    }
	public handleInput(event: GameEvent): void {
	}

	getInputDirection(): Vec2 {
		let direction = Vec2.ZERO;
		direction.x = (Input.isPressed("left") ? -1 : 0) + (Input.isPressed("right") ? 1 : 0);
		direction.y = (Input.isJustPressed("jump") ? -1 : 0);
		return direction;
	}


	update(deltaT: number): void {
		// Do gravity
		if (this.positionTimer.isStopped()){
			this.emitter.fireEvent(inkooEvents.PLAYER_MOVE, {position: this.owner.position.clone()});
			this.positionTimer.start();
		}
		this.parent.velocity.y += this.gravity*deltaT;
	}
    public abstract onExit(): Record<string, any>;
}