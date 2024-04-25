import IP_Level from "./IP_Level";
import { Layers } from "./IP_Level";
import Goldlem from "../Enemies/Goldlem/Goldlem";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Big_Goldlem from "../Enemies/Big_Goldlem/Big_Goldlem";

export default class IP_Level2 extends IP_Level {  
    goldlemSpawns = [
        new Vec2(32*16, 476)
    ];

    big_goldlemSpawns = [
        new Vec2(32*45, 452)
    ];

    loadScene(): void {
        this.load.tilemap("level2", "assets/tilemaps/level2.json");
        this.load.spritesheet("goldlem", "assets/enemies/goldlem/goldlem.json");
        this.load.spritesheet("biggoldlem", "assets/enemies/big_goldlem/big_goldlem.json");
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
        this.initGoldlem();
        this.initBigGoldlem();
    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);
    }

    protected initGoldlem(): void {
        var i;
        for (i=0; i<1; i++) {
            const goldlemOptions = {
                owner: this.add.animatedSprite('goldlem', Layers.Main),
                spawn: this.goldlemSpawns[i],
                tilemap: Layers.Main,
            }
            this.trash_enemies.push(new Goldlem(goldlemOptions));
        }
        
    }

    protected initBigGoldlem(): void {
        var i;
        for (i=0; i<1; i++) {
            const biggoldlemOptions = {
                owner: this.add.animatedSprite('biggoldlem', Layers.Main),
                spawn: this.big_goldlemSpawns[i],
                tilemap: Layers.Main,
            }
            this.trash_enemies.push(new Big_Goldlem(biggoldlemOptions));
        }
        
    }

    protected addUI() {
        super.addUI();
    }
}
