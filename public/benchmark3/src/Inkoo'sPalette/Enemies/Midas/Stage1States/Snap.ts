import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Timer from "../../../../Wolfie2D/Timing/Timer";
import Hitbox from "../../../Hitbox/Hitbox";
import { Layers } from "../../../scenes/IP_Level";
import { MidasStates } from "../MidasController";
import Stage1State from "./Stage1State";

export default class Snap extends Stage1State {
    attack: AnimatedSprite;

    beamLocation = [
        new Vec2(30*32, 9*32),
        new Vec2(35*32, 9*32),
        new Vec2(40*32, 9*32),
        new Vec2(45*32, 9*32),
        new Vec2(50*32, 9*32),
    ];

    onEnter(options: Record<string, any>): void {
        this.owner.animation.play("SNAP", false);

        this.beamLocation.forEach(pos => {
            this.attack = this.owner.getScene().add.animatedSprite("gold", Layers.Main);
            this.attack.scale.set(24, 16*10);
            
            const HB_options = {
                actor: this.owner,
                sprite: this.attack,
                attack_name: "ATTACK",
                eventType: "enemy",
                center: new Vec2(0, 0),
                halfSize: new Vec2(24*2, 16*10*2),
                invertX: this.owner.invertX,
                offset : new Vec2(0, 0),
                shape: "AABB",
                colliderOffset: new Vec2(0, 0),
                delay: new Timer(0),
                customLocation: pos,
                customProperties: "shorten",
                wait: 2000
            }
            let hitbox = new Hitbox(HB_options,"enemy");
        });
    }
    update(deltaT: number): void {
        if (!this.owner.animation.isPlaying("SNAP")) {
            //console.log('dude snapping')
            this.emitter.fireEvent("SPAWNBEAM");
            this.finished(MidasStates.STAGE1_IDLE);
        }
        super.update(deltaT);
    }
    onExit(): Record<string, any> {
        this.owner.animation.stop();
		return {};
    }
}