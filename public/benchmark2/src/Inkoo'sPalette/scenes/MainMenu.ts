import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import IP_Level1 from "./IP_Level1";

export default class MainMenu extends Scene {

    animatedSprite: AnimatedSprite;

    loadScene(): void {
        // Load the menu song
    }

    startScene(): void {
        this.addUILayer("Main");

        // Center the viewport
        let size = this.viewport.getHalfSize();
        this.viewport.setFocus(size);

        this.viewport.setZoomLevel(1);

        // Create a play button
        let playBtn = this.createButton("Play Game", new Vec2(size.x, size.y + 100));
        let mapSelect = this.createButton("Map", new Vec2(size.x, size.y + 100));


        // When the play button is clicked, go to the next scene
        playBtn.onClick = () => {
            this.sceneManager.changeToScene(IP_Level1);
        }
    }

    private createButton(text: String, pos: Vec2): Button {
        let btn = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", {position: pos, text: text});
        btn.backgroundColor = Color.TRANSPARENT;
        btn.borderColor = Color.WHITE;
        btn.borderRadius = 0;
        btn.setPadding(new Vec2(50, 10));
        btn.font = "PixelSimple";
        return btn;
    }

    unloadScene(): void {
        // The scene is being destroyed, so we can stop playing the song
    }
}

