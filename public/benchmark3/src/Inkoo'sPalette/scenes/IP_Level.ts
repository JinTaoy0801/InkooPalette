import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Input from "../../Wolfie2D/Input/Input";
import GameNode, { TweenableProperties } from "../../Wolfie2D/Nodes/GameNode";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import Rect from "../../Wolfie2D/Nodes/Graphics/Rect";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import OrthogonalTilemap from "../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import RenderingManager from "../../Wolfie2D/Rendering/RenderingManager";
import Scene from "../../Wolfie2D/Scene/Scene";
import SceneManager from "../../Wolfie2D/Scene/SceneManager";
import Viewport from "../../Wolfie2D/SceneGraph/Viewport";
import Timer from "../../Wolfie2D/Timing/Timer";
import PlayerController from "../Player/PlayerController"
import { inkooEvents } from "../inkooEvents";
import Color from "../../Wolfie2D/Utils/Color";
import Graphic from "../../Wolfie2D/Nodes/Graphic";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import MainMenu from "./MainMenu";
import InkooAnimatedSprite from "../Nodes/InkooAnimatedSprite";
import Goblin from "../Enemies/Goblin/Goblin";

export enum Layers {
    Main = "main",
    UI = "ui",
    Hidden = "hidden",
    Pause = "pause"
  }

export default class IP_Level extends Scene {
    protected playerSpawn: Vec2;
    player: AnimatedSprite;
    protected goblins = new Array<Goblin>();

    private heart1: Sprite;
    private heart2: Sprite;
    private heart3: Sprite;
    protected isPaused: Boolean;
    protected respawnTimer: Timer;

    protected static livesCount: number = 6;

    // Stuff to end the level and go to the next level
    protected levelEndArea: Rect;
    protected nextLevel: new (...args: any) => IP_Level;
    protected levelEndTimer: Timer;
    protected levelEndLabel: Label;
    startScene(): void {
        this.initLayers();
        this.initPlayer();
        this.initViewport();
        this.subscribeToEvents();
        this.addUI();
        this.isPaused = false;

        this.respawnTimer = new Timer(1000, () => {
            if(IP_Level.livesCount === 0){
                this.sceneManager.changeToScene(MainMenu);
            } else {
                this.respawnPlayer();
                this.player.enablePhysics();
                this.player.unfreeze();
            }
        });


        Input.enableInput();
    }
    //this never runs yets
    updateScene(deltaT: number): void {
        while (this.receiver.hasNextEvent()) {
            console.log("event:",this.receiver.getNextEvent())
            this.handleEvent(this.receiver.getNextEvent());
        }
        
    }

    protected handleEvent(event: GameEvent): void {
        switch (event.type) {
            case inkooEvents.PAUSE_MENU: {
                this.sceneManager.changeToScene(MainMenu);
                break;
            }
            case inkooEvents.LEVEL_START: {
                Input.enableInput();
                break;
            }
            case inkooEvents.LEVEL_END: {
                break;
            }
            case inkooEvents.PLAYER_ATTACK: {
                break;
            }
            case inkooEvents.PLAYER_KILLED: {
                break;
            }
            default: {
                throw new Error(`Unhandled event caught in scene with type ${event.type}`)
            }
        }
    }

    protected initLayers(): void {
        this.addUILayer(Layers.UI);
        this.addLayer(Layers.Main, 2);
    }

    protected initViewport(): void {
        this.viewport.setZoomLevel(1.5);
        
    }

    protected subscribeToEvents() {
        this.receiver.subscribe([
            inkooEvents.PLAYER_ATTACK,
            inkooEvents.LEVEL_START,
            inkooEvents.LEVEL_END,
           
            inkooEvents.PLAYER_KILLED,
            "GOBLIN_MOVED"
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
    }

    protected initPlayer(): void {
        this.player = this.add.animatedSprite('player', Layers.Main);

        this.player.scale.set(1.5, 1.5);
        if(!this.playerSpawn){
            console.warn("Player spawn was never set - setting spawn to (0, 0)");
            this.playerSpawn = Vec2.ZERO;
        }
        this.player.position.copy(this.playerSpawn);

        this.player.addPhysics(new AABB(Vec2.ZERO, new Vec2(12, 8)));
        this.player.addAI(PlayerController, {playerType: "platformer", tilemap: "ground"});
        this.player.colliderOffset.set(0, 11);

        this.player.setGroup("player");
    }

    protected incPlayerLife(amt: number): void {
        IP_Level.livesCount += amt;
        if (IP_Level.livesCount == 0){
            Input.disableInput();
            this.player.disablePhysics();
            // this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "player_death", loop: false, holdReference: false});
            // this.player.tweens.play("death");
        }
    }

    protected respawnPlayer():void{
        IP_Level.livesCount = 6;
        this.sceneManager.changeToScene(MainMenu,{});
        Input.enableInput();
    }
}

