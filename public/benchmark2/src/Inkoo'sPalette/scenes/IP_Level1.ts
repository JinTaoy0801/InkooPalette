import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import IP_Level from "./IP_Level";
// import GameLevel from "./GameLevel";
// import Level2 from "./Level2";

export default class IP_Level1 extends IP_Level {
    loadScene(): void {
        // Load resources
        this.load.tilemap("level1", "assets/tilemaps/level1.json");
        this.load.spritesheet("player", "assets/player/inkoo.json");
        this.load.image("healthBar", "assets/player/heart.png")
    }

    unloadScene(){
      
    }

    startScene(): void {
        // Add the level 1 tilemap
        this.add.tilemap("level1", new Vec2(2, 2));

        this.playerSpawn = new Vec2(50, 425);

        // Do generic setup for a GameLevel
        super.startScene();

    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);
    }

    protected initViewport(): void {
        super.initViewport();
        this.viewport.setBounds(0,0, 64*31,64*64);
    }

    protected addUI() {
        super.addUI();

    }
}