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
export default class IP_Level1 extends IP_Level {
    goblinSpawns = [
        new Vec2(200, 800),
        new Vec2(400, 800)
    ];
    
    loadScene(): void {
        // Load resources
        this.load.tilemap("level1", "assets/tilemaps/level1.json");
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
    }

    startScene(): void {
        this.add.tilemap("level1", new Vec2(2, 2));
        this.layers.get("foreground").setDepth(10);
        super.startScene();
        this.addLevelEnd(new Vec2(63*32, 18*32), new Vec2(2*32, 10*32), Areas.Mountains);
        this.initGoblin();
        // console.log("trashmobs", this.trash_Mobs);
        this.nextLevel = IP_Level2;
        console.log("enemy array", this.trash_Mobs);
    }

    updateScene(deltaT: number): void {
        Input.enableInput();
        while (this.receiver.hasNextEvent()) {
            let event = this.receiver.getNextEvent();
            var sceneOptions = {
                physics: {
                    groupNames: ["ground", "player","enemy"],
                    collisions:
                    [
                        [0, 1, 1],
                        [1, 0, 1],
                        [1, 1, 0]
                    ]
                }
            }
            switch (event.type) {
                case Areas.Mountains: {
                    // Go to the next level    
                    setPlayerSpawn(new Vec2(32*5, 493.5));
                    this.sceneManager.changeToScene(IP_Level2, {}, sceneOptions);
                    break;
                }
                default: {
                    super.updateScene(deltaT);
                }
            }
        }
        
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
            temp.owner.tweens.add("DEATH", {
                startDelay: 0,
                duration: 500,
                effects: [
                    {
                        property: "rotation",
                        start: 0,
                        end: Math.PI,
                        ease: EaseFunctionType.IN_OUT_QUAD,
                    },
                    {
                        property: TweenableProperties.alpha,
                        start: 1,
                        end: 0,
                        ease: EaseFunctionType.IN_OUT_QUAD,
                    },
                ],
                onEnd: [inkooEvents.TRASH_MOB_KILLED],
            });
            temp.owner.tweens.add("take_DMG", {
                startDelay: 0,
                duration: 500,
                effects: [
                    {
                        property: "alpha",
                        start: 0,
                        end: 1,
                        ease: EaseFunctionType.LINEAR,
                        resetOnComplete: true
                    }
                ]
            });
            temp.owner.setGroup("enemy");
            this.goblins.push(temp);
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