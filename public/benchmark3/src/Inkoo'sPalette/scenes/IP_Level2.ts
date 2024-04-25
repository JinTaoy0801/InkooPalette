import IP_Level from "./IP_Level";
import { Layers } from "./IP_Level";
import Goldlem from "../Enemies/Goldlem/Goldlem";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";

export default class IP_Level2 extends IP_Level {  
    goldlemSpawns = [
        new Vec2(80, 15*32)
    ];

    loadScene(): void {
        this.load.tilemap("level2", "assets/tilemaps/level2.json");
        this.load.spritesheet("goldlem", "assets/enemies/goldlem/goldlem.json");
        this.load.spritesheet("player", "assets/player/inkoo.json");
        this.load.spritesheet("goblin", "assets/enemies/goblin/goblin_movement.json");
        this.load.image("fullheart", "assets/player/heart.png");
        this.load.image("halfheart", "assets/player/halfheart.png");
        this.load.image("background", "assets/images/mainmenu_bg.png");
        this.load.spritesheet("ARM_RIGHT", "assets/player/attack/arm_right.json");
        this.load.spritesheet("ATTACK_UP", "assets/player/attack/attack_up.json");
        this.load.spritesheet("SPIN_ATTACK", "assets/player/attack/spin_attack.json");
        this.load.spritesheet("GOBLIN_LIGHT_ATTACK", "assets/enemies/goblin/goblin_light_attack.json")
    }
    unloadScene(): void {
        
    }

    startScene(): void {
        this.add.tilemap("level2", new Vec2(2, 2));
        this.layers.get("foreground").setDepth(10);
        this.playerSpawn = new Vec2(32, 15*32);
        super.startScene();
        this.initGoblin();
    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);
    }

    protected initGoblin(): void {
        var i;
        for (i=0; i<1; i++) {
            const goldlemOptions = {
                owner: this.add.animatedSprite('goldlem', Layers.Main),
                spawn: this.goldlemSpawns[i],
                tilemap: Layers.Main,
            }
            this.goldlems.push(new Goldlem(goldlemOptions));
        }
        
    }

    protected addUI() {
        super.addUI();
    }
}
