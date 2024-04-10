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

export enum Layers {
    Main = "main",
    UI = "ui",
    Hidden = "hidden",
    Pause = "pause"
  }

export default class IP_Level extends Scene {
    protected playerSpawn: Vec2;
    player: AnimatedSprite;

    private healthBar: Sprite;
    protected isPaused: Boolean;

    startScene(): void {
        this.initLayers();
        this.initPlayer();
        this.initViewport();
        this.subscribeToEvents();
        this.addUI();
        this.isPaused = false;


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
        this.addLayer(Layers.Main, 1);
    }

    protected initViewport(): void {
        this.viewport.setZoomLevel(1.5);
        
    }

    protected subscribeToEvents() {
        this.receiver.subscribe([
            inkooEvents.PLAYER_ATTACK,
            inkooEvents.LEVEL_START,
            inkooEvents.LEVEL_END,
            inkooEvents.PLAYER_KILLED
        ]);
    }

    protected addUI() {
        this.healthBar = this.add.sprite('healthBar', Layers.UI)
        this.healthBar.scale.set(2, 2);
        this.healthBar.position.copy(new Vec2(30, 30));
    }

    protected initPlayer(): void {
        this.player = this.add.animatedSprite('player', Layers.Main);

        this.player.scale.set(1.5, 1.5);
        this.player.setCollisionShape(new AABB(new Vec2(0,0), new Vec2(100,100)))
        if(!this.playerSpawn){
            console.warn("Player spawn was never set - setting spawn to (0, 0)");
            this.playerSpawn = Vec2.ZERO;
        }
        this.player.position.copy(this.playerSpawn);

        // this.player.set
        this.player.addPhysics(new AABB(Vec2.ZERO, new Vec2(14, 14)));
        // this.player.colliderOffset.set(0, 2);
        this.player.addAI(PlayerController, {playerType: "platformer", tilemap: "ground"});
        this.player.colliderOffset.set(0, 5);

        this.player.setGroup("player");
    }
    protected respawnPlayer():void{
        this.sceneManager.changeToScene(MainMenu,{});
        Input.enableInput();
    }
}

