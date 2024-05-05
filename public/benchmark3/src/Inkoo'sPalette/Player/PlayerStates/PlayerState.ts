import State from "../../../Wolfie2D/DataTypes/State/State";
import StateMachine from "../../../Wolfie2D/DataTypes/State/StateMachine";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import Input from "../../../Wolfie2D/Input/Input";
import Timer from "../../../Wolfie2D/Timing/Timer";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import { inkooEvents } from "../../inkooEvents";
import PlayerController from "../PlayerController";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";



//if this code does not work change owner to GameNode and 
export default abstract class  PlayerState extends State{
    owner: AnimatedSprite;
	attack: AnimatedSprite
    gravity: number=1000;
    parent: PlayerController;
    positionTimer: Timer;
	dashTimer = new Timer(250);
	dashCooldown = new Timer(1250);
//this parent to Statemachine
    constructor (parent: StateMachine, owner: GameNode){
        super(parent);
        this.owner = <AnimatedSprite>owner;
        this.positionTimer = new Timer(250);
		this.positionTimer.start();
    }
	
	handleInput(event: GameEvent): void {
		
	}

	getInputDirection(): Vec2 {
		let direction = Vec2.ZERO; 
        direction.x = (Input.isPressed("left")? -1 : 0) + (Input.isPressed("right")? 1: 0);
        direction.y = (Input.isJustPressed("jump") ? -1 : 0);
        return direction;
	}


	update(deltaT: number): void {
		this.parent.velocity.y += this.gravity*deltaT;
		if (Input.isPressed("dash") && this.dashCooldown.isStopped()) {
			this.dashTimer.start();
			this.dashCooldown.start();
			this.emitter.fireEvent(inkooEvents.PLAY_SOUND, { key: "dash", loop: false, holdReference: false });
		}
		if (!this.dashTimer.isStopped()) {
			this.owner.animation.playIfNotAlready("DASHING");
			let dir = this.getInputDirection();
			this.parent.velocity.x += dir.x*100;
			this.parent.velocity.y = 0;
		}
		
	}

	isAttacking () {
		const attacks = [
			"ATTACK_RIGHT",
			"JUMP_ATTACK",
			"IDLE_ATTACK_UP",
			"SPIN_ATTACK",
			"ATTACK_DOWN",
			"HIT",
			"DASHING"
		]
		return attacks.some(attack => this.owner.animation.isPlaying(attack));
	}
}