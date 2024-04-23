import IP_Level from "./IP_Level";
import { Layers } from "./IP_Level";
import Goblin from "../Enemies/Goblin/Goblin";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";

export default class IP_Level2 extends IP_Level {  
    loadScene(): void {
        this.load.tilemap("level2", "assets/tilemaps/level2.json");
    }
    unloadScene(): void {
        
    }

    startScene(): void {
        this.add.tilemap("level2", new Vec2(2, 2));
        this.playerSpawn = new Vec2(32, 15*32);
        super.startScene();
    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);
    }
}
