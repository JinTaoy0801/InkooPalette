import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import OrthogonalTilemap from "../../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import { inkooEvents } from "../../inkooEvents";
import EnemyController from "../EnemyController";
import Idle from "./Stage1States/Idle";

export enum MidasStates {
    STAGE1_IDLE = "stage1_idle",
}

export default class MidasController extends EnemyController {
    owner: AnimatedSprite;
    options: Record<string, any>;
    protected _health: number;
    protected _maxHealth: number;
	direction: Vec2 = Vec2.ZERO;
    speed: number = 100;
    velocity: Vec2 = Vec2.ZERO;
    tilemap: OrthogonalTilemap;
    patrolArea = {
        leftBound: 0,
        rightBound: 0
    };
    directionPatrol = "left";

    lastFlipped = 0;

    initializeAI(owner: AnimatedSprite, options: Record<string, any>){
		super.initializeAI(owner, options);
        this.patrolArea.leftBound = (options.spawn.x)-128;
        if (this.patrolArea.leftBound < 0)
            this.patrolArea.leftBound = 0;
        this.patrolArea.rightBound = 128+(options.spawn.x);

		this.receiver.subscribe(inkooEvents.PLAYER_MOVE);

        this.addState(MidasStates.STAGE1_IDLE, new Idle(this, this.owner));
        // this.addState(GoblinStates.WALKING, new Walking(this, this.owner));
        // this.addState(GoblinStates.ATTACKING, new Attacking(this, this.owner));
        // this.addState(GoblinStates.ALERTED, new Alerted(this, this.owner));
        
		this.initialize(MidasStates.STAGE1_IDLE);
	}

    changeState(stateName: string): void {
        // console.log('goblin statenameadlkjaslkdj',stateName);
        super.changeState(stateName);
	}

    update(deltaT: number): void {
		super.update(deltaT);
	}
}