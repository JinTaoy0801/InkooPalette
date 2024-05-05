var isObtained: boolean = false;

export const setDash = (value: boolean) => {
    isObtained = value;
};

export const getDash = () => {
    return isObtained;
};