var isObtained: boolean = false;

export const setDoubleJump = (value: boolean) => {
    isObtained = value;
};

export const getDoubleJump = () => {
    return isObtained;
};