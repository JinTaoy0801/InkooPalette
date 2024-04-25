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
