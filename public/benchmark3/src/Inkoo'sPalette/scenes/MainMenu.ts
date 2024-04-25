import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Layer from "../../Wolfie2D/Scene/Layer";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import Label, { HAlign } from "../../Wolfie2D/Nodes/UIElements/Label";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import IP_Level1 from "./IP_Level1";
import IP_Level2 from "./IP_Level2";
import { inkooEvents } from "../inkooEvents";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import Input from "../../Wolfie2D/Input/Input";

const MainMenuName = {
    MAIN_MENU: "MAIN_MENU",
    LEVEL_SELECT: "LEVEL_SELECT",
    CONTROLS: "CONTROLS",
    STORY: "STORY",
    START_GAME: "START_GAME",
    LEVEL_2: "LEVEL_2",
    MENU: "MENU"
} as const

export default class MainMenu extends Scene {
    animatedSprite: AnimatedSprite;
    private mainMenu: Layer;
    private levelSelector: Layer;
    private controls: Layer;
    private story: Layer;
    private currentLayer: Layer;
    private logo: Sprite;
    private main_bg: Sprite;
    private level_bg: Sprite;
    private controls_bg: Sprite;
    private story_bg: Sprite;
    private lock0: Sprite;
    private lock1: Sprite;

    loadScene(): void {
        // If we want menu music
        // this.load.audio("menu", "path");
        this.load.image("logo", "assets/images/logo.png");
        this.load.image("background", "assets/images/mainmenu_bg.png");
        this.load.image("lock", "assets/images/lock.png");
    }

