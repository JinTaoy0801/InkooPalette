import Vec2 from "../../Wolfie2D/DataTypes/Vec2";

var lastPlayerPosition: Vec2 = Vec2.ZERO;

export const setLastPlayerPosition = (value: Vec2) => {
    const snappedPosition = new Vec2(
        Math.floor(value.x / 32) * 32,
        (Math.floor(value.y / 32)) * 32
    );
    lastPlayerPosition = snappedPosition;
};

export const getLastPlayerPosition = () => {
    return lastPlayerPosition;
};