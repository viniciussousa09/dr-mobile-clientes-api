export const isAdult = (birthDateString: string): boolean => {
    const birthDate = new Date(birthDateString);
    const today = new Date();

    // impede datas futuras
    if (birthDate > today) return false;

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Se o mês atual for anterior ao mês de aniversário, ou se for o mesmomês mas o dia ainda não chegou, diminui 1 ano
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age >= 18;
};