    startScene(): void {
        let center = this.viewport.getHalfSize();
        this.viewport.setFocus(center);
        this.viewport.setZoomLevel(1);

        // Create screens
        this.mainMenu = this.addUILayer(MainMenuName.MAIN_MENU);
        this.levelSelector = this.addUILayer(MainMenuName.LEVEL_SELECT);
        this.controls = this.addUILayer(MainMenuName.CONTROLS);
        this.story = this.addUILayer(MainMenuName.STORY);
        this.levelSelector.setHidden(true);
        this.controls.setHidden(true);
        this.story.setHidden(true);

        // Set current layer to main menu initially
        this.currentLayer = this.mainMenu;

        // Set background
        this.main_bg = this.add.sprite("background", MainMenuName.MAIN_MENU);
        this.main_bg.scale.set(5, 5);
        this.main_bg.position = new Vec2(center.x, center.y);

        const inkoo = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.MAIN_MENU, {position: new Vec2(center.x - 50, center.y - 300), text: "Inkoo's"});
        inkoo.textColor = Color.WHITE;
        inkoo.font = "daydream";
        const palette = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.MAIN_MENU, {position: new Vec2(center.x + 50, center.y - 250), text: "Palette"});
        palette.textColor = Color.WHITE;
        palette.font = "daydream";

        this.logo = this.add.sprite("logo", MainMenuName.MAIN_MENU)
        this.logo.scale.set(0.15, 0.15);
        this.logo.position = new Vec2(center.x + 100, center.y - 310);

        // Start button
        const startGame = <Button>this.add.uiElement(UIElementType.BUTTON, MainMenuName.MAIN_MENU, {position: new Vec2(center.x, center.y - 100), text: "Start"});
        startGame.font = "daydream"
        startGame.size.set(140, 50);
        startGame.borderColor = Color.TRANSPARENT;
        startGame.backgroundColor = Color.TRANSPARENT;
        startGame.onClickEventId = MainMenuName.START_GAME;

        // Level Select button
        const levelSelect = <Button>this.add.uiElement(UIElementType.BUTTON, MainMenuName.MAIN_MENU, {position: new Vec2(center.x, center.y - 25), text: "Level Select"});
        levelSelect.font = "daydream"
        levelSelect.size.set(260, 50);
        levelSelect.borderColor = Color.TRANSPARENT;
        levelSelect.backgroundColor = Color.TRANSPARENT;
        levelSelect.onClickEventId = MainMenuName.LEVEL_SELECT;

        // Controls button
        const controls = <Button>this.add.uiElement(UIElementType.BUTTON, MainMenuName.MAIN_MENU, {position: new Vec2(center.x, center.y + 50), text: "Controls"});
        controls.font = "daydream"
        controls.size.set(210, 50);
        controls.borderColor = Color.TRANSPARENT;
        controls.backgroundColor = Color.TRANSPARENT;
        controls.onClickEventId = MainMenuName.CONTROLS;

        // Story button
        const story = <Button> this.add.uiElement(UIElementType.BUTTON, MainMenuName.MAIN_MENU, {position: new Vec2(center.x, center.y + 125), text: "Story"});
        story.font = "daydream"
        story.size.set(140, 50);
        story.borderColor = Color.TRANSPARENT;
        story.backgroundColor = Color.TRANSPARENT;
        story.onClickEventId = MainMenuName.STORY;

        // Select Level layout
        this.level_bg = this.add.sprite("background", MainMenuName.LEVEL_SELECT);
        this.level_bg.scale.set(5, 5);
        this.level_bg.position = new Vec2(center.x, center.y);

        const levelBack = <Label>this.add.uiElement(UIElementType.BUTTON, MainMenuName.LEVEL_SELECT, {position: new Vec2(center.x, center.y + this.viewport.getHalfSize().y - 200), text: "Back"});
        levelBack.borderColor = Color.TRANSPARENT;
        levelBack.backgroundColor = Color.TRANSPARENT;
        levelBack.onClickEventId = MainMenuName.MENU;
        levelBack.font = "daydream"

        const levelHeader = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.LEVEL_SELECT, {position: new Vec2(center.x, center.y - 300), text: "Level Select"});
        levelHeader.textColor = Color.WHITE;
        levelHeader.font = "daydream";

        const level_1 = <Label>this.add.uiElement(UIElementType.BUTTON, MainMenuName.LEVEL_SELECT, {position: new Vec2(center.x - 200, center.y - 150), text: "1"});
        level_1.borderColor = Color.TRANSPARENT;
        level_1.backgroundColor = Color.TRANSPARENT;
        level_1.onClickEventId = MainMenuName.START_GAME;
        level_1.font = "daydream"

        const level_2 = <Label>this.add.uiElement(UIElementType.BUTTON, MainMenuName.LEVEL_SELECT, {position: new Vec2(center.x, center.y - 150), text: "2"});
        level_2.borderColor = Color.TRANSPARENT;
        level_2.backgroundColor = Color.TRANSPARENT;
        level_2.onClickEventId = MainMenuName.LEVEL_2;
        level_2.font = "daydream"

        const level_3 = <Label>this.add.uiElement(UIElementType.BUTTON, MainMenuName.LEVEL_SELECT, {position: new Vec2(center.x + 200, center.y - 150), text: "3"});
        level_3.borderColor = Color.TRANSPARENT;
        level_3.backgroundColor = Color.TRANSPARENT;
        level_3.onClickEventId = MainMenuName.MENU;
        level_3.font = "daydream"

        const level_4 = <Label>this.add.uiElement(UIElementType.BUTTON, MainMenuName.LEVEL_SELECT, {position: new Vec2(center.x - 200, center.y), text: "4"});
        level_4.borderColor = Color.TRANSPARENT;
        level_4.backgroundColor = Color.TRANSPARENT;
        level_4.onClickEventId = MainMenuName.MENU;
        level_4.font = "daydream"

        const level_5 = <Label>this.add.uiElement(UIElementType.BUTTON, MainMenuName.LEVEL_SELECT, {position: new Vec2(center.x, center.y), text: "5"});
        level_5.borderColor = Color.TRANSPARENT;
        level_5.backgroundColor = Color.TRANSPARENT;
        level_5.onClickEventId = MainMenuName.MENU;
        level_5.font = "daydream"

        const level_6 = <Label>this.add.uiElement(UIElementType.BUTTON, MainMenuName.LEVEL_SELECT, {position: new Vec2(center.x + 200, center.y), text: "6"});
        level_6.borderColor = Color.TRANSPARENT;
        level_6.backgroundColor = Color.TRANSPARENT;
        level_6.onClickEventId = MainMenuName.MENU;
        level_6.font = "daydream"
        

        // Controls layout
        this.controls_bg = this.add.sprite("background", MainMenuName.CONTROLS);
        this.controls_bg.scale.set(5, 5);
        this.controls_bg.position = new Vec2(center.x, center.y);

        const controlsBack = <Label>this.add.uiElement(UIElementType.BUTTON, MainMenuName.CONTROLS, {position: new Vec2(center.x, center.y + this.viewport.getHalfSize().y - 200), text: "Back"});
        controlsBack.borderColor = Color.TRANSPARENT;
        controlsBack.backgroundColor = Color.TRANSPARENT;
        controlsBack.onClickEventId = MainMenuName.MENU;
        controlsBack.font = "daydream"

        const controlsHeader = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.CONTROLS, {position: new Vec2(center.x, center.y - 300), text: "Controls"});
        controlsHeader.textColor = Color.WHITE;
        controlsHeader.font = "daydream";

        const jump = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.CONTROLS, {position: new Vec2(center.x - 200, center.y - 200), text: "Jump"});
        jump.textColor = Color.WHITE;
        jump.font = "daydream"
        jump.fontSize = 20;

        const space = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.CONTROLS, {position: new Vec2(center.x + 176, center.y - 200), text: "Space"});
        space.textColor = Color.WHITE;
        space.font = "daydream"
        space.fontSize = 20;

        const left = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.CONTROLS, {position: new Vec2(center.x - 157, center.y - 160), text: "Move Left"});
        left.textColor = Color.WHITE;
        left.font = "daydream"
        left.fontSize = 20;
        
        const a = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.CONTROLS, {position: new Vec2(center.x + 135, center.y - 160), text: "A"});
        a.textColor = Color.WHITE;
        a.font = "daydream"
        a.fontSize = 20;

        const right = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.CONTROLS, {position: new Vec2(center.x - 145, center.y - 120), text: "Move Right"});
        right.textColor = Color.WHITE;
        right.font = "daydream"
        right.fontSize = 20;

        const d = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.CONTROLS, {position: new Vec2(center.x + 135, center.y - 120), text: "D"});
        d.textColor = Color.WHITE;
        d.font = "daydream"
        d.fontSize = 20;

        const melee = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.CONTROLS, {position: new Vec2(center.x - 127, center.y - 80), text: "Melee Attack"});
        melee.textColor = Color.WHITE;
        melee.font = "daydream"
        melee.fontSize = 20;

        const j = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.CONTROLS, {position: new Vec2(center.x + 133, center.y - 80), text: "J"});
        j.textColor = Color.WHITE;
        j.font = "daydream"
        j.fontSize = 20;

        const upAttack = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.CONTROLS, {position: new Vec2(center.x - 109, center.y - 40), text: "Upward Attack"});
        upAttack.textColor = Color.WHITE;
        upAttack.font = "daydream"
        upAttack.fontSize = 20;

        const w_j = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.CONTROLS, {position: new Vec2(center.x + 161, center.y - 40), text: "W + J"});
        w_j.textColor = Color.WHITE;
        w_j.font = "daydream"
        w_j.fontSize = 20;

        const spin = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.CONTROLS, {position: new Vec2(center.x - 138, center.y), text: "Spin Attack"});
        spin.textColor = Color.WHITE;
        spin.font = "daydream"
        spin.fontSize = 20;

        const inAir = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.CONTROLS, {position: new Vec2(center.x + 224, center.y), text: "W + J (In Air)"});
        inAir.textColor = Color.WHITE;
        inAir.font = "daydream"
        inAir.fontSize = 20;

        this.lock0 = this.add.sprite("lock", MainMenuName.CONTROLS);
        this.lock0.scale.set(0.1, 0.1);
        this.lock0.position = new Vec2(center.x + 170, center.y + 40);

        const range = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.CONTROLS, {position: new Vec2(center.x - 120, center.y + 40), text: "Range Attack"});
        range.textColor = Color.WHITE;
        range.font = "daydream"
        range.fontSize = 20;

        const k = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.CONTROLS, {position: new Vec2(center.x + 135, center.y + 40), text: "K"});
        k.textColor = Color.WHITE;
        k.font = "daydream"
        k.fontSize = 20;

        this.lock1 = this.add.sprite("lock", MainMenuName.CONTROLS);
        this.lock1.scale.set(0.1, 0.1);
        this.lock1.position = new Vec2(center.x + 240, center.y + 80);

        const dash = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.CONTROLS, {position: new Vec2(center.x - 199, center.y + 80), text: "Dash"});
        dash.textColor = Color.WHITE;
        dash.font = "daydream"
        dash.fontSize = 20;

        const shift = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.CONTROLS, {position: new Vec2(center.x + 172, center.y + 80), text: "Shift"});
        shift.textColor = Color.WHITE;
        shift.font = "daydream"
        shift.fontSize = 20;

        const pause = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.CONTROLS, {position: new Vec2(center.x - 141, center.y + 120), text: "Pause Game"});
        pause.textColor = Color.WHITE;
        pause.font = "daydream"
        pause.fontSize = 20;

        const esc = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.CONTROLS, {position: new Vec2(center.x + 157, center.y + 120), text: "Esc"});
        esc.textColor = Color.WHITE;
        esc.font = "daydream"
        esc.fontSize = 20;

        // Story layout
        this.story_bg = this.add.sprite("background", MainMenuName.STORY);
        this.story_bg.scale.set(5, 5);
        this.story_bg.position = new Vec2(center.x, center.y);

        const storyBack = <Label>this.add.uiElement(UIElementType.BUTTON, MainMenuName.STORY, {position: new Vec2(center.x, center.y + this.viewport.getHalfSize().y - 200), text: "Back"});
        storyBack.borderColor = Color.TRANSPARENT;
        storyBack.backgroundColor = Color.TRANSPARENT;
        storyBack.onClickEventId = MainMenuName.MENU;
        storyBack.font = "daydream"

        const storyHeader = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.STORY, {position: new Vec2(center.x, center.y - 300), text: "Story"});
        storyHeader.textColor = Color.WHITE;
        storyHeader.font = "daydream";

        const storyText = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.STORY, {position: new Vec2(center.x, center.y - 50), text: "Story Placeholder Text"});
        storyText.textColor = Color.WHITE;

        this.receiver.subscribe(MainMenuName.START_GAME);
        this.receiver.subscribe(MainMenuName.LEVEL_SELECT);
        this.receiver.subscribe(MainMenuName.CONTROLS);
        this.receiver.subscribe(MainMenuName.STORY);
        this.receiver.subscribe(MainMenuName.MENU);
        this.receiver.subscribe(MainMenuName.LEVEL_2);
    }

    updateScene() {
        while(this.receiver.hasNextEvent()){
            this.handleEvent(this.receiver.getNextEvent());
        }
        if (Input.isJustPressed("level1")) {
            this.emitter.fireEvent(MainMenuName.START_GAME);
        }
        if (Input.isJustPressed("level2")) {
            this.emitter.fireEvent(MainMenuName.LEVEL_2);
        }
    }

    protected handleEvent(event: GameEvent): void {
        switch(event.type) {
            case MainMenuName.START_GAME: {
                this.emitter.fireEvent(inkooEvents.LEVEL_START);
                let sceneOptions = {
                    physics: {
                        groupNames: ["ground", "player","enemy"],
                        collisions:
                        [
                            [0, 1, 1],
                            [1, 0, 1],
                            [1, 1, 0]
                        ]
                    }
                }
                this.sceneManager.changeToScene(IP_Level1, {}, sceneOptions);
                break;
            }

            case MainMenuName.LEVEL_2: {
                this.emitter.fireEvent(inkooEvents.LEVEL_START);
                let sceneOptions = {
                    physics: {
                        groupNames: ["ground", "player","enemy"],
                        collisions:
                        [
                            [0, 1, 1],
                            [1, 0, 1],
                            [1, 1, 0]
                        ]
                    }
                }
                this.sceneManager.changeToScene(IP_Level2, {}, sceneOptions);
                break;
            }

            case MainMenuName.LEVEL_SELECT: {
                this.currentLayer.setHidden(true);
                this.levelSelector.setHidden(false);
                this.currentLayer = this.levelSelector;
                break;
            }

            case MainMenuName.CONTROLS: {
                this.currentLayer.setHidden(true);
                this.controls.setHidden(false);
                this.currentLayer = this.controls;
                break;
            }

            case MainMenuName.STORY: {
                this.currentLayer.setHidden(true);
                this.story.setHidden(false);
                this.currentLayer = this.story;
                break;
            }

            case MainMenuName.MENU: {
                this.mainMenu.setHidden(false);
                this.currentLayer.setHidden(true);
                this.currentLayer = this.mainMenu;
                break;
            }

            default: {
                throw new Error(`Unhandled event caught in MainMenu: "${event.type}"`);
            }
        }
    }
}