import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Input from "../../Wolfie2D/Input/Input";
import GameNode, { TweenableProperties } from "../../Wolfie2D/Nodes/GameNode";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import Rect from "../../Wolfie2D/Nodes/Graphics/Rect";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Timer from "../../Wolfie2D/Timing/Timer";
import PlayerController from "../Player/PlayerController"
import { inkooEvents } from "../inkooEvents";
import Color from "../../Wolfie2D/Utils/Color";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import MainMenu from "./MainMenu";
import Goblin from "../Enemies/Goblin/Goblin";
import Goldlem from "../Enemies/Goldlem/Goldlem";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import PlayerState from "../Player/PlayerStates/PlayerState";
import { getLastPlayerPosition } from "../Global/lastPlayerPosition";
import Enemy from "../Enemies/Enemy";
import IP_Level1 from "./IP_Level1";
import { getPlayerSpawn, setPlayerSpawn } from "../Global/playerSpawn";
import { getSceneOptions } from "../Global/sceneOptions";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import Midas from "../Enemies/Midas/Midas";

export enum Layers {
    Player = "player",
    Main = "main",
    UI = "ui",
    Hidden = "hidden",
    Pause = "pause",
    Bg = "bg"
}

export enum Areas {
    Tutorial = "Tutorial",
    Mountains = "Mountains",
    Midas = "Midas",

    Mountains_Tutorial = "Mountains_Tutorial",
    Midas_Mountains = "Midas_Mountains"

}

const sceneOptions = getSceneOptions();


export default class IP_Level extends Scene {
    player: AnimatedSprite;
    protected goblins = new Array<Goblin>();
    protected trash_Mobs: Map<number,Enemy>;
    protected trash_enemies= new Array<Enemy>();
    protected goldlems = new Array<Goldlem>();

    private heart1: Sprite;
    private heart2: Sprite;
    private heart3: Sprite;
    protected respawnTimer: Timer;

    protected static livesCount: number = 6;
    // Stuff to end the level and go to the next level
    protected levelEndArea: Rect;
    protected nextLevel: new (...args: any) => IP_Level;
    protected levelEndTimer: Timer;
    protected levelEndLabel: Label;
    // Screen fade in/out for level start and end
    protected levelTransitionTimer: Timer;
    protected levelTransitionScreen: Rect;

    private pause_bg: Sprite;
    

    //invinciblity timers
    protected isInvincible:Timer;
    protected playerAttack:Timer;
    startScene(): void {
        this.initLayers();
        this.initPlayer();
        this.addPausedScreen();
        this.initViewport();
        this.subscribeToEvents();
        this.addUI();
        this.trash_Mobs = new Map<number, Enemy>();
        this.respawnTimer = new Timer(1000, () => {
            if(IP_Level.livesCount === 0){
                this.sceneManager.changeToScene(MainMenu);
            } else {
                this.respawnPlayer();
                this.player.enablePhysics();
                this.player.unfreeze();
            }
        });

        this.levelTransitionTimer = new Timer(500);
        this.levelEndTimer = new Timer(3000, () => {
            // After the level end timer ends, fade to black and then go to the next scene
            this.levelTransitionScreen.tweens.play("fadeIn");
        });
        this.levelTransitionScreen.tweens.play("fadeOut");

        this.isInvincible = new Timer(1000);
        this.playerAttack = new Timer(500);
        Input.disableInput();
        // console.log('outsitede', this.sceneOptions.physics);
    }


