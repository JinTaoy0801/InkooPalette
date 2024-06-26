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
import Circle from "../../Wolfie2D/DataTypes/Shapes/Circle";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import Rect from "../../Wolfie2D/Nodes/Graphics/Rect";
import Color from "../../Wolfie2D/Utils/Color";
import Goldlem from "../Enemies/Goldlem/Goldlem";
import { getDash, setDash } from "../Global/dash";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";

export default class IP_Level3 extends IP_Level {
    goblinSpawns = [
        new Vec2(32*54.5, 24*32),
        new Vec2(32*35, 8*32)
    ];
    goldemSpawns = [
        new Vec2(32*43.5,4*32-4)
    ];
    protected dashBuff: Sprite;
    protected text: Label;
    mushroom:Rect;
    loadScene(): void {
        // Load resources
        this.load.tilemap("level3", "assets/tilemaps/level3.json");
        this.load.spritesheet("player", "assets/player/inkoo.json");
        this.load.spritesheet("goblin", "assets/enemies/goblin/goblin_movement.json");
        this.load.spritesheet("goldlem", "assets/enemies/goldlem/goldlem.json");
        this.load.spritesheet("gold", "assets/enemies/goldlem/gold.json");
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
        this.load.audio("dead", "assets/sounds/dead.wav");
        this.load.audio("dash", "assets/sounds/dash.wav");
        this.load.audio("enemy_dead", "assets/sounds/enemy_dead.wav");
        this.load.audio("pickup", "assets/sounds/pickup.wav");
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
        this.load.audio("dead", "assets/sounds/dead.wav");
        this.load.audio("hit_enemy", "assets/sounds/hit_enemy.wav");
        this.load.audio("jump", "assets/sounds/jump.wav");
        this.load.audio("took_damage", "assets/sounds/took_damage.wav");
    }

    startScene(): void {
        this.add.tilemap("level3", new Vec2(2, 2));
        this.layers.get("foreground").setDepth(10);
        super.startScene();
        this.initGoblin();
        this.initGoldlem();
        this.mushroom = <Rect>this.add.graphic(GraphicType.RECT, Layers.Main, {
            position: new Vec2(32*56.5, 18*32),
            size: new Vec2( 32*3, 2*32),
        });
        if (!getDash()) {
            this.dashBuff = this.add.sprite('dash', Layers.Bg);
            this.dashBuff.scale.set(0.25, 0.25);
            this.dashBuff.position.copy(new Vec2(29.5*32, 5.5*32));
            this.dashBuff.addPhysics(undefined, undefined, false, true);
            this.dashBuff.setTrigger("player", "PICK_UP", null);
        }
        else {
            this.addLevelEnd(new Vec2(22*32, 9*32), new Vec2(2*32, 2*32), Areas.Mountains);
        }
 
        this.mushroom.addPhysics(undefined, undefined, false, true);
        this.mushroom.color = Color.TRANSPARENT;
        this.mushroom.setTrigger("player", inkooEvents.MUSHROOM_HIT, null);
        this.nextLevel = IP_Level2;
        console.log("enemy array", this.trash_Mobs);
    }

    updateScene(deltaT: number): void {
        Input.enableInput();

        while (this.receiver.hasNextEvent() && (this.isArea(this.receiver.peekNextEvent().type) ||
        this.checkEvent(this.receiver.peekNextEvent().type))){
            let event = this.receiver.getNextEvent();
            switch (event.type) {
                case Areas.Mountains: {
                    setPlayerSpawn(new Vec2(32*5, 493.5));
                    this.sceneManager.changeToScene(IP_Level2, {}, sceneOptions);
                    break;
                }
                case "PICK_UP": {
                    this.dashBuff.destroy();
                    setDash(true);
                    this.initBuffIcon();
                    this.addLevelEnd(new Vec2(22*32, 9*32), new Vec2(2*32, 2*32), Areas.Mountains);
                    this.emitter.fireEvent(inkooEvents.PLAY_SOUND, { key: "pickup", loop: false, holdReference: false });
                    this.text = <Label>this.add.uiElement(UIElementType.LABEL, Layers.Main, {position: new Vec2(30*32, 5.5*32), text: "Press Shift to dash"});
                    this.text.font = "daydream"
                    this.text.setTextColor(Color.WHITE)
                    this.text.fontSize = 12;
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
    protected initGoldlem(): void {
        var i;
        for (i=0; i<1; i++) {
            const goldlemOptions = {
                owner: this.add.animatedSprite('goldlem', Layers.Main),
                spawn: this.goldemSpawns[i],
                tilemap: Layers.Main,
            }
            let temp = new Goldlem(goldlemOptions,7);
            this.trash_Mobs.set(goldlemOptions.owner.id, temp);
        }
        
    }

    protected subscribeToEvents() {
        super.subscribeToEvents();
        this.receiver.subscribe([
            Areas.Mountains,
            Areas.Mountains_Tutorial,
            "PICK_UP"
        ]);
    }

    protected addUI() {
        super.addUI();
    }

}