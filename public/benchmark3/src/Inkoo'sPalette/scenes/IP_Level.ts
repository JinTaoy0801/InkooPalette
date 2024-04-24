import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Input from "../../Wolfie2D/Input/Input";
import { TweenableProperties } from "../../Wolfie2D/Nodes/GameNode";
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
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import PlayerState from "../Player/PlayerStates/PlayerState";
import { getLastPlayerPosition } from "../Global/lastPlayerPosition";
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
        Input.disableInput();
    }


    updateScene(deltaT: number){
        if(this.player.position.y > 1200 || this.player.position.x < 0){
            console.log(getLastPlayerPosition());
            this.player.position.copy(getLastPlayerPosition());
        }
        while (this.receiver.hasNextEvent()) {
            let event = this.receiver.getNextEvent();
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
                    Input.disableInput();
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
                case inkooEvents.LEVEL_START:{
                    console.log("in start");
                    Input.enableInput();
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
        
    }

    protected initLayers(): void {
        this.addUILayer(Layers.UI);
        this.addLayer(Layers.Main, 2);
    }

    protected initViewport(): void {
        this.viewport.setZoomLevel(1.5);
        this.viewport.follow(this.player);
        this.viewport.setBounds(0, 0, 64*32, 64*16);
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
        else if (IP_Level.livesCount === 4) {`~`
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

    protected initPlayer(): void {
        this.player = this.add.animatedSprite("player", Layers.Main);

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
        console.log("beforeset", this.player);
        this.player.setGroup("player");
        console.log("this.plasdyhasdasdas", this.player.group);
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

    addLevelEnd(startingTile: Vec2, size: Vec2): void {
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

    protected respawnPlayer():void{
        IP_Level.livesCount = 6;
        this.sceneManager.changeToScene(MainMenu,{});
        Input.enableInput();
    }

}

