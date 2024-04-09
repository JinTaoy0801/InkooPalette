import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Layer from "../../Wolfie2D/Scene/Layer";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import IP_Level1 from "./IP_Level1";
import { inkooEvents } from "../inkooEvents";

const MainMenuName = {
    MAIN_MENU: "MAIN_MENU",
    LEVEL_SELECT: "LEVEL_SELECT",
    CONTROLS: "CONTROLS",
    STORY: "STORY",
    START_GAME: "START_GAME",
    MENU: "MENU"
} as const

export default class MainMenu extends Scene {

    private mainMenu: Layer;
    private levelSelector: Layer;
    private controls: Layer;
    private story: Layer;
    private currentLayer: Layer;
    private logo: Sprite;

    loadScene(): void {
        // If we want menu music
        // this.load.audio("menu", "path");
        this.load.image("logo", "assets/logo.png");
    }

    startScene(): void {
        const center = this.viewport.getCenter();

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

        // Set background color
        const background = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.MAIN_MENU, {position: new Vec2(center.x, center.y), text: ""});
        background.size.set(1280, 800);
        background.backgroundColor = new Color(150, 150, 150);
        background.borderRadius = 0;

        this.logo = this.add.sprite("logo", MainMenuName.MAIN_MENU)
        this.logo.scale.set(0.25, 0.25);
        this.logo.position = new Vec2(center.x, center.y - 150);

        // Start button
        const startGame = this.add.uiElement(UIElementType.BUTTON, MainMenuName.MAIN_MENU, {position: new Vec2(center.x, center.y - 15), text: "Start"});
        startGame.size.set(200, 50);
        startGame.borderWidth = 2;
        startGame.borderColor = Color.WHITE;
        startGame.backgroundColor = new Color(34, 27, 48);
        startGame.onClickEventId = MainMenuName.START_GAME;

        // Level Select button
        const levelSelect = this.add.uiElement(UIElementType.BUTTON, MainMenuName.MAIN_MENU, {position: new Vec2(center.x, center.y + 60), text: "Level Select"});
        levelSelect.size.set(200, 50);
        levelSelect.borderWidth = 2;
        levelSelect.borderColor = Color.WHITE;
        levelSelect.backgroundColor = new Color(34, 27, 48);
        levelSelect.onClickEventId = MainMenuName.LEVEL_SELECT;

        // Controls button
        const controls = this.add.uiElement(UIElementType.BUTTON, MainMenuName.MAIN_MENU, {position: new Vec2(center.x, center.y + 135), text: "Controls"});
        controls.size.set(200, 50);
        controls.borderWidth = 2;
        controls.borderColor = Color.WHITE;
        controls.backgroundColor = new Color(34, 27, 48);
        controls.onClickEventId = MainMenuName.CONTROLS;

        // Story button
        const story = this.add.uiElement(UIElementType.BUTTON, MainMenuName.MAIN_MENU, {position: new Vec2(center.x, center.y + 210), text: "Story"});
        story.size.set(200, 50);
        story.borderWidth = 2;
        story.borderColor = Color.WHITE;
        story.backgroundColor = new Color(34, 27, 48);
        story.onClickEventId = MainMenuName.STORY;

        // Select Level layout
        const levelBack = <Label>this.add.uiElement(UIElementType.BUTTON, MainMenuName.LEVEL_SELECT, {position: new Vec2(center.x - this.viewport.getHalfSize().x + 130, center.y - this.viewport.getHalfSize().y + 50), text: "Back"});
        levelBack.size.set(200, 50);
        levelBack.borderWidth = 2;
        levelBack.borderColor = Color.WHITE;
        levelBack.backgroundColor = new Color(34, 27, 48);
        levelBack.onClickEventId = MainMenuName.MENU;
        levelBack.textColor = Color.WHITE;

        // Controls layout
        const controlsBack = <Label>this.add.uiElement(UIElementType.BUTTON, MainMenuName.CONTROLS, {position: new Vec2(center.x - this.viewport.getHalfSize().x + 130, center.y - this.viewport.getHalfSize().y + 50), text: "Back"});
        controlsBack.size.set(200, 50);
        controlsBack.borderWidth = 2;
        controlsBack.borderColor = Color.WHITE;
        controlsBack.backgroundColor = new Color(34, 27, 48);
        controlsBack.onClickEventId = MainMenuName.MENU;
        controlsBack.textColor = Color.WHITE;

