import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import StateMachineAI from "../../../Wolfie2D/AI/StateMachineAI";
import { inkooEvents } from "../../inkooEvents";
import Idle from "./GoblinStates/Idle";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import OrthogonalTilemap from "../../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";

export enum GoblinStates {
    IDLE = "idle",
    WALKING = "walking",
    ATTACKING = "attacking"
}

export default class GoblinController extends StateMachineAI {
    protected owner: AnimatedSprite;
    protected _health: number;
    protected _maxHealth: number;
	direction: Vec2 = Vec2.ZERO;
    speed: number = 100;
    tilemap: OrthogonalTilemap;
    
    

    initializeAI(owner: AnimatedSprite, options: Record<string, any>){
		this.owner = owner;

        this.tilemap = this.owner.getScene().getTilemap(options.tilemap) as OrthogonalTilemap;

		this.receiver.subscribe(inkooEvents.PLAYER_MOVE);

        console.log('brokehereladlaslkdaljksdlajk')
        this.addState(GoblinStates.IDLE, new Idle(this, this.owner))

		this.initialize(GoblinStates.IDLE);
	}

    changeState(stateName: string): void {
        console.log('goblinstatename:',stateName);
        super.changeState(stateName);
	}

	update(deltaT: number): void {
		super.update(deltaT);
	}
}