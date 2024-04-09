import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import Receiver from "../../Wolfie2D/Events/Receiver";
import OrthogonalTilemap from "../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import InkooAnimatedSprite from "../Nodes/InkooAnimatedSprite";
import Fall from "./PlayerStates/Fall";
import inAir from "./PlayerStates/inAir";
import Jump from "./PlayerStates/Jump";
import Idle from "./PlayerStates/Idle"; 
import Walk from "./PlayerStates/Walk";
import GameNode from "../../Wolfie2D/Nodes/GameNode";



export const PlayerStates = {
    IDLE: "idle",
    WALK: "walk",
    JUMP: "jump",
    FALL:"fall",
    DEAD:"dead",
    RUN:"run",
    PREVIOUS:"previous"
} as const

export default class PlayerController extends StateMachineAI {
    protected owner: GameNode;
    protected _health: number;
    protected _maxHealth: number;
    velocity: Vec2 = Vec2.ZERO;
	speed: number = 200;
	MIN_SPEED: number = 200;
    MAX_SPEED: number = 300;
    tilemap: OrthogonalTilemap;
    reciever:Receiver;


    initializeAI(owner: InkooAnimatedSprite, options: Record<string, any>){
        this.owner = owner;

        this._health = 100;
        this._maxHealth = 100;

        let idle = new Idle(this, this.owner);
        this.addState(PlayerStates.IDLE, idle);
        let walk = new Walk(this, this.owner);
        this.addState(PlayerStates.WALK, walk);
        // let run = new Run(this, this.owner);
        // this.addState(PlayerStates.RUN, run);
        let jump = new Jump(this, this.owner);
        this.addState(PlayerStates.JUMP, jump);
        let fall = new Fall(this, this.owner);
        this.addState(PlayerStates.FALL, fall);
        
        this.initialize(PlayerStates.IDLE);

        this.tilemap = this.owner.getScene().getTilemap(options.tilemap) as OrthogonalTilemap;

    }
    changeState(stateName: string): void {
        console.log('stateNamestateNamestateNamestateName',stateName);
        if((stateName === PlayerStates.JUMP || stateName === PlayerStates.FALL) && !(this.stack.peek() instanceof inAir)){
            this.stack.push(this.stateMap.get(stateName));
        }
        super.changeState(stateName);
    }

    update(deltaT: number): void {
        super.update(deltaT);  
        if(this.currentState instanceof Jump){
			Debug.log("playerstate", "Player State: Jump");
		} else if (this.currentState instanceof Walk){
			Debug.log("playerstate", "Player State: Walk");
		} else if (this.currentState instanceof Idle){
			Debug.log("playerstate", "Player State: Idle");
		} else if(this.currentState instanceof Fall){
            Debug.log("playerstate", "Player State: Fall");
        }
    }

}