import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import Receiver from "../../Wolfie2D/Events/Receiver";
import OrthogonalTilemap from "../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import Fall from "./PlayerStates/Fall";
import InAir from "./PlayerStates/InAir";
import Jump from "./PlayerStates/Jump";
import Idle from "./PlayerStates/Idle"; 
import Walk from "./PlayerStates/Walk";
import GameNode from "../../Wolfie2D/Nodes/GameNode";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import State from "../../Wolfie2D/DataTypes/State/State";
import OnGround from "./PlayerStates/onGround";
import { inkooEvents } from "../inkooEvents";


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
    
    initializeAI(owner: GameNode, options: Record<string, any>){
        this.owner = owner;

        // console.log('owner in playercontroller', owner);
        let idle = new Idle(this, this.owner);
        this.addState(PlayerStates.IDLE, idle);
        let walk = new Walk(this, this.owner);
        this.addState(PlayerStates.WALK, walk);
        let jump = new Jump(this, this.owner);
        this.addState(PlayerStates.JUMP, jump);
        let fall = new Fall(this, this.owner);
        this.addState(PlayerStates.FALL, fall);
        
        this.initialize(PlayerStates.IDLE);

        this.tilemap = this.owner.getScene().getTilemap(options.tilemap) as OrthogonalTilemap;

        this.receiver.subscribe("POGOTIME");

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
                    end: 2,
                    ease: EaseFunctionType.IN_OUT_QUAD
                },
                {
                    property: "scaleY",
                    start: 1.5,
                    end: 1,
                    ease: EaseFunctionType.IN_OUT_QUAD
                }

            ],
            reverseOnComplete: true
        });

        owner.tweens.add("death", {
            startDelay: 0,
            duration: 1000,
            effects: [
                {
                    property: "alpha",
                    start: 1,
                    end: 0,
                    ease: EaseFunctionType.IN_OUT_QUAD
                },
                {
                    property: "positionY",
                    start: this.owner.position.y,
                    end: this.owner.position.y + 300,
                    ease: EaseFunctionType.IN_OUT_QUAD
                }
            ],
            onEnd: inkooEvents.PLAYER_KILLED
        });
        this.owner.setGroup("player");

    }
    
    changeState(stateName: string): void {
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