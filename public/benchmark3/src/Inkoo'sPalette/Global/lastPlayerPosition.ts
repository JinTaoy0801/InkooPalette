import Vec2 from "../../Wolfie2D/DataTypes/Vec2";

let lastPlayerPosition: Vec2 = Vec2.ZERO;

export const setLastPlayerPosition = (value:Vec2) => {
    lastPlayerPosition = new Vec2(value.x,value.y);
};

export const getLastPlayerPosition = () => {
    return lastPlayerPosition;
};