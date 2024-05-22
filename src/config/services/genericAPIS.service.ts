import { Injectable } from '@nestjs/common';
import { AccountStatusEnum } from 'src/utils/enum/accountStatus.enum';
import { CountryEnum } from 'src/utils/enum/country.enum';
import { Country } from 'src/utils/enum/countryCode.enum';
import { Currency } from 'src/utils/enum/currency.enum';
import { PhoneCountryCodeEnum } from 'src/utils/enum/phoneCountryCodes.enum';

@Injectable()
export class GenericAPIsService {
  getAllEnumsValues() {
    return {
      accountStatusEnum: Object.values(AccountStatusEnum),
      countryCodeAbvENum: Object.values(CountryEnum),
      currency: Object.values(Currency),
      countryEnum: Object.values(Country),
      phoneCountryCodeEnum: Object.values(PhoneCountryCodeEnum),
    };
  }
}
