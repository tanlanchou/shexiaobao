export enum UserStatus {
  normal = 1,
  wxUser = 2,
  disable = 3,
  noVerification = 4,
}

export enum WeChatErrorCode {
  InvalidCode = 40029,
  MinuteQuotaLimit = 45011,
  CodeBlocked = 40226,
  SystemError = -1,
}

export enum Flag {
  Expired = 1,
  NotExpired = 2,
}

export enum Status {
  Normal = 1,
  Deleted = 2,
}

export enum ProductInfoState {
  InTransit = 1,
  InStoreHouse = 2,
  OutStoreHouse = 3,
  InDamage = 4,
  InRepair = 5,
  InLock = 6,
}

export enum OrderState {
  normal = 1,
  cancel = 2,
  return = 3,
  review = 4
}

export const tokenMixin = `dsjioj@!J*@&(#JKHDUH&@)`;
