import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import IP_Level, { playerSpawn } from "./IP_Level";

export default class IP_Level3 extends IP_Level { 
    loadScene(): void {
        this.load.tilemap("level3", "assets/tilemaps/kingmidas.json");
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

    startScene(): void {
        this.add.tilemap("level3", new Vec2(2, 2));
        this.layers.get("foreground").setDepth(10);
        super.startScene();
    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);
    }

    protected addUI() {
        super.addUI();
    }
}