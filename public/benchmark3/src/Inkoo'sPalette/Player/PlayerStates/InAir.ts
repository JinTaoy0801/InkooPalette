import Input from "../../../Wolfie2D/Input/Input";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Sprite from "../../../Wolfie2D/Nodes/Sprites/Sprite";
import MathUtils from "../../../Wolfie2D/Utils/MathUtils";
import { PlayerStates } from "../PlayerController";
import PlayerState from "./PlayerState";
import { Layers } from "../../scenes/IP_Level";
import Hitbox from "../../Hitbox/Hitbox";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Timer from "../../../Wolfie2D/Timing/Timer";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import { inkooEvents } from "../../inkooEvents";
import { getDoubleJump } from "../../Global/doubleJump";

export default abstract class InAir extends PlayerState {
    owner: AnimatedSprite;
	jumpCount: number;

    update(deltaT: number): void {
        super.update(deltaT);

        let dir = this.getInputDirection();

		if(dir.x !== 0) {
			(<Sprite>this.owner).invertX = MathUtils.sign(dir.x) < 0;
		}
        
		this.parent.velocity.x += dir.x * this.parent.speed/3.5 - 0.3*this.parent.velocity.x;

		this.owner.move(this.parent.velocity.scaled(deltaT));

        if (Input.isJustPressed("attack") && !this.isAttacking()) {
			this.emitter.fireEvent(inkooEvents.PLAY_SOUND, { key: "attack", loop: false, holdReference: false });
			var attack_name;
			var halfSize;
			var offset;
			var shape;
			if (Input.isKeyPressed('w') || Input.isKeyPressed('s')) {
				this.owner.animation.playIfNotAlready("SPIN_ATTACK", false);
				attack_name = "SPIN_ATTACK";
				halfSize = 42;
				offset = Vec2.ZERO;
				this.attack = this.owner.getScene().add.animatedSprite(attack_name, Layers.Main);
				this.attack.scale.set(1.75, 1.75);
				shape = "circle";
			}
			else {
				this.owner.animation.playIfNotAlready("JUMP_ATTACK", false);
				attack_name = "ARM_RIGHT"
				this.attack = this.owner.getScene().add.animatedSprite(attack_name, Layers.Main);
				halfSize = new Vec2(48, 10.5);
				offset = new Vec2(52, -4);
				this.attack.scale.set(2, 1.5);
				shape = "AABB";
			}

			const HB_options = {
				actor: this.owner,
				sprite: this.attack,
				attack_name: attack_name,
				eventType: "playerattack",
				center: new Vec2(0, 0),
				halfSize: halfSize,
				invertX: this.owner.invertX,
				offset: offset,
				shape: shape,
				inair: true,
				colliderOffset: new Vec2(0, 0),
            	delay: new Timer(0)
			}
			let hitbox = new Hitbox(HB_options, "playerattack");
		}
		if(getDoubleJump()){
			if (Input.isKeyJustPressed("space") && this.jumpCount<1) {
				this.emitter.fireEvent(inkooEvents.PLAY_SOUND, { key: "double_jump", loop: false, holdReference: false });
				console.log('double jump?????');
				this.parent.velocity.y = -450;
				this.jumpCount++;
			}
		}

    }
	 
	handleInput(event: GameEvent): void {
		if (event.type == "POGOTIME") {
			if (Input.isKeyPressed('w') || Input.isKeyPressed('s')) {
				this.parent.velocity.y = -500;
			}
		} else if (event.type == "TRAMPOLINE"){
			//this.emitter.fireEvent(inkooEvents.PLAY_SOUND, { key: "double_jump", loop: false, holdReference: false });
			this.parent.velocity.y = -500;
		}
	}
}