import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import { inkooEvents } from "../../inkooEvents";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import OrthogonalTilemap from "../../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import Debug from "../../../Wolfie2D/Debug/Debug";
import Idle from "./GoldlemStates/Idle";
import EnemyController from "../EnemyController";
import Alerted from "./GoldlemStates/Alerted";
import Attack from "./GoldlemStates/Attack";

export enum GoldlemStates {
    IDLE = "idle",
    ATTACKING = "attacking",
    ALERTED = "alerted"
}

export default class GoldlemController extends EnemyController {
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
        this.patrolArea.leftBound = (options.spawn.x)-(32*10);
        if (this.patrolArea.leftBound < 0)
            this.patrolArea.leftBound = 0;
        this.patrolArea.rightBound = (32*10)+(options.spawn.x);

		this.receiver.subscribe(inkooEvents.PLAYER_MOVE);

        this.addState(GoldlemStates.IDLE, new Idle(this, this.owner));
        this.addState(GoldlemStates.ALERTED, new Alerted(this, this.owner));
        this.addState(GoldlemStates.ATTACKING, new Attack(this, this.owner));
        
		this.initialize(GoldlemStates.IDLE);
        this.owner.setGroup("enemy");
	}

    changeState(stateName: string): void {
        super.changeState(stateName);
	}

	update(deltaT: number): void {
		super.update(deltaT);
	}
}