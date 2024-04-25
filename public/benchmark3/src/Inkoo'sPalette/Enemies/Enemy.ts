import Emitter from "../../Wolfie2D/Events/Emitter";
import { inkooEvents } from "../inkooEvents";
export default class Enemy {
    protected _health: number;
    protected _maxHealth = 10;
    protected emitter = new Emitter;
    constructor(hp:number) {
        this._health = hp;
    }
    getHp(){
        return this._health;
    }
    setHp(dmg:number){
        this._health += dmg;
        if(this._health <= 0){
            this.emitter.fireEvent(inkooEvents.TRASH_MOB_KILLED);
        }
    }
}