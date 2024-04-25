import Big_GoldlemState from "./Big_GoldlemState";

export default class InactiveIdle extends Big_GoldlemState {
    onEnter(options: Record<string, any>): void {
    }
    
    update(deltaT: number): void {
        super.update(deltaT);
        this.owner.animation.playIfNotAlready("INACTIVE_IDLE", true);
    }
    
    onExit(): Record<string, any> {
        this.owner.animation.stop();
        return {};
    }
}