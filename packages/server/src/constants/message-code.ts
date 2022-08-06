export enum EnumMessageCode {
  M001 = 'M001',
  M002 = 'M002',
  M003 = 'M003',
}

export const MESSAGE_CODE = {
  [EnumMessageCode.M001]: 'Email already exists',
  [EnumMessageCode.M002]: 'Account not exist or wrong password',
  [EnumMessageCode.M003]: 'URL invalid',
};
