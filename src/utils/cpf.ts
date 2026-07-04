import { extractNumbers } from './normalize';

export const isValidCPF = (cpf: string): boolean => {
  const cleanCpf = extractNumbers(cpf);
  
  
  console.log(`\n[DEBUG CPF] Recebido: '${cpf}' | Limpo: '${cleanCpf}' | Tamanho: ${cleanCpf.length}`);

  if (cleanCpf.length !== 11) {
    console.log(`[DEBUG CPF] Falhou: Tamanho incorreto.`);
    return false;
  }

  if (/^(\d)\1+$/.test(cleanCpf)) {
    console.log(`[DEBUG CPF] Falhou: Todos os números são iguais.`);
    return false;
  }

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanCpf.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCpf.substring(9, 10))) {
    console.log(`[DEBUG CPF] Falhou: Primeiro dígito verificador matemático falhou.`);
    return false;
  }

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanCpf.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCpf.substring(10, 11))) {
    console.log(`[DEBUG CPF] Falhou: Segundo dígito verificador matemático falhou.`);
    return false;
  }

  console.log(`[DEBUG CPF] Sucesso: CPF validado!`);
  return true;
};