        const controlsHeader = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.CONTROLS, {position: new Vec2(center.x, center.y - 150), text: "Controls"});
        controlsHeader.size.set(700, 75);
        controlsHeader.borderWidth = 2;
        controlsHeader.borderRadius = 0;
        controlsHeader.borderColor = Color.WHITE;
        controlsHeader.textColor = Color.WHITE;
        controlsHeader.backgroundColor = new Color(34, 27, 48);

        const controlsBox = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.CONTROLS, {position: new Vec2(center.x, center.y + 62.5), text: ""});
        controlsBox.size.set(700, 350);
        controlsBox.borderWidth = 2;
        controlsBox.borderRadius = 0;
        controlsBox.borderColor = Color.WHITE;
        controlsBox.textColor = Color.WHITE;
        controlsBox.backgroundColor = new Color(34, 27, 48);

        const w = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.CONTROLS, {position: new Vec2(center.x, center.y - 80), text: "W/Space - Jump"});
        w.textColor = Color.WHITE;
        const a = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.CONTROLS, {position: new Vec2(center.x, center.y - 40), text: "A - Move Left"});
        a.textColor = Color.WHITE;
        const s = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.CONTROLS, {position: new Vec2(center.x, center.y), text: "S - Quick Fall"});
        s.textColor = Color.WHITE;
        const d = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.CONTROLS, {position: new Vec2(center.x, center.y + 40), text: "D - Move Right"});
        d.textColor = Color.WHITE;
        const shift = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.CONTROLS, {position: new Vec2(center.x, center.y + 80), text: "Shift - Dash"});
        shift.textColor = Color.WHITE;
        const j = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.CONTROLS, {position: new Vec2(center.x, center.y + 120), text: "J - Basic Attack"});
        j.textColor = Color.WHITE;
        const k = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.CONTROLS, {position: new Vec2(center.x, center.y + 160), text: "K - Range Attack"});
        k.textColor = Color.WHITE;
        const esc = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.CONTROLS, {position: new Vec2(center.x, center.y + 200), text: "Esc - Pause Game"});
        esc.textColor = Color.WHITE;

        // Story layout
        const storyBack = <Label>this.add.uiElement(UIElementType.BUTTON, MainMenuName.STORY, {position: new Vec2(center.x - this.viewport.getHalfSize().x + 130, center.y - this.viewport.getHalfSize().y + 50), text: "Back"});
        storyBack.size.set(200, 50);
        storyBack.borderWidth = 2;
        storyBack.borderColor = Color.WHITE;
        storyBack.backgroundColor = new Color(34, 27, 48);
        storyBack.onClickEventId = MainMenuName.MENU;
        storyBack.textColor = Color.WHITE;

        const storyLabel = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.STORY, {position: new Vec2(center.x - 350, center.y - 200), text: "Story"});
        storyLabel.size.set(350, 50);
        storyLabel.borderWidth = 2;
        storyLabel.borderRadius = 0;
        storyLabel.borderColor = Color.WHITE;
        storyLabel.backgroundColor = new Color(34, 27, 48);
        storyLabel.textColor = Color.WHITE;

        const storyBG = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.STORY, {position: new Vec2(center.x, center.y + 50), text: ""});
        storyBG.size.set(350 * 3, 450);
        storyBG.borderWidth = 2;
        storyBG.borderRadius = 0;
        storyBG.borderColor = Color.WHITE;
        storyBG.backgroundColor = new Color(34, 27, 48);

        const storyText = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuName.STORY, {position: new Vec2(center.x, center.y - 50), text: "Story Placeholder Text"});
        storyText.textColor = Color.WHITE;

        this.receiver.subscribe(MainMenuName.START_GAME);
        this.receiver.subscribe(MainMenuName.LEVEL_SELECT);
        this.receiver.subscribe(MainMenuName.CONTROLS);
        this.receiver.subscribe(MainMenuName.STORY);
        this.receiver.subscribe(MainMenuName.MENU);
    }

    updateScene() {
        while(this.receiver.hasNextEvent()){
            this.handleEvent(this.receiver.getNextEvent());
        }
    }

    protected handleEvent(event: GameEvent): void {
        switch(event.type) {
            case MainMenuName.START_GAME: {
                this.emitter.fireEvent(inkooEvents.LEVEL_START);
                this.sceneManager.changeToScene(IP_Level1);
                
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