
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Input from "../../../Wolfie2D/Input/Input";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Sprite from "../../../Wolfie2D/Nodes/Sprites/Sprite";
import MathUtils from "../../../Wolfie2D/Utils/MathUtils";
import { PlayerStates } from "../PlayerController";
import Idle from "./Idle";
import PlayerState from "./PlayerState";
import { Layers } from "../../scenes/IP_Level";
import Hitbox from "../../Hitbox/Hitbox";
import AABB from "../../../Wolfie2D/DataTypes/Shapes/AABB";

export default class OnGround extends PlayerState {
	owner: AnimatedSprite;
	attack: AnimatedSprite;
	onEnter(options: Record<string, any>): void {}

	update(deltaT: number): void {
		if(this.parent.velocity.y > 0) {
			this.parent.velocity.y = 0;
		}
		super.update(deltaT);

		let direction = this.getInputDirection();

		if(direction.x !== 0) {
			(<Sprite>this.owner).invertX = MathUtils.sign(direction.x) < 0;
		}

		if(Input.isJustPressed("jump")){
			// console.log('ran');
			this.finished(PlayerStates.JUMP);
			if (direction.x && !this.isAttacking()) {
				this.owner.tweens.play("tilt_right");
			}
		}
		
		if (!this.owner.onGround) this.finished(PlayerStates.FALL);

		if (Input.isJustPressed("attack") && !this.isAttacking()) {
			var attack_name;
			var halfSize;
			var offset;
			var shape = "AABB";
			if (Input.isKeyPressed('w')) {
				this.owner.animation.playIfNotAlready("IDLE_ATTACK_UP", false);
				attack_name = "ATTACK_UP";
				halfSize = new Vec2(18, 52);
				offset = new Vec2(0, -54);
				this.attack = this.owner.getScene().add.animatedSprite(attack_name, Layers.Main);
				this.attack.scale.set(1.5, 1.5);
			}
			else {
				this.owner.animation.playIfNotAlready("ATTACK_RIGHT", false);
				attack_name = "ARM_RIGHT";
				halfSize = new Vec2(48, 10.5);
				offset = new Vec2(52, 8);
				this.attack = this.owner.getScene().add.animatedSprite(attack_name, Layers.Main);
				this.attack.scale.set(2, 1.5);
			}

			const HB_options = {
				actor: this.owner,
				sprite: this.attack,
				attack_name: attack_name,
				eventType: "Ally",
				center: new Vec2(0, 0),
				halfSize: halfSize,
				invertX: this.owner.invertX,
				offset: offset,	
				shape: shape
			}
			let hitbox = new Hitbox(HB_options);
		}
	}

	onExit(): Record<string, any> {
		// this.owner.animation.stop();
		return {};
	}
}