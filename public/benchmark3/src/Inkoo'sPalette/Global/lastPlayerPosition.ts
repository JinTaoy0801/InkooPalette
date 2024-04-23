import Vec2 from "../../Wolfie2D/DataTypes/Vec2";

var lastPlayerPosition: Vec2 = Vec2.ZERO;

export const setLastPlayerPosition = (value: Vec2) => {
    // Set value.x to 0 if it's less than 0
    const newX = Math.max(64, value.x);
    lastPlayerPosition = new Vec2(newX, value.y);
};

export const getLastPlayerPosition = () => {
    return lastPlayerPosition;
};