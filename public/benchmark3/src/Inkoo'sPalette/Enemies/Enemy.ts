import Emitter from "../../Wolfie2D/Events/Emitter";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { inkooEvents } from "../inkooEvents";
export default abstract class Enemy {
    protected _health: number;
    protected _maxHealth = 10;
    protected emitter = new Emitter;
    owner: AnimatedSprite;
    name = " ";

    constructor(hp:number) {
        this._health = hp;
    }
    getHp(){
        return this._health;
    }
    
    setHp(dmg:number){
        this._health += dmg;
    }

    getName() {
        return this.name;
    }
}