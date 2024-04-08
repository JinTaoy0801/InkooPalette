import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import IP_Level from "./IP_Level";
// import GameLevel from "./GameLevel";
// import Level2 from "./Level2";

export default class IP_Level1 extends IP_Level {
    
    // HOMEWORK 5 - TODO
    /**
     * Add your balloon pop sound here and use it throughout the code
     */
    loadScene(): void {
        // Load resources
        this.load.tilemap("level1", "assets/tilemaps/level1.json");
        this.load.spritesheet("player", "assets/player/inkoo.json");
    }

    unloadScene(){
      
    }

    startScene(): void {
        // Add the level 1 tilemap
        this.add.tilemap("level1", new Vec2(2, 2));
        this.viewport.setBounds(0, 0, 64*32, 20*32);

        this.playerSpawn = new Vec2(0, 0);

        // Do generic setup for a GameLevel
        super.startScene();

    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);
    }
}