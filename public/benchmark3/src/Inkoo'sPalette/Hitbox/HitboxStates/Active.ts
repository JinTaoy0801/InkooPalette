import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import HitboxState from "./HitboxState";
import IP_Level from "../../scenes/IP_Level";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Timer from "../../../Wolfie2D/Timing/Timer";
import AABB from "../../../Wolfie2D/DataTypes/Shapes/AABB";


export default class Active extends HitboxState {
    owner: AnimatedSprite;
    setting: Record<string, any>;
    delay: Timer;

    wait = new Timer(0);
    width: number
    onEnter(options: Record<string, any>) {
        this.owner = this.attack;
        this.setting = this.parent.settings;
        
        this.owner.animation.play(this.setting.attack_name, false);
        if (this.setting.colliderOffset!) {
            this.owner.colliderOffset.set(this.setting.colliderOffset.x, this.setting.colliderOffset.y);
        }

        this.delay = this.setting.delay;
        this.delay.start();

        if (this.setting.wait!) {
            this.wait = new Timer(this.setting.wait);
            this.wait.start();
        }

        setTimeout(() => {
            this.owner.animation.play(this.setting.attack_name, false);
        }, this.setting.wait)

        if (this.setting.customProperties!) {
            if (this.setting.customProperties === "shorten") {
                this.width = this.owner.collisionShape.hw;
            }
        }
    }

    update(deltaT: number): void {
        super.update(deltaT);
        if (this.wait.isStopped()) {
            if (this.setting.shape !== "circle") {
                if (!this.delay.isStopped()) {
                    this.owner.setCollisionShape(new AABB(new Vec2(0, 0), new Vec2(0,0)));
                }
                else this.owner.setCollisionShape(new AABB(this.setting.center, this.setting.halfSize));
            }

            if (this.setting.customLocation!) {
                this.owner.position = this.setting.customLocation;
            }
            else {
                const player = this.setting.actor;
            
                let boxX = player.position.x + this.setting.offset.x;
                let boxY = player.position.y + this.setting.offset.y;
                if (this.setting.invertX) {
                    boxX = player.position.x - this.setting.offset.x;
                }
                this.owner.invertX = this.setting.invertX

                this.owner.position = new Vec2(boxX, boxY);
            }

            if (this.setting.attack_name == "ATTACK_UP") {
                this.owner.colliderOffset.set(0, 16);
            }

            if (this.setting.customProperties!) {
                if (this.setting.customProperties === "shorten") {
                    const currShape = this.owner.collisionShape;
                    this.width-=0.5;
                    if (this.width < 0) this.width = 0;
                    let newhw = new Vec2(this.width, currShape.hh)
                    this.owner.setCollisionShape(new AABB(Vec2.ZERO, newhw));
                    this.owner.scale.x = this.width/2;
                }
            }

            if (!this.owner.animation.isPlaying(this.setting.attack_name)) {
                this.owner.destroy();
            }  
        }
    }

    handleInput(event: GameEvent): void {
        
    }

    onExit(): Record<string, any> {
        return {};
    }
}