import Input from "../../../Wolfie2D/Input/Input";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Sprite from "../../../Wolfie2D/Nodes/Sprites/Sprite";
import MathUtils from "../../../Wolfie2D/Utils/MathUtils";
import { PlayerStates } from "../PlayerController";
import PlayerState from "./PlayerState";
import { Layers } from "../../scenes/IP_Level";
import Hitbox from "../../Hitbox/Hitbox";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";

export default abstract class InAir extends PlayerState {
    owner: AnimatedSprite;

    update(deltaT: number): void {
        super.update(deltaT);

        let dir = this.getInputDirection();

		if(dir.x !== 0) {
			(<Sprite>this.owner).invertX = MathUtils.sign(dir.x) < 0;
		}
        
		this.parent.velocity.x += dir.x * this.parent.speed/3.5 - 0.3*this.parent.velocity.x;

		this.owner.move(this.parent.velocity.scaled(deltaT));

        if (Input.isJustPressed("attack") && !this.isAttacking()) {
			// this.finished(PlayerStates.ATTACK);
			this.owner.animation.playIfNotAlready("JUMP_ATTACK", false);
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
				offset: new Vec2(52, 0)
			}
			let hitbox = new Hitbox(HB_options);

		}
    }
}