import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import IP_Level from "../scenes/IP_Level";

export default class InkooAnimatedSprite extends AnimatedSprite {

    protected scene: IP_Level;
    protected _health: number;
    protected Max_Health: number;
    

    public setScene(scene: IP_Level): void { this.scene = scene; }
    public getScene(): IP_Level { return this.scene; }
}