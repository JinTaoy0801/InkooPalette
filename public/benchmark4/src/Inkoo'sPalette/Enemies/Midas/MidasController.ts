import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import OrthogonalTilemap from "../../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import { inkooEvents } from "../../inkooEvents";
import EnemyController from "../EnemyController";
import Idle from "./Stage1States/Idle";
import Snap from "./Stage1States/Snap";

export enum MidasStates {
    STAGE1_IDLE = "stage1_idle",
    SNAP = "snap"
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
        this.patrolArea.leftBound = (options.spawn.x)-32*26;
        if (this.patrolArea.leftBound < 0)
            this.patrolArea.leftBound = 0;
        this.patrolArea.rightBound = 20+(options.spawn.x);

		this.receiver.subscribe(inkooEvents.PLAYER_MOVE);

        this.addState(MidasStates.STAGE1_IDLE, new Idle(this, this.owner));
        this.addState(MidasStates.SNAP, new Snap(this, this.owner));
		this.initialize(MidasStates.STAGE1_IDLE);
        this.owner.setGroup("enemy");
	}

    changeState(stateName: string): void {
        super.changeState(stateName);
	}

    update(deltaT: number): void {
		super.update(deltaT);
	}
}