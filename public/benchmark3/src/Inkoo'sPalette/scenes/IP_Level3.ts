import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Input from "../../Wolfie2D/Input/Input";
import { TweenableProperties } from "../../Wolfie2D/Nodes/GameNode";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import Rect from "../../Wolfie2D/Nodes/Graphics/Rect";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import Color from "../../Wolfie2D/Utils/Color";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import Midas from "../Enemies/Midas/Midas";
import { setPlayerSpawn } from "../Global/playerSpawn";
import IP_Level, { Areas, Layers } from "./IP_Level";
import IP_Level2 from "./IP_Level2";
import { sceneOptions } from "./MainMenu";

export default class IP_Level3 extends IP_Level { 
    protected midasdoor: Sprite;
    protected triggerdoor: Rect;

    loadScene(): void {
        this.load.tilemap("level3", "assets/tilemaps/kingmidas.json");
        this.load.spritesheet("player", "assets/player/inkoo.json");
        this.load.spritesheet("midas1", "assets/enemies/midas/stage1/midas1.json");
        // this.load.spritesheet("midas2", "assets/enemies/midas/stage2/midas2.json");
        this.load.image("fullheart", "assets/player/heart.png");
        this.load.image("halfheart", "assets/player/halfheart.png");
        this.load.image("background", "assets/images/mainmenu_bg.png");
        this.load.image("midasdoor", "assets/images/midas_door.png");
        this.load.spritesheet("ARM_RIGHT", "assets/player/attack/arm_right.json");
        this.load.spritesheet("ATTACK_UP", "assets/player/attack/attack_up.json");
        this.load.spritesheet("SPIN_ATTACK", "assets/player/attack/spin_attack.json");
        this.load.spritesheet("GOBLIN_LIGHT_ATTACK", "assets/enemies/goblin/goblin_light_attack.json")
    }

    startScene(): void {
        this.add.tilemap("level3", new Vec2(2, 2));
        this.layers.get("foreground").setDepth(10);
        this.layers.get("ground").setDepth(2);
        super.startScene();
        this.addLevelEnd(new Vec2(32*1, 600), new Vec2(2*32, 10*32), Areas.Midas_Mountains);

        this.midasdoor = this.add.sprite('midasdoor', Layers.Bg);
        this.midasdoor.scale.set(2, 2);
        this.midasdoor.position.copy(new Vec2(27*32+16, 14*32-16));
        this.midasdoor.addPhysics(new AABB(Vec2.ZERO, new Vec2(16, 64)), Vec2.ZERO, true, true);
        // this.midasdoor.setGroup("ground");
        console.log(this.midasdoor);

        const midasOptions = {
            owner: this.add.animatedSprite('midas1', Layers.Main),
            spawn: new Vec2(1740, 572),
            tilemap: Layers.Main,
        }
        var midas = new Midas(midasOptions, 10);

        this.triggerdoor = <Rect>this.add.graphic(GraphicType.RECT, Layers.Main, {
            position: new Vec2(1000, 520),
            size: new Vec2(32, 5*32),
        });
        this.triggerdoor.addPhysics(undefined, undefined, true, true);
        this.triggerdoor.setTrigger(
            "player",
            "CLOSE_DOOR",
            null,
        );
    }

    updateScene(deltaT: number): void {
        Input.enableInput();
        while (this.receiver.hasNextEvent()) {
            let event = this.receiver.getNextEvent();
            switch (event.type) {
                case Areas.Midas_Mountains: {
                    // Go to the next level  
                    setPlayerSpawn(new Vec2(1900, 365.5));
                    this.sceneManager.changeToScene(IP_Level2, {}, sceneOptions);
                    break;
                }
                case "CLOSE_DOOR": {
                    console.log("laksdlkasdlkjasdlkjaljksdljka")
                    this.midasdoor.tweens.add("slidedown", {
                        startDelay: 0,
                        duration: 500,
                        effects: [
                            {
                                property: "positionY",
                                start: this.midasdoor.position.y,
                                end: this.midasdoor.position.y+(32*3+16),
                                ease: EaseFunctionType.OUT_SINE
                            }
                        ]
                    });

                    this.midasdoor.tweens.play("slidedown");

                    this.triggerdoor.destroy();
                }
                default: {
                    super.updateScene(deltaT);
                }
            }
        }
    }

    protected subscribeToEvents() {
        this.receiver.subscribe([
            Areas.Midas_Mountains,
            "CLOSE_DOOR"
        ]);
    }

    protected addUI() {
        super.addUI();
    }
}