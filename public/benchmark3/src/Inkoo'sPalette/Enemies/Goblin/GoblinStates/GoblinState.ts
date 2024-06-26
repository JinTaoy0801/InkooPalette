import State from "../../../../Wolfie2D/DataTypes/State/State";
import StateMachine from "../../../../Wolfie2D/DataTypes/State/StateMachine";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import GameNode from "../../../../Wolfie2D/Nodes/GameNode";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Sprite from "../../../../Wolfie2D/Nodes/Sprites/Sprite";
import { inkooEvents } from "../../../inkooEvents";
import IP_Level from "../../../scenes/IP_Level";
import GoblinController, { GoblinStates } from "../GoblinController";
import Timer from "../../../../Wolfie2D/Timing/Timer";

export default abstract class GoblinState extends State {
    owner: AnimatedSprite;
    parent: GoblinController;
	playerPosition: Vec2 = Vec2.ZERO;
    attackTimer:Timer;
    lightAttackRange = 64;

    constructor(parent: StateMachine, owner: AnimatedSprite) {
		super(parent);
		this.owner = owner;
        this.attackTimer = new Timer(2000);
	}
    patrolArea = new Vec2(this.parent.patrolArea.leftBound,this.parent.patrolArea.rightBound);
    handleInput(event: GameEvent): void {
   
    }
    //this only checks the X axis if you want it to be in the same height, add in the Y check
    playerInPatrol(patrolArea:Vec2){
        this.playerPosition = (<IP_Level>this.owner.getScene()).player.position;
        const leftBound = patrolArea.x;
        const rightBound = patrolArea.y;
        if(this.playerPosition.x >= leftBound && this.playerPosition.x <= rightBound)
            {
                return true;
            } else{
                return false;
            }
    }
    inRanged(x:number){
        this.playerPosition = (<IP_Level>this.owner.getScene()).player.position;
        let blocks = x * 32;
        return Math.abs(this.owner.position.x - this.playerPosition.x) <= blocks;
    }
    

    update(deltaT: number): void {
        let direction = this.parent.directionPatrol;
        (<Sprite>this.owner).invertX = (direction == "right") ? true : false;
        this.playerPosition = (<IP_Level>this.owner.getScene()).player.position;
    }
    
    
}