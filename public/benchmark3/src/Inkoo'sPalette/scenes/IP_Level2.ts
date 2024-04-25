import IP_Level from "./IP_Level";
import { Layers } from "./IP_Level";
import Goblin from "../Enemies/Goblin/Goblin";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";

export default class IP_Level2 extends IP_Level {  
    loadScene(): void {
        this.load.tilemap("level2", "assets/tilemaps/level2.json");
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
        this.playerSpawn = new Vec2(32, 15*32);
        super.startScene();
    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);
    }
}
