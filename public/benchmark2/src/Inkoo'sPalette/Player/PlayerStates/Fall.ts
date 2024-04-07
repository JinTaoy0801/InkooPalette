
import PlayerState from "./PlayerState";

export default class Fall extends PlayerState{
    onEnter(options: Record<string, any>): void { 
        if (this.parent.velocity.y > 0) {
            this.parent.velocity.y = 0;
        }
    }

    onExit(): Record<string, any> {
        return {};
    }

}
