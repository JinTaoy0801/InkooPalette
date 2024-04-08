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

export default class IP_Level extends Scene {
    protected playerSpawn: Vec2;
    protected player: AnimatedSprite;

    private healthBar: Sprite;

    // Labels for the UI
    protected static livesCount: number = 3;
    protected livesCountLabel: Label;


    startScene(): void {
        this.initLayers();
        this.initViewport();
        this.initPlayer();
        this.subscribeToEvents();
        this.addUI();
    }

    updateScene(deltaT: number): void {
        
    }

    protected initLayers(): void {
        this.addUILayer("UI");
        this.addLayer("primary", 1);
    }

    protected initViewport(): void {
        this.viewport.setZoomLevel(2);
    }

    protected subscribeToEvents() {
        this.receiver.subscribe([
            inkooEvents.PLAYER_MOVE,
            inkooEvents.PLAYER_ATTACK,
            inkooEvents.LEVEL_START,
            inkooEvents.LEVEL_END,
            inkooEvents.PLAYER_KILLED
        ]);
    }

    protected addUI(){
        this.livesCountLabel = <Label>this.add.uiElement(UIElementType.LABEL, "UI", {position: new Vec2(50, 60), text: "Lives: " + IP_Level.livesCount});
        this.livesCountLabel.textColor = new Color(0, 0, 0, 1);
        this.livesCountLabel.font = "PixelSimple";

        this.healthBar = this.add.sprite('healthBar', 'assets/player/heart.png')
        this.healthBar.scale.set(1, 1);
        this.healthBar.position = new Vec2(50, 50)
    }

    protected initPlayer(): void {
        this.player = this.add.animatedSprite('player', 'primary')
        this.player.scale.set(1, 1);
        this.player.position.copy(this.playerSpawn);

        this.player.addPhysics(new AABB(Vec2.ZERO, new Vec2(14, 14)));
        this.player.colliderOffset.set(0, 2);
        this.player.addAI(PlayerController, {playerType: "platformer", tilemap: "Main"});

        this.player.setGroup("player");

        this.viewport.follow(this.player);
    }
}

