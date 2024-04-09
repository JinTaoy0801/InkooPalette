import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import IP_Level from "./IP_Level";
// import GameLevel from "./GameLevel";
// import Level2 from "./Level2";

export default class IP_Level1 extends IP_Level {
    protected goblin: AnimatedSprite;

    loadScene(): void {
        // Load resources
        this.load.tilemap("level1", "assets/tilemaps/level1.json");
        this.load.spritesheet("player", "assets/player/inkoo.json");
        this.load.spritesheet("goblin", "assets/enemies/goblin/goblin_movement.json")
        this.load.image("healthBar", "assets/player/heart.png")
    }

    unloadScene(){
      
    }

    startScene(): void {
        this.playerSpawn = new Vec2(50, 748);
        this.add.tilemap("level1", new Vec2(2, 2));
        super.startScene();

        this.initGoblin();
    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);
    }

    protected initViewport(): void {
        super.initViewport();
        this.viewport.follow(this.player);
        this.viewport.setBounds(0, 0, 64*30, 64*64);
    }

    protected initGoblin(): void {
        this.goblin = this.add.animatedSprite('goblin', 'primary');
        this.goblin.scale.set(2, 2);
        this.goblin.position.copy(new Vec2(100, 748));
        this.goblin.setGroup("goblin");
    }

    protected addUI() {
        super.addUI();
    }
}