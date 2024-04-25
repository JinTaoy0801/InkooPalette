import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import OrthogonalTilemap from "../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";

export default class EnemyController extends StateMachineAI {
    owner: AnimatedSprite;
    options: Record<string, any>;
    protected _health: number;
    protected _maxHealth: number;
	direction: Vec2 = Vec2.ZERO;
    speed: number = 100;
    velocity: Vec2 = Vec2.ZERO;
    tilemap: OrthogonalTilemap;

    initializeAI(owner: AnimatedSprite, options: Record<string, any>) { 
        this.owner = owner;
        this.options = options;
        this.tilemap = this.owner.getScene().getTilemap(options.tilemap) as OrthogonalTilemap;
    }

    changeState(stateName: string): void {
        // console.log('goblin statenameadlkjaslkdj',stateName);
        super.changeState(stateName);
	}

    update(deltaT: number): void {
		super.update(deltaT);
	}
}