    updateScene(deltaT: number){
        if(this.player.position.y > 1200 ){
            this.player.position.copy(getLastPlayerPosition());
            this.incPlayerLife(-1);
        }
        while (this.receiver.hasNextEvent()) {
            let event = this.receiver.getNextEvent();
            // console.log('eventype', event.type);
            switch (event.type) {
                case inkooEvents.PAUSE_MENU: {
                    this.sceneManager.changeToScene(MainMenu);
                    break;
                }
                case inkooEvents.PLAYER_ENTERED_LEVEL_END:{
                    if(!this.levelEndTimer.hasRun() && this.levelEndTimer.isStopped()){
                        this.levelEndTimer.start();
                        this.levelEndLabel.tweens.play("slideIn");
                    }
                    Input.disableInput();
                    break;
                }
                case inkooEvents.LEVEL_START:{
                    Input.enableInput();
                    break;
                }
                case inkooEvents.PLAYER_ATTACK: {
                    if(this.sceneGraph.getNode(event.data.get("node")) === this.player) {
                        if(this.isInvincible.isStopped()){
                            this.incPlayerLife(-1);
                            console.log("playerHp", IP_Level.livesCount);
                            console.log("goblin", event.data.toString());
                        }  
                    }
                   
                    break;
                }
                case inkooEvents.COLLIDED: {
                    if(this.sceneGraph.getNode(event.data.get("other")) === this.player) {
                        if(this.isInvincible.isStopped()){
                            this.incPlayerLife(-1);
                            console.log("playerHp", IP_Level.livesCount);
                            console.log("goblin", event.data.toString());
                        }  
                    }
                   
                    break;
                }
                //in this case Node is the trashMob, other is the attackHitbox
                case inkooEvents.TRASH_MOB_HIT:{
                    if(this.playerAttack.isStopped()){
                        console.log("playerhit data", event.data.toString());
                        if (this.trash_Mobs.get(event.data.get("node"))!) {
                            const trash_mob = this.trash_Mobs.get(event.data.get("node"));
                            trash_mob.setHp(-1);
                            console.log("trashMob hp", trash_mob.getHp());
                            if (trash_mob.getName() == 'midas' && trash_mob.getHp() === 5) {
                                this.emitter.fireEvent("SPAWNSHIELD");
                            }
                        }
                        
                        this.emitter.fireEvent("POGOTIME");

                        this.playerAttack.start();
                    }
                    break;
                }
                //though it has the death key, the id of the trash mob is in node
                //key => DEATH node =>id of mob
                case inkooEvents.TRASH_MOB_KILLED:{
                    this.sceneGraph.getNode(event.data.get("node")).destroy();
                    
                    break;
                }
                case inkooEvents.PLAYER_KILLED: {
                    this.respawnPlayer();
                    break;
                }
                case inkooEvents.RESUME: {
                    let pauseLayer = this.getLayer(Layers.Pause);
                    this.initViewport();
                    this.getSceneGraph().getAllNodes().forEach(element => {
                        if(element instanceof AnimatedSprite){
                            element.aiActive = true;
                        }
                    });
                    pauseLayer.setHidden(true);
                    break;
                }
                default: {
                    throw new Error(`Unhandled event caught in scene with type ${event.type}`)
                }
            }
        }
        
        if (Input.isJustPressed("pause")) {
            let pauseLayer = this.getLayer(Layers.Pause);
            if (pauseLayer.isHidden()) {
                this.pauseViewport();
                this.getSceneGraph().getAllNodes().forEach(element => {
                    if(element instanceof AnimatedSprite){
                        element.aiActive = false;
                    }
                });
                pauseLayer.setHidden(false);
            }
            else {
                this.initViewport();
                this.getSceneGraph().getAllNodes().forEach(element => {
                    if(element instanceof AnimatedSprite){
                        element.aiActive = true;
                    }
                });
                pauseLayer.setHidden(true);
            }
        }

        if (Input.isJustPressed("level1")) {
            this.sceneManager.changeToScene(IP_Level1, {}, this.sceneOptions);
        }
        if (Input.isJustPressed("level2")) {
            this.emitter.fireEvent(Areas.Mountains);
        }
        if (Input.isJustPressed("level3")) {
            this.emitter.fireEvent(Areas.Midas);
        }
        if (Input.isJustPressed("invincible")) {
            this.incPlayerLife(1000);
        }
    }

    protected initLayers(): void {
        this.addUILayer(Layers.UI);
        this.addUILayer(Layers.Pause);
        this.getLayer(Layers.Pause).setHidden(true);
        this.addLayer(Layers.Player, 3);
        this.addLayer(Layers.Main, 2);
        this.addLayer(Layers.Bg, 1);
    }

    protected initViewport(): void {
        this.viewport.setZoomLevel(1.5);
        this.viewport.follow(this.player);
        this.viewport.setBounds(0, 0, 64*32, 64*16);
    }

    protected pauseViewport(): void {
        let center = this.viewport.getHalfSize();
        this.viewport.setFocus(center);
        this.viewport.setZoomLevel(1);
    }

    protected subscribeToEvents() {
        this.receiver.subscribe([
            inkooEvents.PLAYER_ATTACK,
            inkooEvents.LEVEL_START,
            inkooEvents.PLAYER_ENTERED_LEVEL_END,
            inkooEvents.PLAYER_KILLED,
            inkooEvents.TRASH_MOB_HIT,
            inkooEvents.TRASH_MOB_KILLED,
            inkooEvents.COLLIDED,
            inkooEvents.RESUME
        ]);
    }

