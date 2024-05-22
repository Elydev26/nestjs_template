import { AccountStatusEnum } from "src/utils/enum/accountStatus.enum";
import { RoleTypeEnum } from "src/utils/enum/role.enum";


export class DeviceTokenDto {
  serialNumber: string;
}

export class UserTokenDto {
  role: RoleTypeEnum;
  id: string;
  accountStatus: AccountStatusEnum;
}

export class UserIdDto {
  id: string;
}
