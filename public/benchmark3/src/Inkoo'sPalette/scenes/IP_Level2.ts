import IP_Level, { Areas  } from "./IP_Level";
import { Layers } from "./IP_Level";
import Goldlem from "../Enemies/Goldlem/Goldlem";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Big_Goldlem from "../Enemies/Big_Goldlem/Big_Goldlem";
import Input from "../../Wolfie2D/Input/Input";
import IP_Level1 from "./IP_Level1";
import IP_Level3 from "./IP_Level3";
import { getPlayerSpawn, setPlayerSpawn } from "../Global/playerSpawn";
import { sceneOptions } from "./MainMenu";
import IP_Level4 from "./IP_Level4";

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
        this.load.image("6", "assets/images/6.png");
        this.load.image("5", "assets/images/5.png");
        this.load.image("4", "assets/images/4.png");
        this.load.image("3", "assets/images/3.png");
        this.load.image("2", "assets/images/2.png");
        this.load.image("1", "assets/images/1.png");
        this.load.image("background", "assets/images/mainmenu_bg.png");
        this.load.image("dash", "assets/images/dash.png");
        this.load.image("double_jump", "assets/images/double_jump.png");
        this.load.spritesheet("ARM_RIGHT", "assets/player/attack/arm_right.json");
        this.load.spritesheet("ATTACK_UP", "assets/player/attack/attack_up.json");
        this.load.spritesheet("SPIN_ATTACK", "assets/player/attack/spin_attack.json");
        this.load.spritesheet("GOBLIN_LIGHT_ATTACK", "assets/enemies/goblin/goblin_light_attack.json")
        this.load.spritesheet("rock", "assets/enemies/midas/rock.json");
        this.load.spritesheet("gold", "assets/enemies/goldlem/gold.json");
        this.load.spritesheet("big_goldlem", "assets/enemies/big_goldlem/big_goldlem.json");
        this.load.spritesheet("goldlem_wave","assets/enemies/big_goldlem/goldlem_wave.json");
        this.load.audio("attack", "assets/sounds/attack.wav");
        this.load.audio("dash", "assets/sounds/dash.wav");
        this.load.audio("dead", "assets/sounds/dead.wav");
        this.load.audio("enemy_dead", "assets/sounds/enemy_dead.wav");
        this.load.audio("hit_enemy", "assets/sounds/hit_enemy.wav");
        this.load.audio("jump", "assets/sounds/jump.wav");
        this.load.audio("double_jump", "assets/sounds/jump2.wav");
        this.load.audio("took_damage", "assets/sounds/took_damage.wav");
    }
    unloadScene(): void {
        
    }

    startScene(): void {
        this.add.tilemap("level2", new Vec2(2, 2));
        this.layers.get("foreground").setDepth(10);
        super.startScene();
        this.addLevelEnd(new Vec2(32*1, 400), new Vec2(2*32, 10*32), Areas.Mountains_Tutorial);
        this.addLevelEnd(new Vec2(32*20, 36*32), new Vec2(20*32, 10*32), Areas.Fallen);
        this.addLevelEnd(new Vec2(32*60, 400), new Vec2(2*32, 10*32), Areas.Ruins);
        //this.initGoldlem();

        this.nextLevel = IP_Level3;
        console.log("enemy array", this.trash_Mobs);
    }

    updateScene(deltaT: number): void {
        Input.enableInput();
        while (this.receiver.hasNextEvent() && this.isArea(this.receiver.peekNextEvent().type)) {
            let event = this.receiver.getNextEvent();
            switch (event.type) {
                case Areas.Mountains_Tutorial: {
                    // Go to the next level  
                    setPlayerSpawn(new Vec2(1930, 621.5));
                    this.sceneManager.changeToScene(IP_Level1, {}, sceneOptions);
                    break;
                }
                case Areas.Fallen: {
                    // Go to the next level  
                    setPlayerSpawn(new Vec2(15*32, 4*32));
                    this.sceneManager.changeToScene(IP_Level3, {}, sceneOptions);
                    break;
                }
                case Areas.Ruins: {
                    // Go to the next level  
                    setPlayerSpawn(new Vec2(4*32, 2*32));
                    this.sceneManager.changeToScene(IP_Level4, {}, sceneOptions);
                    break;
                }
            }
        }

        super.updateScene(deltaT);
       
    }

    protected subscribeToEvents() {
        super.subscribeToEvents();
        this.receiver.subscribe([
            Areas.Mountains_Tutorial,
            Areas.Fallen,
            Areas.Ruins,
        ]);
    }

    protected addUI() {
        super.addUI();
    }
}
