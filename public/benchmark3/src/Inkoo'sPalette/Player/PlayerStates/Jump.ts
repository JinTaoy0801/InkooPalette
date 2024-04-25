
import { PlayerStates } from "../PlayerController";
import InAir from "./InAir";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Input from "../../../Wolfie2D/Input/Input";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import AABB from "../../../Wolfie2D/DataTypes/Shapes/AABB";
import { setLastPlayerPosition } from "../../Global/lastPlayerPosition";
export default class Jump extends InAir{
    owner: AnimatedSprite;
    startingHeight = 0;

    onEnter(options: Record<string, any>): void {
        //this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "jump", loop: false, holdReference: false});
        this.startingHeight = this.owner.position.y;
        this.parent.velocity.y = -215;
        this.owner.setCollisionShape(new AABB(new Vec2(0, 0), new Vec2(12, 16)));
        this.owner.colliderOffset.set(0, 0);
        setLastPlayerPosition(this.owner.position);
    }

    update(deltaT: number): void {
        super.update(deltaT);

        if (!this.isAttacking())
            this.owner.animation.playIfNotAlready("JUMP", true);
        
        if (this.owner.onCeiling) {
            this.parent.velocity.y = 0;
        }

        if (this.parent.velocity.y >= 0) {
			this.finished(PlayerStates.FALL);
		}

        if (Input.isPressed("jump") && !Input.isJustPressed("jump")) {
            if (this.startingHeight-this.owner.position.y <= 24) {
                this.parent.velocity.y -= 70;
            }
        }
	}

	onExit(): Record<string, any> {
		this.owner.setCollisionShape(new AABB(new Vec2(0, 0), new Vec2(12,8)));
        this.owner.colliderOffset.set(0, 10.5);
        if (!this.isAttacking())
            this.owner.animation.stop();
            this.owner.animation.play("STOP_IN_AIR", false);
		return {};
	}
}