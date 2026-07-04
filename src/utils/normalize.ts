export const extractNumbers = (str: string): string => {
    return str.replace(/\D/g, '');
};