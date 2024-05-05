import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Input from "../../Wolfie2D/Input/Input";
import { TweenableProperties } from "../../Wolfie2D/Nodes/GameNode";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import Rect from "../../Wolfie2D/Nodes/Graphics/Rect";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import Timer from "../../Wolfie2D/Timing/Timer";
import Color from "../../Wolfie2D/Utils/Color";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import Midas from "../Enemies/Midas/Midas";
import { setPlayerSpawn } from "../Global/playerSpawn";
import Shield from "../Shield/Shield";
import { inkooEvents } from "../inkooEvents";
import IP_Level, { Areas, Layers } from "./IP_Level";
import IP_Level2 from "./IP_Level2";
import { sceneOptions } from "./MainMenu";

export default class IP_Level6 extends IP_Level { 
    protected midasdoor: Sprite;
    protected triggerdoor: Rect;
    walloffthrone: Rect;

    beams = new Array<Rect>(); 
    bigbeams = new Array<Sprite>(); 

    midas: Midas;
    shield: Shield;
    rock: AnimatedSprite;
    rockvelocity = Vec2.ZERO;

    dmgcooldown = new Timer(500);
    shielddmgbuffer = new Timer(500);

    beamLocation = [
        new Vec2(30*32, 9*32),
        new Vec2(35*32, 9*32),
        new Vec2(40*32, 9*32),
        new Vec2(45*32, 9*32),
        new Vec2(50*32, 9*32),
    ];

    loadScene(): void {
        this.load.tilemap("level6", "assets/tilemaps/kingmidas.json");
        this.load.spritesheet("player", "assets/player/inkoo.json");
        this.load.spritesheet("midas1", "assets/enemies/midas/stage1/midas1.json");
        // this.load.spritesheet("midas2", "assets/enemies/midas/stage2/midas2.json");
        this.load.image("6", "assets/images/6.png");
        this.load.image("5", "assets/images/5.png");
        this.load.image("4", "assets/images/4.png");
        this.load.image("3", "assets/images/3.png");
        this.load.image("2", "assets/images/2.png");
        this.load.image("1", "assets/images/1.png");
        this.load.image("background", "assets/images/mainmenu_bg.png");
        this.load.image("midasdoor", "assets/images/midas_door.png");
        this.load.spritesheet("ARM_RIGHT", "assets/player/attack/arm_right.json");
        this.load.spritesheet("ATTACK_UP", "assets/player/attack/attack_up.json");
        this.load.spritesheet("SPIN_ATTACK", "assets/player/attack/spin_attack.json");
        this.load.spritesheet("gold", "assets/enemies/goldlem/gold.json");
        this.load.spritesheet("shield", "assets/enemies/midas/shield.json");
        this.load.spritesheet("rock", "assets/enemies/midas/rock.json");
        this.load.audio("attack", "assets/sounds/attack.wav");
        this.load.audio("dash", "assets/sounds/dash.wav");
        this.load.audio("dead", "assets/sounds/dead.wav");
        this.load.audio("enemy_dead", "assets/sounds/enemy_dead.wav");
        this.load.audio("hit_enemy", "assets/sounds/hit_enemy.wav");
        this.load.audio("jump", "assets/sounds/jump.wav");
        this.load.audio("laser_charge", "assets/sounds/laser_charge.wav");
        this.load.audio("laser", "assets/sounds/laser.wav");
        this.load.audio("rock_forming", "assets/sounds/rock_forming.wav");
        this.load.audio("rock_slide", "assets/sounds/rock_slide.wav");
        this.load.audio("shield_hit", "assets/sounds/shield_hit.wav");
        this.load.audio("took_damage", "assets/sounds/took_damage.wav");
    }

    startScene(): void {
        this.add.tilemap("level6", new Vec2(2, 2));
        this.layers.get("foreground").setDepth(10);
        this.layers.get("ground").setDepth(2);
        super.startScene();
        this.addLevelEnd(new Vec2(32*1, 600), new Vec2(2*32, 10*32), Areas.Midas_Mountains);

        this.midasdoor = this.add.sprite('midasdoor', Layers.Bg);
        this.midasdoor.scale.set(2, 2);
        this.midasdoor.position.copy(new Vec2(27*32+16, 14*32-16));
        this.midasdoor.addPhysics(new AABB(Vec2.ZERO, new Vec2(16, 64)), Vec2.ZERO, true, true);

        const midasOptions = {
            owner: this.add.animatedSprite('midas1', Layers.Main),
            spawn: new Vec2(1740, 572),
            tilemap: Layers.Main,
        }
        this.midas = new Midas(midasOptions, 10);

        this.trash_Mobs.set(this.midas.owner.id, this.midas);
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

        this.walloffthrone = <Rect>this.add.graphic(GraphicType.RECT, Layers.Main, {
            position: new Vec2(55*32, 350),
            size: new Vec2(32, 17*32),
        });
        this.walloffthrone.setColor(new Color(0,0,0,0));
        this.walloffthrone.addPhysics(undefined, undefined, true, true);

        //make the warning beams:
        this.initBeams();
    }

