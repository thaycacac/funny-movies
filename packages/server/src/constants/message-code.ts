export enum EnumMessageCode {
  M001 = 'M001',
  M002 = 'M002',
  M003 = 'M003',
  M004 = 'M004',
  M005 = 'M005',
  M006 = 'M006',
  M007 = 'M007',
  M008 = 'M008',
  M009 = 'M009',
  M010 = 'M010',
}

export const MESSAGE_CODE = {
  [EnumMessageCode.M001]: 'Email already exists',
  [EnumMessageCode.M002]: 'Account not exist or wrong password',
  [EnumMessageCode.M003]: 'URL invalid',
  [EnumMessageCode.M004]: 'This video already exists on the system',
  [EnumMessageCode.M005]: '',
  [EnumMessageCode.M006]: '',
  [EnumMessageCode.M007]: '',
  [EnumMessageCode.M008]: '',
  [EnumMessageCode.M009]: '',
  [EnumMessageCode.M010]: '',
};
