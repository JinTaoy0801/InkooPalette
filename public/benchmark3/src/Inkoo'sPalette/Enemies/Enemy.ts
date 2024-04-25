
export default class Enemy {
    protected _health: number;
    protected _maxHealth = 10;
    constructor(options: Record<string, any>) {
        this._health = this._maxHealth;
    }
}