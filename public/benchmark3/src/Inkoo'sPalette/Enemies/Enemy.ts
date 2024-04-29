import Emitter from "../../Wolfie2D/Events/Emitter";
import { inkooEvents } from "../inkooEvents";
export default abstract class Enemy {
    protected _health: number;
    protected _maxHealth = 10;
    protected emitter = new Emitter;
    protected name = "";

    constructor(hp:number) {
        this._health = hp;
    }
    getHp(){
        return this._health;
    }
    setHp(dmg:number){
        console.log("AHHHHHHHHHHHHHHHHHHHHHHHHHHHH");
    }

    getName() {
        return this.name;
    }
}