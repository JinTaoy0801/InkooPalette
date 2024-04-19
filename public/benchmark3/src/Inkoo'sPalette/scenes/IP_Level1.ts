import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Goblin from "../Enemies/Goblin/Goblin";
import GoblinController from "../Enemies/Goblin/GoblinController";
import IP_Level from "./IP_Level";
import { Layers } from "./IP_Level";

export default class IP_Level1 extends IP_Level {
    goblinSpawns = [
        new Vec2(200, 800),
        new Vec2(400, 800)
    ];
    loadScene(): void {
        // Load resources
        this.load.tilemap("level1", "assets/tilemaps/level1.json");
        this.load.spritesheet("player", "assets/player/inkoo.json");
        this.load.spritesheet("goblin", "assets/enemies/goblin/goblin_movement.json");
        this.load.image("healthBar", "assets/player/heart.png");
        this.load.spritesheet("arm_right", "assets/player/attack/arm_right.json");
    }

    unloadScene(){
      
    }

    startScene(): void {
        this.playerSpawn = new Vec2(50, 811);
        this.add.tilemap("level1", new Vec2(2, 2));
        super.startScene();

        this.initGoblin();
    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);
    }

    protected initViewport(): void {
        super.initViewport();
        this.viewport.follow(this.player);
        this.viewport.setBounds(0, 0, 64*30, 64*66);
    }

    protected initGoblin(): void {
        var i;
        for (i=0; i<this.goblinSpawns.length; i++) {
            const goblinOptions = {
                owner: this.add.animatedSprite('goblin', Layers.Main),
                spawn: this.goblinSpawns[i],
                tilemap: Layers.Main
            }
            this.goblins.push(new Goblin(goblinOptions));
        }
        
    }

    protected addUI() {
        super.addUI();
    }
}