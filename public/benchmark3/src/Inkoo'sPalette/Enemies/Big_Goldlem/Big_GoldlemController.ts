import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import OrthogonalTilemap from "../../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import EnemyController from "../EnemyController";
import Awaken from "./Big_GoldlemStates/Awaken";
import Sleeping from "./Big_GoldlemStates/Sleep";
import Idle from "./Big_GoldlemStates/Idle";
import Walking from "./Big_GoldlemStates/Walk";
import Alerted from "../Goldlem/GoldlemStates/Alerted";
import Slam from "./Big_GoldlemStates/Slam";
import Reform from "./Big_GoldlemStates/Reform";
export enum Big_GoldlemStates {
    SLEEP = "sleep",
    AWAKEN = "awaken",
    WALKING = "walking",
    SLAM = "slam",
    ALERTED = "alerted",
    IDLE = "idle",
    REFORM = "reform"

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
        this.patrolArea.leftBound = (options.spawn.x)-128;
        if (this.patrolArea.leftBound < 0)
            this.patrolArea.leftBound = 0;
        this.patrolArea.rightBound = 128+(options.spawn.x);

        this.addState(Big_GoldlemStates.SLEEP, new Sleeping(this, this.owner));
        this.addState(Big_GoldlemStates.WALKING, new Walking(this, this.owner));
        this.addState(Big_GoldlemStates.IDLE, new Idle(this, this.owner));
        this.addState(Big_GoldlemStates.AWAKEN, new Awaken(this, this.owner));
        this.addState(Big_GoldlemStates.REFORM, new Reform(this, this.owner));
        this.addState(Big_GoldlemStates.SLAM, new Slam(this, this.owner));
        this.initialize(Big_GoldlemStates.SLEEP);
        this.owner.setGroup("enemy");
    }

    changeState(stateName: string): void {
        super.changeState(stateName);
	}

    update(deltaT: number): void {
		super.update(deltaT);
	}
}