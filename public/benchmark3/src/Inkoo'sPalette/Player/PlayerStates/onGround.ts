
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
			if (direction.x) {
				this.owner.tweens.play("tilt_right");
			}
		}
		
		if (!this.owner.onGround) this.finished(PlayerStates.FALL);

		if (Input.isJustPressed("attack") && !this.isAttacking()) {
			// this.finished(PlayerStates.ATTACK);
			this.owner.animation.playIfNotAlready("ATTACK_RIGHT", false);
			this.attack = this.owner.getScene().add.animatedSprite("arm_right", Layers.Main);
			this.attack.scale.set(2, 1.5);

			const HB_options = {
				actor: this.owner,
				sprite: this.attack,
				attack_name: "ARM_RIGHT",
				eventType: "Ally",
				center: new Vec2(0, 0),
				halfSize: new Vec2(48, 10.5),
				invertX: this.owner.invertX,
				offset: new Vec2(52, 8)
			}
			let hitbox = new Hitbox(HB_options);

		}
	}

	onExit(): Record<string, any> {
		// this.owner.animation.stop();
		return {};
	}
}