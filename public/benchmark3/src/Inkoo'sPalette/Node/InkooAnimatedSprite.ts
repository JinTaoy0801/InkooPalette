import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite"

export default class InkooAnimatedSprite extends AnimatedSprite {
    protected maxhp: number;
    protected hp: number;
 
    setMaxHp(hp: number) {
        this.hp = hp;
    }

    getHp() {
        return this.hp;
    }

    setHp(dmg: number) {
        return this.hp+=dmg;
    }
}