    protected addUI() {
        if (IP_Level.livesCount === 6) {
            this.heart1 = this.add.sprite('fullheart', Layers.UI)
            this.heart1.scale.set(2, 2);
            this.heart1.position.copy(new Vec2(30, 30));

            this.heart2 = this.add.sprite('fullheart', Layers.UI)
            this.heart2.scale.set(2, 2);
            this.heart2.position.copy(new Vec2(60, 30));

            this.heart3 = this.add.sprite('fullheart', Layers.UI)
            this.heart3.scale.set(2, 2);
            this.heart3.position.copy(new Vec2(90, 30));
        }
        else if (IP_Level.livesCount === 5) {
            this.heart1 = this.add.sprite('fullheart', Layers.UI)
            this.heart1.scale.set(2, 2);
            this.heart1.position.copy(new Vec2(30, 30));

            this.heart2 = this.add.sprite('fullheart', Layers.UI)
            this.heart2.scale.set(2, 2);
            this.heart2.position.copy(new Vec2(60, 30));

            this.heart3 = this.add.sprite('halfheart', Layers.UI)
            this.heart3.scale.set(2, 2);
            this.heart3.position.copy(new Vec2(90, 30));
        }
        else if (IP_Level.livesCount === 4) {
            this.heart1 = this.add.sprite('fullheart', Layers.UI)
            this.heart1.scale.set(2, 2);
            this.heart1.position.copy(new Vec2(30, 30));

            this.heart2 = this.add.sprite('fullheart', Layers.UI)
            this.heart2.scale.set(2, 2);
            this.heart2.position.copy(new Vec2(60, 30));
        }
        else if (IP_Level.livesCount === 3) {
            this.heart1 = this.add.sprite('fullheart', Layers.UI)
            this.heart1.scale.set(2, 2);
            this.heart1.position.copy(new Vec2(30, 30));

            this.heart2 = this.add.sprite('halfheart', Layers.UI)
            this.heart2.scale.set(2, 2);
            this.heart2.position.copy(new Vec2(60, 30));
        }
        else if (IP_Level.livesCount === 2) {
            this.heart1 = this.add.sprite('fullheart', Layers.UI)
            this.heart1.scale.set(2, 2);
            this.heart1.position.copy(new Vec2(30, 30));
        }
        else if (IP_Level.livesCount === 1) {
            this.heart1 = this.add.sprite('halfheart', Layers.UI)
            this.heart1.scale.set(2, 2);
            this.heart1.position.copy(new Vec2(30, 30));
        }
        this.levelEndLabel = <Label>this.add.uiElement(UIElementType.LABEL, Layers.UI, {position: new Vec2(-500, 200), text: "Level Complete"});
        this.levelEndLabel.size.set(1200, 60);
        this.levelEndLabel.borderRadius = 0;
        this.levelEndLabel.backgroundColor = new Color(34, 32, 52);
        this.levelEndLabel.textColor = Color.WHITE;
        this.levelEndLabel.fontSize = 48;
        this.levelEndLabel.font = "daydream";
        this.levelEndLabel.tweens.add("slideIn", {
            startDelay: 0,
            duration: 1000,
            effects: [
                {
                    property: TweenableProperties.posX,
                    start: -300,
                    end: 400,
                    ease: EaseFunctionType.OUT_SINE
                }
            ]
        });
        this.levelTransitionScreen = <Rect>this.add.graphic(GraphicType.RECT, Layers.UI, {position: new Vec2(300, 200), size: new Vec2(64*32, 64*16)});
        this.levelTransitionScreen.color = new Color(34, 32, 52);
        this.levelTransitionScreen.alpha = 1;
        this.levelTransitionScreen.tweens.add("fadeIn", {
            startDelay: 0,
            duration: 1000,
            effects: [
                {
                    property: TweenableProperties.alpha,
                    start: 0,
                    end: 1,
                    ease: EaseFunctionType.IN_OUT_QUAD
                }
            ],
            onEnd: inkooEvents.LEVEL_END
        });

        this.levelTransitionScreen.tweens.add("fadeOut", {
            startDelay: 0,
            duration: 1000,
            effects: [
                {
                    property: TweenableProperties.alpha,
                    start: 1,
                    end: 0,
                    ease: EaseFunctionType.IN_OUT_QUAD
                }
            ],
            onEnd: inkooEvents.LEVEL_START
        });
    }

    protected addPausedScreen(): void {
        let center = this.viewport.getHalfSize();
        this.viewport.setFocus(center);
        this.viewport.setZoomLevel(1);
        this.pause_bg = this.add.sprite("background", Layers.Pause);
        this.pause_bg.scale.set(5, 5);
        this.pause_bg.position = new Vec2(center.x, center.y);

        const pauseHeader = <Label>this.add.uiElement(UIElementType.LABEL, Layers.Pause, {position: new Vec2(center.x, center.y - 300), text: "Pause"});
        pauseHeader.textColor = Color.WHITE;
        pauseHeader.font = "daydream";

        const resume = <Button>this.add.uiElement(UIElementType.BUTTON, Layers.Pause, {position: new Vec2(center.x, center.y - 50), text: "Resume"});
        resume.textColor = Color.WHITE;
        resume.size.set(170, 30)
        resume.backgroundColor = Color.TRANSPARENT
        resume.font = "daydream";
        resume.fontSize = 20;
        resume.onClickEventId = inkooEvents.RESUME;

        const menu = <Button>this.add.uiElement(UIElementType.BUTTON, Layers.Pause, {position: new Vec2(center.x, center.y + 50), text: "Main Menu"});
        menu.textColor = Color.WHITE;
        menu.backgroundColor = Color.TRANSPARENT;
        menu.size.set(225, 30)
        menu.font = "daydream";
        menu.fontSize = 20;
        menu.onClickEventId = inkooEvents.PLAYER_KILLED;
    }

