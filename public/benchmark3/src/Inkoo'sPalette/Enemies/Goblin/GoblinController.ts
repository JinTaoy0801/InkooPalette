import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import { inkooEvents } from "../../inkooEvents";
import Idle from "./GoblinStates/Idle";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import OrthogonalTilemap from "../../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import Walking from "./GoblinStates/Walking";
import Attacking from "./GoblinStates/Attacking";
import Alerted from "./GoblinStates/Alerted";
import Debug from "../../../Wolfie2D/Debug/Debug";
import EnemyController from "../EnemyController";

export enum GoblinStates {
    IDLE = "idle",
    WALKING = "walking",
    ATTACKING = "attacking",
    ALERTED = "alerted"
}

export default class GoblinController extends EnemyController {
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

        this.addState(GoblinStates.IDLE, new Idle(this, this.owner));
        this.addState(GoblinStates.WALKING, new Walking(this, this.owner));
        this.addState(GoblinStates.ATTACKING, new Attacking(this, this.owner));
        this.addState(GoblinStates.ALERTED, new Alerted(this, this.owner));
        
		this.initialize(GoblinStates.IDLE);
        this.owner.setGroup("enemy");
	}

    changeState(stateName: string): void {
        super.changeState(stateName);
	}

    coinFlip(): any {
        const currentTime = Date.now();
        const coolDown = currentTime - this.lastFlipped >= 2000;

        if (coolDown){
            this.lastFlipped = currentTime;
            return Math.random() < 0.5;
        }
        return false;
    }

	update(deltaT: number): void {
		super.update(deltaT);
	}
}