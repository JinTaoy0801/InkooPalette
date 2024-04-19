// import GoblinState from "./GoblinState";
// import { GoblinStates } from "../GoblinController";
// import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";

// export default class Attacking extends GoblinState{
//     patrolArea = new Vec2(this.parent.patrolArea.leftBound,this.parent.patrolArea.rightBound);
//     onEnter(options: Record<string, any>): void {
//         this.canAttack = true;
//     }
//     update(deltaT: number): void {
//         super.update(deltaT);
//         if(!this.playerInPatrol(this.patrolArea)){
//             this.canAttack = false;
//         }
//         if(!this.canAttack)
        
//     }
//     onExit(): Record<string, any> {
//         return {};
//     }

// }