    protected initPlayer(): void {
        this.player = this.add.animatedSprite("player", Layers.Player);

        this.player.scale.set(1.5, 1.5);
        if(!getPlayerSpawn()){
            console.log("spawn zero");
            setPlayerSpawn(new Vec2(5*32, 25*32));
        }
        this.player.position.copy(getPlayerSpawn());
        this.player.tweens.add("take_DMG", {
            startDelay: 0,
            duration: 500,
            effects: [
                {
                    property: TweenableProperties.alpha,
                    start: 0,
                    end: 1,
                    ease: EaseFunctionType.LINEAR,
                    resetOnComplete: true
                }
            ]
        });
        this.player.addPhysics(new AABB(Vec2.ZERO, new Vec2(12, 8)));
        this.player.addAI(PlayerController, {playerType: "platformer", tilemap: "ground"});
        this.player.setTrigger("enemy", inkooEvents.COLLIDED, null);
        this.player.colliderOffset.set(0, 10.5);
    }

    protected incPlayerLife(amt: number): void {
        IP_Level.livesCount += amt;
        this.isInvincible.start();
        this.player.animation.play("HIT", false);
        this.player.tweens.play("take_DMG");
        if (IP_Level.livesCount == 0){
            this.heart1.destroy();
            Input.disableInput();
            this.player.disablePhysics();
            this.emitter.fireEvent(inkooEvents.PLAYER_KILLED);
        }


        if (IP_Level.livesCount === 6) {
            this.heart1 = this.add.sprite('fullheart', Layers.UI)
            this.heart1.scale.set(2, 2);
            this.heart1.position.copy(new Vec2(30, 30));

            this.heart2 = this.add.sprite('fullheart', Layers.UI)
            this.heart2.scale.set(2, 2);
            this.heart2.position.copy(new Vec2(60, 30));

            this.heart3 = this.add.sprite('fullheart', Layers.UI)
            this.heart3.scale.set(2, 2);
            this.heart3.position.copy(new Vec2(90, 30));
        }
        else if (IP_Level.livesCount === 5) {
            this.heart3.destroy();
            this.heart3 = this.add.sprite('halfheart', Layers.UI)
            this.heart3.scale.set(2, 2);
            this.heart3.position.copy(new Vec2(90, 30));
        }
        else if (IP_Level.livesCount === 4) {
            this.heart2.destroy();
            this.heart3.destroy();
            this.heart2 = this.add.sprite('fullheart', Layers.UI)
            this.heart2.scale.set(2, 2);
            this.heart2.position.copy(new Vec2(60, 30));
        }
        else if (IP_Level.livesCount === 3) {
            this.heart2.destroy();
            this.heart2 = this.add.sprite('halfheart', Layers.UI)
            this.heart2.scale.set(2, 2);
            this.heart2.position.copy(new Vec2(60, 30));
        }
        else if (IP_Level.livesCount === 2) {
            this.heart1.destroy();
            this.heart2.destroy();
            this.heart1 = this.add.sprite('fullheart', Layers.UI)
            this.heart1.scale.set(2, 2);
            this.heart1.position.copy(new Vec2(30, 30));
        }
        else if (IP_Level.livesCount === 1) {
            this.heart1.destroy();
            this.heart1 = this.add.sprite('halfheart', Layers.UI)
            this.heart1.scale.set(2, 2);
            this.heart1.position.copy(new Vec2(30, 30));
        }

    }

    protected addLevelEnd(startingTile: Vec2, size: Vec2, where: string): void {
        this.levelEndArea = <Rect>this.add.graphic(GraphicType.RECT, Layers.Main, {
          position: startingTile,
          size: size,
        });
        this.levelEndArea.addPhysics(undefined, undefined, false, true);
        this.levelEndArea.setTrigger(
          "player",
          where,
          null,
        );
        this.levelEndArea.color = new Color(255, 255, 255, 1);
    }

    isArea(s: String): boolean {
        return Object.keys(Areas).some(key => Areas[key as keyof typeof Areas] === s);
    }

    protected respawnPlayer():void{
        IP_Level.livesCount = 6;
        this.sceneManager.changeToScene(MainMenu,{});
        Input.enableInput();
    }

}

