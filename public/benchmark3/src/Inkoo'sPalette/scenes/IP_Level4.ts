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

export default class IP_Level4 extends IP_Level {
    
    loadScene(): void {
        // Load resources
        this.load.tilemap("level4", "assets/tilemaps/level4.json");
        this.load.spritesheet("player", "assets/player/inkoo.json");
        this.load.spritesheet("goblin", "assets/enemies/goblin/goblin_movement.json");
        this.load.image("fullheart", "assets/player/heart.png");
        this.load.image("halfheart", "assets/player/halfheart.png");
        this.load.image("background", "assets/images/mainmenu_bg.png");
        this.load.spritesheet("ARM_RIGHT", "assets/player/attack/arm_right.json");
        this.load.spritesheet("ATTACK_UP", "assets/player/attack/attack_up.json");
        this.load.spritesheet("SPIN_ATTACK", "assets/player/attack/spin_attack.json");
        this.load.spritesheet("GOBLIN_LIGHT_ATTACK", "assets/enemies/goblin/goblin_light_attack.json");
        this.load.audio("attack", "assets/sounds/attack.wav");
        this.load.audio("dash", "assets/sounds/dash.wav");
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
        this.load.audio("dash", "assets/sounds/dash.wav");
        this.load.audio("dead", "assets/sounds/dead.wav");
        this.load.audio("enemy_dead", "assets/sounds/enemy_dead.wav");
        this.load.audio("hit_enemy", "assets/sounds/hit_enemy.wav");
        this.load.audio("jump", "assets/sounds/jump.wav");
        this.load.audio("took_damage", "assets/sounds/took_damage.wav");
    }

    startScene(): void {
        this.add.tilemap("level4", new Vec2(2, 2));
        this.layers.get("foreground").setDepth(10);
        super.startScene();
        this.viewport.setBounds(0, 0, 64*16, 64*32);
        // console.log("trashmobs", this.trash_Mobs);
        //this.nextLevel = IP_Level2;
        console.log("enemy array", this.trash_Mobs);
    }

    updateScene(deltaT: number): void {
        Input.enableInput();
        super.updateScene(deltaT);
        
    }

    protected subscribeToEvents() {
        super.subscribeToEvents();
    }

    protected addUI() {
        super.addUI();
    }
}