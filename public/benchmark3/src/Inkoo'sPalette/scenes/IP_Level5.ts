import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Goblin from "../Enemies/Goblin/Goblin";
import GoblinController from "../Enemies/Goblin/GoblinController";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import IP_Level, { Areas } from "./IP_Level";
import IP_Level2 from "./IP_Level2";
import { Layers } from "./IP_Level";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import { inkooEvents } from "../inkooEvents";
import { TweenableProperties } from "../../Wolfie2D/Nodes/GameNode";
import Input from "../../Wolfie2D/Input/Input";
import { getPlayerSpawn, setPlayerSpawn} from "../Global/playerSpawn";
import { sceneOptions } from "./MainMenu";
import { getDoubleJump, setDoubleJump } from "../Global/doubleJump";
import IP_Level1 from "./IP_Level1";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Color from "../../Wolfie2D/Utils/Color";

export default class IP_Level5 extends IP_Level {
    protected doubleJumpBuff: Sprite;
    protected text: Label;
    protected text2: Label;
    goblinSpawns = [
        new Vec2(200, 800),
        new Vec2(400, 800)
    ];
    
    loadScene(): void {
        // Load resources
        this.load.tilemap("level5", "assets/tilemaps/level5.json");
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
        this.load.spritesheet("GOBLIN_LIGHT_ATTACK", "assets/enemies/goblin/goblin_light_attack.json");
        this.load.audio("attack", "assets/sounds/attack.wav");
        this.load.audio("pickup", "assets/sounds/pickup.wav");
        this.load.audio("dead", "assets/sounds/dead.wav");
        this.load.audio("hit_enemy", "assets/sounds/hit_enemy.wav");
        this.load.audio("jump", "assets/sounds/jump.wav");
        this.load.audio("double_jump", "assets/sounds/jump2.wav");
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
        this.load.audio("dash", "assets/sounds/dash.wav");
        this.load.audio("dead", "assets/sounds/dead.wav");
        this.load.audio("enemy_dead", "assets/sounds/enemy_dead.wav");
        this.load.audio("hit_enemy", "assets/sounds/hit_enemy.wav");
        this.load.audio("jump", "assets/sounds/jump.wav");
        this.load.audio("took_damage", "assets/sounds/took_damage.wav");
    }

    startScene(): void {
        this.add.tilemap("level5", new Vec2(2, 2));
        this.layers.get("foreground").setDepth(10);
        super.startScene();
        this.viewport.setZoomLevel(1.5)
        this.viewport.setBounds(0, 0, 64*16, 64*32);
        if (!getDoubleJump()) {
            this.doubleJumpBuff = this.add.sprite('double_jump', Layers.Bg);
            this.doubleJumpBuff.scale.set(0.25, 0.25);
            this.doubleJumpBuff.position.copy(new Vec2(29*32, 3*32));
            this.doubleJumpBuff.addPhysics(undefined, undefined, false, true);
            this.doubleJumpBuff.setTrigger("player", "PICK_UP", null);
        }
        console.log("enemy array", this.trash_Mobs);
    }

    updateScene(deltaT: number): void {
        Input.enableInput();
        while (this.receiver.hasNextEvent() && (this.isArea(this.receiver.peekNextEvent().type) ||
        this.checkEvent(this.receiver.peekNextEvent().type))) {
            let event = this.receiver.getNextEvent();
            switch (event.type) {
                case "PICK_UP": {
                    this.emitter.fireEvent(inkooEvents.PLAY_SOUND, { key: "pickup", loop: false, holdReference: false });
                    this.doubleJumpBuff.destroy();
                    setDoubleJump(true);
                    this.initBuffIcon();
                    this.addLevelEnd(new Vec2(32, 32*53), new Vec2(2*32, 5*32), Areas.Mountains_Tutorial);
                    this.text = <Label>this.add.uiElement(UIElementType.LABEL, Layers.Main, {position: new Vec2(28*32, 2*32), text: "Double Jump Unlocked"});
                    this.text.font = "daydream"
                    this.text.setTextColor(Color.WHITE)
                    this.text.fontSize = 12;

                    this.text = <Label>this.add.uiElement(UIElementType.LABEL, Layers.Main, {position: new Vec2(28*32, 2.5*32), text: "Go Back To Tree"});
                    this.text.font = "daydream"
                    this.text.setTextColor(Color.WHITE)
                    this.text.fontSize = 12;
                    break;
                }
                case Areas.Mountains_Tutorial: {
                    // Go to the next level  
                    setPlayerSpawn(new Vec2(1930, 621.5));
                    this.sceneManager.changeToScene(IP_Level1, {}, sceneOptions);
                    break;
                }
            }
        }
        super.updateScene(deltaT);
        
    }

    checkEvent(s: String) {
        let checks = [
            "PICK_UP"
        ]
        return checks.some(check => check === s);
    }

    protected subscribeToEvents() {
        super.subscribeToEvents();
        this.receiver.subscribe([
            Areas.Mountains_Tutorial,
            "PICK_UP"
        ]);
    }

    protected addUI() {
        super.addUI();
    }
}