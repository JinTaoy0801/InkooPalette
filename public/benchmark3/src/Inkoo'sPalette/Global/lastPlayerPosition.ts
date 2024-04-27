import Vec2 from "../../Wolfie2D/DataTypes/Vec2";

var lastPlayerPosition: Vec2 = Vec2.ZERO;
var snappedPosition:Vec2 = Vec2.ZERO ;
export const setLastPlayerPosition = (value: Vec2, inverted:boolean) => {
    if(!inverted){
        snappedPosition = new Vec2(
            (Math.floor(value.x / 32) - 0.5)  * 32,
            (Math.floor(value.y / 32)) * 32
        );
    } else {
        snappedPosition = new Vec2(
            (Math.ceil(value.x / 32)+0.5)  * 32,
            (Math.floor(value.y / 32)) * 32
        );
    }
    lastPlayerPosition = snappedPosition;
};

export const getLastPlayerPosition = () => {
    return lastPlayerPosition;
};