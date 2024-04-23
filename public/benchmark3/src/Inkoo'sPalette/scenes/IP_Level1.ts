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
        this.load.image("fullheart", "assets/player/heart.png");
        this.load.image("halfheart", "assets/player/halfheart.png");
        this.load.spritesheet("ARM_RIGHT", "assets/player/attack/arm_right.json");
        this.load.spritesheet("ATTACK_UP", "assets/player/attack/attack_up.json");
        this.load.spritesheet("SPIN_ATTACK", "assets/player/attack/spin_attack.json");
        this.load.spritesheet("GOBLIN_LIGHT_ATTACK", "assets/enemies/goblin/goblin_light_attack.json")
    }

    unloadScene(){
      
    }

    startScene(): void {
        this.playerSpawn = new Vec2(2*32, 25*32);
        this.add.tilemap("level1", new Vec2(2, 2));
        this.layers.get("foreground").setDepth(10);
        super.startScene();
        this.addLevelEnd(new Vec2(15*32, 25*32), new Vec2(32, 128));
        this.initGoblin();
        // this.player.setGroup("player");
        // console.log("level1", this.player.group)
        
        //this.nextLevel = Level2;
    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);
    }

    protected initViewport(): void {
        super.initViewport();
        this.viewport.follow(this.player);
        this.viewport.setBounds(0, 0, 64*32, 64*16);
    }

    protected initGoblin(): void {
        var i;
        for (i=0; i<1; i++) {
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