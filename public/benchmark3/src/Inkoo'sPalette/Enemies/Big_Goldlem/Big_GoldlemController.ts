import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import OrthogonalTilemap from "../../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import EnemyController from "../EnemyController";
import InactiveIdle from "./Big_GoldlemStates/InactiveIdle";

export enum Big_GoldlemStates {
    INACTIVE_IDLE = "inactive_idle",
    ACTIVE_IDLE = "active_idle",
    WALKING = "walking",
    ATTACKING = "attacking",
    ALERTED = "alerted",

}

export default class Big_GoldlemController extends EnemyController {
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

    initializeAI(owner: AnimatedSprite, options: Record<string, any>) {
        super.initializeAI(owner, options);
        this.addState(Big_GoldlemStates.INACTIVE_IDLE, new InactiveIdle(this, this.owner));
        this.initialize(Big_GoldlemStates.INACTIVE_IDLE);
    }

    changeState(stateName: string): void {
        super.changeState(stateName);
	}

    update(deltaT: number): void {
		super.update(deltaT);
	}
}