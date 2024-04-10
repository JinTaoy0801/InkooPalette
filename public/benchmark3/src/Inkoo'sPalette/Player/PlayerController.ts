import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import Receiver from "../../Wolfie2D/Events/Receiver";
import OrthogonalTilemap from "../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import InkooAnimatedSprite from "../Nodes/InkooAnimatedSprite";
import Fall from "./PlayerStates/Fall";
import inAir from "./PlayerStates/InAir";
import Jump from "./PlayerStates/Jump";
import Idle from "./PlayerStates/Idle"; 
import Walk from "./PlayerStates/Walk";
import Attack from "./PlayerStates/Attack";
import GameNode from "../../Wolfie2D/Nodes/GameNode";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import State from "../../Wolfie2D/DataTypes/State/State";


export enum PlayerType {
    PLATFORMER = "platformer",
    TOPDOWN = "topdown"
}

export enum PlayerStates {
    IDLE = "idle",
    WALK = "walk",
	RUN = "run",
	JUMP = "jump",
    FALL = "fall",
	PREVIOUS = "previous",
    ATTACK = "attack"
}

export default class PlayerController extends StateMachineAI {
    protected owner: GameNode;
    velocity: Vec2 = Vec2.ZERO;
	speed: number = 200;
	MIN_SPEED: number = 200;
    MAX_SPEED: number = 300;
    tilemap: OrthogonalTilemap;


    initializeAI(owner: InkooAnimatedSprite, options: Record<string, any>){
        this.owner = owner;

        let idle = new Idle(this, this.owner);
        this.addState(PlayerStates.IDLE, idle);
        let walk = new Walk(this, this.owner);
        this.addState(PlayerStates.WALK, walk);
        let jump = new Jump(this, this.owner);
        this.addState(PlayerStates.JUMP, jump);
        let fall = new Fall(this, this.owner);
        this.addState(PlayerStates.FALL, fall);

        let attack = new Attack(this, this.owner)
        this.addState(PlayerStates.ATTACK, attack);

        
        this.initialize(PlayerStates.IDLE);

        this.tilemap = this.owner.getScene().getTilemap(options.tilemap) as OrthogonalTilemap;

        owner.tweens.add("tilt_right", {
            startDelay: 0,
            duration: 200,
            effects: [
                {
                    property: "rotation",
                    start: 0,
                    end: -0.33,
                    ease: EaseFunctionType.IN_OUT_QUAD
                }
            ],
            reverseOnComplete: true
        });

        owner.tweens.add("flatten", {
            startDelay: 0,
            duration: 100,
            effects: [
                {
                    property: "scaleX",
                    start: 1.5,
                    end: 1.8,
                    ease: EaseFunctionType.IN_OUT_QUAD
                },
                {
                    property: "scaleY",
                    start: 1.5,
                    end: 1.2,
                    ease: EaseFunctionType.IN_OUT_QUAD
                }

            ],
            reverseOnComplete: true
        });

    }
    
    changeState(stateName: string): void {
        console.log('stateNamestateNamestateNamestateName',stateName);
        if((stateName === PlayerStates.JUMP || stateName === PlayerStates.FALL) && !(this.stack.peek() instanceof inAir) || stateName === PlayerStates.ATTACK){
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
        } else if(this.currentState instanceof Attack){
            Debug.log("playerstate", "Player State: Attack");
        }
    }

}