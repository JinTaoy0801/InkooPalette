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
        super.startScene();
        this.addLevelEnd(new Vec2(63*32, 10*32), new Vec2(2*32, 10*32), Areas.Midas);
        this.addLevelEnd(new Vec2(32*1, 400), new Vec2(2*32, 10*32), Areas.Mountains_Tutorial);
        this.initGoldlem();
        this.initBigGoldlem();
        this.nextLevel = IP_Level2;
        console.log("enemy array", this.trash_Mobs);
        // console.log('level2 player spawn', getPlayerSpawn());
    }

    updateScene(deltaT: number): void {
        Input.enableInput();
        while (this.receiver.hasNextEvent() && this.isArea(this.receiver.peekNextEvent().type)) {
            let event = this.receiver.getNextEvent();
            console.log('event in level 2', event);
            switch (event.type) {
                case Areas.Mountains_Tutorial: {
                    // Go to the next level  
                    setPlayerSpawn(new Vec2(1930, 621.5));
                    this.sceneManager.changeToScene(IP_Level1, {}, sceneOptions);
                    break;
                }
                case Areas.Midas: {
                    setPlayerSpawn(new Vec2(5*32, 589.5));
                    this.sceneManager.changeToScene(IP_Level3, {}, sceneOptions);
                    break;
                }
            }
        }
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
            let temp = new Goldlem(goldlemOptions,7);
            this.trash_Mobs.set(goldlemOptions.owner.id, temp);

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
            let temp = new Big_Goldlem(biggoldlemOptions, 10);
            this.trash_Mobs.set(biggoldlemOptions.owner.id, temp);
        }
        
    }

    protected subscribeToEvents() {
        this.receiver.subscribe([
            Areas.Mountains_Tutorial,
            Areas.Midas
        ]);
    }

    protected addUI() {
        super.addUI();
    }
}