    updateScene(deltaT: number): void {
        Input.enableInput();
        while (this.receiver.hasNextEvent() && (this.isArea(this.receiver.peekNextEvent().type) ||
        this.checkEvent(this.receiver.peekNextEvent().type))) {
            let event = this.receiver.getNextEvent();
            console.log('event: ', event.type);
            switch (event.type) {
                case Areas.Midas_Mountains: {
                    // Go to the next level  
                    setPlayerSpawn(new Vec2(1900, 365.5));
                    this.sceneManager.changeToScene(IP_Level2, {}, this.sceneOptions);
                    break;
                }
                case "CLOSE_DOOR": {
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

                    this.viewport.setZoomLevel(1);
                    this.viewport_size = this.viewport.getZoomLevel();
                    this.viewport_center = this.viewport.getCenter();
                    this.initBossHealthBar("MIDAS");
                    break;
                }
                case "SPAWNBEAM": {
                    this.beams.forEach(beam => {
                        beam.tweens.play("beamflash");
                    });
                    break;
                }
                case "SPAWNSHIELD": {
                    let newShield = this.add.animatedSprite("shield", Layers.Main);
                    newShield.scale.set(2, 2);

                    const HB_options = {
                        actor: this.midas.owner,
                        sprite: newShield,
                        center: new Vec2(0, 0),
                        halfSize: 60,
                        offset : new Vec2(0, 0)
                    }
                    this.shield = new Shield(HB_options, "shield")
                    
                    console.log(newShield);
                    this.midas.toggleInvincible();
                    console.log("midas is invincible?: ", this.midas.isInvincible);
                    break;
                }
                case "GROUNDSHAKE": {
                    let shake1 = this.add.animatedSprite("rock", Layers.Main);
                    shake1.scale.set(2, 2);
                    
                    shake1.position = new Vec2(30*32, 18*32-16);
                    shake1.animation.play("SPAWNING", true);

                    let shake2 = this.add.animatedSprite("rock", Layers.Main);
                    shake2.scale.set(2, 2);
                    
                    shake2.position = new Vec2(50*32, 18*32-16);
                    shake2.animation.play("SPAWNING", true);

                    setTimeout(() => {
                        shake1.animation.stop();
                        shake1.destroy();
                        shake2.animation.stop();
                        shake2.destroy();
                    }, 500)
                    break;
                }
                case "SPAWNROCK": {
                    if (this.rock == undefined) {
                        this.rock = this.add.animatedSprite('gold', Layers.Main);
                        this.rock.scale.set(10, 10);
                        this.rock.addPhysics(new AABB(Vec2.ZERO, new Vec2(10*2,10*2)), Vec2.ZERO);
                        this.rock.position.set(40*32, 18*32+8);
                        this.rock.setGroup("env");
                    }
                    break;
                }
                case "BREAKSHIELD": {
                    setTimeout(()=> {
                        // this.rock.destroy();
                        this.remove(this.rock);
                        this.rock = undefined;
                        this.rockvelocity = Vec2.ZERO;
                        // console.log('this.rock', this.rock);
                    }, 350);

                    if (this.player.invertX) {
                        this.rockvelocity = new Vec2(-20, 0);
                    }
                    else {
                        this.rockvelocity = new Vec2(20, 0);
                        if (this.shield! && this.shielddmgbuffer.isStopped()) {
                            this.shielddmgbuffer.start();
                            this.emitter.fireEvent(inkooEvents.PLAY_SOUND, { key: "shield_hit", loop: false, holdReference: false });
                            this.shield.setHp(-1);
                            if (this.shield.getHp() === 0) {
                                this.shield.box.animation.play("BROKEN", false, "BROKENSHIELD");
                                this.midas.toggleInvincible();
                            }
                            else this.shield.box.animation.play("BREAKING");
                        }
                        else {
                            if (this.dmgcooldown.isStopped() && !this.midas.isInvincible) {
                                this.dmgcooldown.start();
                                this.emitter.fireEvent(inkooEvents.PLAY_SOUND, { key: "hit_enemy", loop: false, holdReference: false });
                                this.midas.setHp(-1);
                                this.handleBossHealthChange(this.midas.getHp(), 10)
                                // console.log('midas hp:', this.midas.getHp());
                            }
                        }
                    }
                    break;
                }
                case "BROKENSHIELD": {
                    this.shield.box.destroy();
                    this.remove(this.shield.box);
                    this.shield.box = undefined;
                    this.shield = undefined;
                    break;
                }
                case "DEADMIDAS": {
                    if (this.rock!) {
                        this.remove(this.rock);
                        this.rock = undefined;
                    }
                    this.walloffthrone.removePhysics();

                    this.midas.owner.destroy();
                    this.midas = undefined;
                    break;
                }
            }
        }

        super.updateScene(deltaT);
        if (this.rock!) {
            this.rock.move(this.rockvelocity);
        }
        // console.log('the rock: ', this.rock)
    }

    checkEvent(s: String) {
        let checks = [
            "CLOSE_DOOR",
            "SPAWNBEAM",
            "SPAWNSHIELD",
            "GROUNDSHAKE",
            "SPAWNROCK",
            "BREAKSHIELD",
            "BROKENSHIELD",
            "DEADMIDAS"
        ]
        return checks.some(check => check === s);
    }

    initBeams() {
        this.beamLocation.forEach(pos => {
            let beam = <Rect>this.add.graphic(GraphicType.RECT, Layers.Main, {
                position: pos,
                size: new Vec2(4, 20*32),
            });
            //console.log("beem id", beam.id)
            beam.setColor(new Color(245, 216, 54, 0))
            beam.tweens.add("beamflash", {
                startDelay: 0,
                duration: 500,
                effects: [
                    {
                        property: "alpha",
                        start: 0.7,
                        end: 0,
                        ease: EaseFunctionType.OUT_SINE
                    }
                ],
            });
            this.beams.push(beam);
        });
    }


    protected subscribeToEvents() {
        super.subscribeToEvents();
        this.receiver.subscribe([
            Areas.Midas_Mountains,
            "CLOSE_DOOR",
            "SPAWNBEAM",
            "SPAWNSHIELD",
            "GROUNDSHAKE",
            "SPAWNROCK",
            "BREAKSHIELD",
            "BROKENSHIELD",
            "DEADMIDAS"
        ]);
    }

    protected addUI() {
        super.addUI();
    }
}