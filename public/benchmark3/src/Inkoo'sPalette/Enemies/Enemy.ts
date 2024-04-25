
export default class Enemy {
    protected _health: number;
    protected _maxHealth = 10;
    constructor(hp:number) {
        this._health = hp;
    }
    getHp(){
        return this._health;
    }
    setHp(dmg:number){
        this._health += dmg;
    }
}