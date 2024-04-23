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

    private healthBar: Sprite;
    protected isPaused: Boolean;

    // Stuff to end the level and go to the next level
    protected levelEndArea: Rect;
    protected nextLevel: new (...args: any) => IP_Level;
    protected levelEndTimer: Timer;
    protected levelEndLabel: Label;
    // Screen fade in/out for level start and end
    protected levelTransitionTimer: Timer;
    protected levelTransitionScreen: Rect;
    startScene(): void {
        this.initLayers();
        this.initPlayer();
        this.initViewport();
        this.subscribeToEvents();
        this.addUI();
        this.isPaused = false;

        this.levelTransitionTimer = new Timer(500);
        this.levelEndTimer = new Timer(3000, () => {
            // After the level end timer ends, fade to black and then go to the next scene
            this.levelTransitionScreen.tweens.play("fadeIn");
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
            case inkooEvents.PLAYER_ENTERED_LEVEL_END:{
                if(!this.levelEndTimer.hasRun() && this.levelEndTimer.isStopped()){
                    // The player has reached the end of the level
                    this.levelEndTimer.start();
                    this.levelEndLabel.tweens.play("slideIn");
                }
                break;
            }
            case inkooEvents.LEVEL_END: {
                {
                    // Go to the next level
                    if(this.nextLevel){
                        let sceneOptions = {
                            physics: {
                                groupNames: ["ground", "player"],
                                collisions:
                                [
                                    [0, 1],
                                    [1, 0]
                
                                ]
                            }
                        }
                        this.sceneManager.changeToScene(this.nextLevel, {}, sceneOptions);
                    }
                }
                break;
            }
            case inkooEvents.PLAYER_ATTACK: {
                break;
            }
            case inkooEvents.PLAYER_KILLED: {
                this.respawnPlayer();
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
            inkooEvents.PLAYER_ENTERED_LEVEL_END,
            inkooEvents.PLAYER_KILLED,
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
        if(!this.playerSpawn){
            console.warn("Player spawn was never set - setting spawn to (0, 0)");
            this.playerSpawn = Vec2.ZERO;
        }
        this.player.position.copy(this.playerSpawn);

        this.player.addPhysics(new AABB(Vec2.ZERO, new Vec2(12, 8)));
        this.player.addAI(PlayerController, {playerType: "platformer", tilemap: "ground"});
        this.player.colliderOffset.set(0, 11);
        console.log("initplayuer");
        this.player.setGroup("player");
        setTimeout(() => {
            console.log(this.player.group);
          }, 10); 
    }
    protected respawnPlayer():void{
        this.sceneManager.changeToScene(MainMenu,{});
        Input.enableInput();
    }
    addLevelEnd(startingTile: Vec2, size: Vec2): void {
        console.log(this.player.group);
        this.levelEndArea = <Rect>this.add.graphic(GraphicType.RECT, Layers.Main, {
          position: startingTile,
          size: size,
        });
        this.levelEndArea.addPhysics(undefined, undefined, false, true);
        this.levelEndArea.setTrigger(
            "player",
            inkooEvents.PLAYER_ENTERED_LEVEL_END,
            null,
        );
        this.levelEndArea.color = new Color(255, 255, 255, 1);
      }
}

