import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import Receiver from "../../Wolfie2D/Events/Receiver";
import OrthogonalTilemap from "../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import { inkooEvents } from "../inkooEvents";
import InkooAnimatedSprite from "../Nodes/InkooAnimatedSprite";
import Fall from "./PlayerStates/Fall";
import inAir from "./PlayerStates/inAir";
import Jump from "./PlayerStates/Jump";
import Idle from "./PlayerStates/Idle"; 
import Walking from "./PlayerStates/Walking";
import GameNode from "../../Wolfie2D/Nodes/GameNode";


export const PlayerAnimations = {
    IDLE: "IDLE",
    WALK: "WALK",
    JUMP: "JUMP",
    FALL:"FALL",
    
} as const

export const PlayerStates = {
    IDLE: "IDLE",
    WALK: "WALK",
    JUMP: "JUMP",
    FALL:"FALL",
    DEAD:"DEAD",
    PREVIOUS:"PREVIOUS"
} as const

export default class PlayerController extends StateMachineAI {
    protected owner: InkooAnimatedSprite;
    protected _health: number;
    protected _maxHealth: number;
    velocity: Vec2;
	speed: number;
	MIN_SPEED: number = 200;
    MAX_SPEED: number = 300;
    tilemap: OrthogonalTilemap;
    reciever:Receiver;


    initializeAI(owner: InkooAnimatedSprite, options: Record<string, any>){
        this.owner = owner;
        this.velocity = Vec2.ZERO;
        this.speed = 200;
        this._health = 100;
        this._maxHealth = 100;

        this.tilemap = this.owner.getScene().getTilemap(options.tilemap) as OrthogonalTilemap;
        
        this.addState(PlayerStates.IDLE, new Idle(this, this.owner));
        this.addState(PlayerStates.JUMP, new Jump(this, this.owner));
        this.addState(PlayerStates.FALL, new Fall(this, this.owner));
        this.addState(PlayerStates.WALK, new Walking(this, this.owner));


        this.initialize(PlayerStates.IDLE);

    }
    changeState(stateName: string): void {
        console.log('stateNamestateNamestateNamestateName',stateName);

        super.changeState(stateName);
    }

    update(deltaT: number): void {
        super.update(deltaT);
        if(this.currentState instanceof Jump){
			Debug.log("playerstate", "Player State: Jump");
		} else if (this.currentState instanceof Walking){
			Debug.log("playerstate", "Player State: Walk");
		} else if (this.currentState instanceof Idle){
			Debug.log("playerstate", "Player State: Idle");
		} else if(this.currentState instanceof Fall){
            Debug.log("playerstate", "Player State: Fall");
        }
    }

}