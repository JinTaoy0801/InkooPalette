import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Goblin from "../Enemies/Goblin/Goblin";
import GoblinController from "../Enemies/Goblin/GoblinController";
import IP_Level, { Areas } from "./IP_Level";
import IP_Level2 from "./IP_Level2";
import { Layers } from "./IP_Level";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import { inkooEvents } from "../inkooEvents";
import { TweenableProperties } from "../../Wolfie2D/Nodes/GameNode";
import Input from "../../Wolfie2D/Input/Input";
import { getPlayerSpawn, setPlayerSpawn} from "../Global/playerSpawn";
import { sceneOptions } from "./MainMenu";
import Hitbox from "../Hitbox/Hitbox";

export default class IP_Level3 extends IP_Level {
    goblinSpawns = [
        new Vec2(200, 800),
        new Vec2(400, 800)
    ];
    
    loadScene(): void {
        // Load resources
        this.load.tilemap("level3", "assets/tilemaps/level3.json");
        this.load.spritesheet("player", "assets/player/inkoo.json");
        this.load.spritesheet("goblin", "assets/enemies/goblin/goblin_movement.json");
        this.load.image("6", "assets/images/6.png");
        this.load.image("5", "assets/images/5.png");
        this.load.image("4", "assets/images/4.png");
        this.load.image("3", "assets/images/3.png");
        this.load.image("2", "assets/images/2.png");
        this.load.image("1", "assets/images/1.png");
        this.load.image("background", "assets/images/mainmenu_bg.png");
        this.load.spritesheet("ARM_RIGHT", "assets/player/attack/arm_right.json");
        this.load.spritesheet("ATTACK_UP", "assets/player/attack/attack_up.json");
        this.load.spritesheet("SPIN_ATTACK", "assets/player/attack/spin_attack.json");
        this.load.spritesheet("GOBLIN_LIGHT_ATTACK", "assets/enemies/goblin/goblin_light_attack.json");
        this.load.audio("attack", "assets/sounds/attack.wav");
        this.load.audio("dead", "assets/sounds/dead.wav");
        this.load.audio("enemy_dead", "assets/sounds/enemy_dead.wav");
        this.load.audio("hit_enemy", "assets/sounds/hit_enemy.wav");
        this.load.audio("jump", "assets/sounds/jump.wav");
        this.load.audio("took_damage", "assets/sounds/took_damage.wav");
    }

    unloadScene(){
        this.load.spritesheet("player", "assets/player/inkoo.json");
        this.load.spritesheet("goblin", "assets/enemies/goblin/goblin_movement.json");
        this.load.image("fullheart", "assets/player/heart.png");
        this.load.image("halfheart", "assets/player/halfheart.png");
        this.load.image("background", "assets/images/mainmenu_bg.png");
        this.load.spritesheet("ARM_RIGHT", "assets/player/attack/arm_right.json");
        this.load.spritesheet("ATTACK_UP", "assets/player/attack/attack_up.json");
        this.load.spritesheet("SPIN_ATTACK", "assets/player/attack/spin_attack.json");
        this.load.spritesheet("GOBLIN_LIGHT_ATTACK", "assets/enemies/goblin/goblin_light_attack.json")
        this.load.audio("attack", "assets/sounds/attack.wav");
        this.load.audio("dead", "assets/sounds/dead.wav");
        this.load.audio("hit_enemy", "assets/sounds/hit_enemy.wav");
        this.load.audio("jump", "assets/sounds/jump.wav");
        this.load.audio("took_damage", "assets/sounds/took_damage.wav");
    }

    startScene(): void {
        this.add.tilemap("level3", new Vec2(2, 2));
        //this.layers.get("foreground").setDepth(10);
        super.startScene();
        this.addLevelEnd(new Vec2(63*32, 18*32), new Vec2(2*32, 10*32), Areas.Mountains);
        this.initGoblin();
        // const HB_options2 = {
        //     actor: this.owner,
        //     sprite: this.attack,
        //     attack_name: "WAVE_ATTACK",
        //     eventType: "enemy",
        //     center: new Vec2(0, 0),
        //     halfSize: 32,
        //     invertX: true,
        //     offset : new Vec2(0, 0),
        //     shape: "circle",
        //     customLocation: new Vec2(this.owner.position.x,this.owner.position.y+24),
        //     customProperties: "right_wave",
        //     colliderOffset: new Vec2(0, 0),
        //     delay: new Timer(0),
        //     wait: 200
        // }
        // let hitbox2 = new Hitbox(HB_options2, "enemy");
        // console.log("trashmobs", this.trash_Mobs);
        this.nextLevel = IP_Level2;
        console.log("enemy array", this.trash_Mobs);
    }

    updateScene(deltaT: number): void {
        Input.enableInput();

        while (this.receiver.hasNextEvent() && this.isArea(this.receiver.peekNextEvent().type)) {
            let event = this.receiver.getNextEvent();
            switch (event.type) {
                case Areas.Mountains: {
                    // Go to the next level    
                    setPlayerSpawn(new Vec2(32*5, 493.5));
                    this.sceneManager.changeToScene(IP_Level2, {}, sceneOptions);
                    break;
                }
                default: {
                }
            }
        }
        super.updateScene(deltaT);
        
    }

    protected initGoblin(): void {
        var i;
        for (i=0; i<2; i++) {
            const goblinOptions = {
                owner: this.add.animatedSprite('goblin', Layers.Main),
                spawn: this.goblinSpawns[i],
                tilemap: Layers.Main,
            }
            let temp = new Goblin(goblinOptions,5);
            this.trash_Mobs.set(goblinOptions.owner.id,temp);
        }
        
    }

    protected subscribeToEvents() {
        super.subscribeToEvents();
        this.receiver.subscribe([
            Areas.Mountains,
            Areas.Mountains_Tutorial
        ]);
    }

    protected addUI() {
        super.addUI();
    }
}