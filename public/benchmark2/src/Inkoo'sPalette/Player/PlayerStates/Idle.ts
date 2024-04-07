import Input from "../../../Wolfie2D/Input/Input";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import InkooAnimatedSprite from "../../Nodes/InkooAnimatedSprite";
import { PlayerStates, PlayerAnimations } from "../PlayerController";
import OnGround from "./onGround";

export default class Idle extends OnGround{
    owner : InkooAnimatedSprite;
    onEnter(options: Record<string, any>): void {
		this.parent.speed = this.parent.MIN_SPEED;
	}

}