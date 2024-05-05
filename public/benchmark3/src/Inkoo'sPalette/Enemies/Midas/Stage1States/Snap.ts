import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Timer from "../../../../Wolfie2D/Timing/Timer";
import Hitbox from "../../../Hitbox/Hitbox";
import { inkooEvents } from "../../../inkooEvents";
import { Layers } from "../../../scenes/IP_Level";
import { MidasStates } from "../MidasController";
import Stage1State from "./Stage1State";

export default class Snap extends Stage1State {
    attack: AnimatedSprite;

    typeofattack: string;

    beamLocation = [
        new Vec2(30*32, 9*32),
        new Vec2(35*32, 9*32),
        new Vec2(40*32, 9*32),
        new Vec2(45*32, 9*32),
        new Vec2(50*32, 9*32),
    ];

    onEnter(options: Record<string, any>): void {
        this.owner.animation.play("SNAP", false);

        if (this.parent.coinFlip()) {
            this.typeofattack = "beam";
        }
        else {
            
            this.typeofattack = "rock";
        }

        if (this.typeofattack == "beam") {
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
                let hitbox = new Hitbox(HB_options, "enemy");
            });
        }
        else {
            this.attack = this.owner.getScene().add.animatedSprite("rock", Layers.Main);
            this.attack.scale.set(2, 2);
            const HB_options1 = {
                actor: this.owner,
                sprite: this.attack,
                attack_name: "ROCK_ATTACK",
                eventType: "MIDAS",
                center: new Vec2(0, 0),
                halfSize: new Vec2(36, 36),
                invertX: this.owner.invertX,
                offset : new Vec2(-15, 0),
                shape: "AABB",
                colliderOffset: new Vec2(0, 5),
                delay: new Timer(0),
                customLocation: new Vec2(30*32, 18*32-16),
                customProperties: "right",
                wait: 2000
            }
            let hitbox1 = new Hitbox(HB_options1, "enemy");

            this.attack = this.owner.getScene().add.animatedSprite("rock", Layers.Main);
            this.attack.scale.set(2, 2);
            const HB_options2 = {
                actor: this.owner,
                sprite: this.attack,
                attack_name: "ROCK_ATTACK",
                eventType: "enemy",
                center: new Vec2(0, 0),
                halfSize: new Vec2(36, 36),
                invertX: this.owner.invertX,
                offset : new Vec2(-15, 0),
                shape: "AABB",
                colliderOffset: new Vec2(0, 5),
                delay: new Timer(0),
                customLocation: new Vec2(50*32, 18*32-16),
                customProperties: "left",
                wait: 2000
            }
            let hitbox2 = new Hitbox(HB_options2, "enemy");
        }
    }

    update(deltaT: number): void {
        if (!this.owner.animation.isPlaying("SNAP")) {
            if (this.typeofattack == "beam") {
                // this.emitter.fireEvent(inkooEvents.PLAY_SOUND, { key: "laser_charge", loop: false, holdReference: false });
                this.emitter.fireEvent("SPAWNBEAM");
            }
             else {
                // this.emitter.fireEvent(inkooEvents.PLAY_SOUND, { key: "rock_forming", loop: false, holdReference: false });
                this.emitter.fireEvent("GROUNDSHAKE");
             }
            this.finished(MidasStates.STAGE1_IDLE);
        }
        super.update(deltaT);
    }

    onExit(): Record<string, any> {
        this.owner.animation.stop();
		return {};
    }
}