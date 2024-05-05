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
import Big_Goldlem from "../Enemies/Big_Goldlem/Big_Goldlem";
import IP_Level5 from "./IP_Level5";
import Goldlem from "../Enemies/Goldlem/Goldlem";

export default class IP_Level4 extends IP_Level {
    big_goldlemSpawns = [
        new Vec2(32*66, 772)
    ];
    boss:Big_Goldlem;
    loadScene(): void {
        // Load resources
        this.load.tilemap("level4", "assets/tilemaps/level4.json");
        this.load.spritesheet("player", "assets/player/inkoo.json");
        this.load.spritesheet("goblin", "assets/enemies/goblin/goblin_movement.json");
        this.load.spritesheet("goldlem", "assets/enemies/goldlem/goldlem.json");
        this.load.spritesheet("biggoldlem", "assets/enemies/big_goldlem/big_goldlem.json");
        this.load.spritesheet("deadsplit", "assets/enemies/big_goldlem/deadsplit.json");
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
        this.load.spritesheet("gold", "assets/enemies/goldlem/gold.json");
        this.load.spritesheet("big_goldlem", "assets/enemies/big_goldlem/big_goldlem.json");
        this.load.spritesheet("goldlem_wave","assets/enemies/big_goldlem/goldlem_wave.json");
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
        this.viewport.setBounds(0, 0, 80*32, 32*32);
        const biggoldlemOptions = {
            owner: this.add.animatedSprite('biggoldlem', Layers.Main),
            spawn: this.big_goldlemSpawns[0],
            tilemap: Layers.Main,
        }
        this.boss = new Big_Goldlem(biggoldlemOptions,10);
        this.trash_Mobs.set(biggoldlemOptions.owner.id, this.boss);
        
        console.log("enemy array", this.trash_Mobs);
    }

    updateScene(deltaT: number): void {
        while (this.receiver.hasNextEvent() && (this.isArea(this.receiver.peekNextEvent().type) ||
        this.checkEvent(this.receiver.peekNextEvent().type))) {
            let event = this.receiver.getNextEvent();
            console.log('event: ', event.type);
            switch (event.type) {
                case Areas.RewardRoom: {
                    // Go to the next level  
                    setPlayerSpawn(new Vec2(32*32-8, 2*32));
                    this.sceneManager.changeToScene(IP_Level5, {}, this.sceneOptions);
                    break;
                }
                case "BOSS_AWAKEN":{
                    this.initBGHealthBar("Big Goldem");
                    break;
                }
                case "BOSS_DEFEATED": {
                    console.log("godelm dead");
                    this.boss.owner.animation.play("DEAD", true);
                    //const lastbosspos = this.boss.owner.position;
                    // this.boss.owner.removePhysics();
                    // this.boss.owner.destroy();
                    // this.boss = undefined;
                    //this.spawnGoldlems(lastbosspos);
                    console.log("enemy array", this.trash_Mobs);
                    break;
                }
            }
        }

        super.updateScene(deltaT);
        // console.log('the rock: ', this.rock)
    }

    protected subscribeToEvents() {
        super.subscribeToEvents();
        this.receiver.subscribe([
            Areas.RewardRoom,
            "BOSS_DEFEATED",
            "BOSS_AWAKEN"
        ]);
    }
    checkEvent(s: String) {
        let checks = [
            "BOSS_DEFEATED",
            "BOSS_AWAKEN"
        ]
        return checks.some(check => check === s);
    }

    protected addUI() {
        super.addUI();
    }
    protected spawnGoldlems(lastbosspos: Vec2): void {
        var i;
        const goldlemspawns = [
            new Vec2(lastbosspos.x+30, lastbosspos.y+24),
            new Vec2(lastbosspos.x-36, lastbosspos.y+24)
        ]
        for (i=0; i<2; i++) {
            const goldlemOptions = {
                owner: this.add.animatedSprite('goldlem', Layers.Main),
                spawn: goldlemspawns[i],
                tilemap: Layers.Main,
            }
            let temp = new Goldlem(goldlemOptions,7);
            this.trash_Mobs.set(goldlemOptions.owner.id, temp);
        }
        
    }
}