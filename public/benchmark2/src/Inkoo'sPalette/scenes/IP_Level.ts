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

export default class IP_Level extends Scene {
    protected playerSpawn: Vec2;
    protected player: AnimatedSprite;

    private healthBar: Sprite;

    // Labels for the UI
    protected static livesCount: number = 3;
    protected livesCountLabel: Label;


    startScene(): void {
        this.initLayers();
        this.initPlayer();
        this.initViewport();
        this.subscribeToEvents();
        this.addUI();

        Input.disableInput();
    }

    updateScene(deltaT: number): void {
        while (this.receiver.hasNextEvent()) {
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
            case inkooEvents.PLAYER_ENTERED_LEVEL_END: {
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
        this.addUILayer("UI");
        this.addLayer("primary", 1);
    }

    protected initViewport(): void {
        this.viewport.setZoomLevel(1);
        this.viewport.setBounds(0, 0, 512, 512);
        this.viewport.follow(this.player);
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
        this.healthBar = this.add.sprite('healthBar', 'UI')
        this.healthBar.scale.set(2, 2);
        this.healthBar.position.copy(new Vec2(30, 30));
    }

    protected initPlayer(): void {
        this.player = this.add.animatedSprite('player', 'primary')
        this.player.scale.set(2, 2);
        if(!this.playerSpawn){
            console.warn("Player spawn was never set - setting spawn to (0, 0)");
            this.playerSpawn = Vec2.ZERO;
        }
        this.player.position.copy(this.playerSpawn);

        this.player.addPhysics(new AABB(Vec2.ZERO, new Vec2(16, 16)));
        this.player.colliderOffset.set(0, 2);
        this.player.addAI(PlayerController, {playerType: "platformer", tilemap: "ground"});

        this.player.setGroup("player");
    }
}

