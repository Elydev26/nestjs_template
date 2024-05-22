import * as Joi from 'joi';
import { PhoneCountryCodeEnum } from '../enum/phoneCountryCodes.enum';
import { PhoneNumberSchema } from '../schema/phoneNumber.schema';
export const phoneNumberValidator = Joi.object({
  code: Joi.string()
    .trim()
    .valid(...Object.values(PhoneCountryCodeEnum))
    .required(),

  number: Joi.when('code', {
    is: PhoneCountryCodeEnum.Nigeria,
    then: Joi.string()
      .trim()
      .min(10)
      .max(10)
      .regex(/^[0-9+]{10}$/)
      .required(),
  })
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Afghanistan,
        then: Joi.string()
          .trim()
          .min(9)
          .max(9)
          .regex(/^[0-9+]{9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Albania,
        then: Joi.string()
          .trim()
          .min(3)
          .max(9)
          .regex(/^[0-9+]{3,9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Algeria,
        then: Joi.string()
          .trim()
          .min(8)
          .max(9)
          .regex(/^[0-9+]{8,9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Andorra,
        then: Joi.string()
          .trim()
          .min(6)
          .max(9)
          .regex(/^[0-9+]{6,9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Angola,
        then: Joi.string()
          .trim()
          .min(9)
          .max(9)
          .regex(/^[0-9+]{9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Argentina,
        then: Joi.string()
          .trim()
          .min(10)
          .max(10)
          .regex(/^[0-9+]{10}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Armenia,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Aruba,
        then: Joi.string()
          .trim()
          .min(7)
          .max(7)
          .regex(/^[0-9+]{7}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Australia,
        then: Joi.string()
          .trim()
          .min(5)
          .max(15)
          .regex(/^[0-9+]{5,15}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Austria,
        then: Joi.string()
          .trim()
          .min(4)
          .max(13)
          .regex(/^[0-9+]{4,13}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Azerbaijan,
        then: Joi.string()
          .trim()
          .min(8)
          .max(9)
          .regex(/^[0-9+]{8,9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Bahrain,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Bangladesh,
        then: Joi.string()
          .trim()
          .min(6)
          .max(10)
          .regex(/^[0-9+]{6,10}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Belarus,
        then: Joi.string()
          .trim()
          .min(9)
          .max(10)
          .regex(/^[0-9+]{9,10}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Belgium,
        then: Joi.string()
          .trim()
          .min(8)
          .max(9)
          .regex(/^[0-9+]{8,9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Belize,
        then: Joi.string()
          .trim()
          .min(7)
          .max(7)
          .regex(/^[0-9+]{7}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Benin,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Bhutan,
        then: Joi.string()
          .trim()
          .min(7)
          .max(8)
          .regex(/^[0-9+]{7,8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Bolivia,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.BosniaAndHerzegovina,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Botswana,
        then: Joi.string()
          .trim()
          .min(7)
          .max(8)
          .regex(/^[0-9+]{7,8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: Joi.string().valid(
          PhoneCountryCodeEnum.USA,
          PhoneCountryCodeEnum.Grenada,
          PhoneCountryCodeEnum.Guam,
          PhoneCountryCodeEnum.Jamaica,
          PhoneCountryCodeEnum.SaintKittsAndNevis,
          PhoneCountryCodeEnum.SaintVincentAndTheGrenadines,
          PhoneCountryCodeEnum.Anguilla,
          PhoneCountryCodeEnum.AntiguaAndBarbuda,
          PhoneCountryCodeEnum.Bermuda,
          PhoneCountryCodeEnum.Bahamas,
          PhoneCountryCodeEnum.Barbados,
          PhoneCountryCodeEnum.BritishVirginIslands,
          PhoneCountryCodeEnum.Canada,
          PhoneCountryCodeEnum.Dominica,
          PhoneCountryCodeEnum.DominicanRepublic,
          PhoneCountryCodeEnum.CaymanIslands,
          PhoneCountryCodeEnum.Montserrat,
          PhoneCountryCodeEnum.SaintLucia,
          PhoneCountryCodeEnum.TrinidadAndTobago,
          PhoneCountryCodeEnum.PuertoRico,
          PhoneCountryCodeEnum.TurksAndCaicosIslands,
          PhoneCountryCodeEnum.VirginIslandsUS,
        ),
        then: Joi.string()
          .trim()
          .min(7)
          .max(10)
          .regex(/^[0-9]{7,10}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Cyprus,
        then: Joi.string()
          .trim()
          .min(8)
          .max(10)
          .regex(/^[0-9+]{8,10}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Brazil,
        then: Joi.string()
          .trim()
          .min(10)
          .max(10)
          .regex(/^[0-9+]{10}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Brunei,
        then: Joi.string()
          .trim()
          .min(7)
          .max(7)
          .regex(/^[0-9+]{7}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Bulgaria,
        then: Joi.string()
          .trim()
          .min(7)
          .max(9)
          .regex(/^[0-9+]{7,9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.BurkinaFaso,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Burundi,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Cambodia,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Cameroon,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.CapeVerde,
        then: Joi.string()
          .trim()
          .min(7)
          .max(7)
          .regex(/^[0-9+]{7}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Chad,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Chile,
        then: Joi.string()
          .trim()
          .min(8)
          .max(9)
          .regex(/^[0-9+]{8,9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.China,
        then: Joi.string()
          .trim()
          .min(5)
          .max(12)
          .regex(/^[0-9+]{5,12}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Colombia,
        then: Joi.string()
          .trim()
          .min(8)
          .max(10)
          .regex(/^[0-9+]{8,10}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Congo,
        then: Joi.string()
          .trim()
          .min(5)
          .max(9)
          .regex(/^[0-9+]{5,9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.CookIslands,
        then: Joi.string()
          .trim()
          .min(5)
          .max(5)
          .regex(/^[0-9+]{5}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.CostaRica,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.CoteDIvoire,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Croatia,
        then: Joi.string()
          .trim()
          .min(8)
          .max(12)
          .regex(/^[0-9+]{8,12}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Cuba,
        then: Joi.string()
          .trim()
          .min(6)
          .max(8)
          .regex(/^[0-9+]{6,8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.CzechRepublic,
        then: Joi.string()
          .trim()
          .min(4)
          .max(12)
          .regex(/^[0-9+]{4,12}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Denmark,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Djibouti,
        then: Joi.string()
          .trim()
          .min(6)
          .max(6)
          .regex(/^[0-9+]{6}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Ecuador,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Egypt,
        then: Joi.string()
          .trim()
          .min(7)
          .max(9)
          .regex(/^[0-9+]{7,9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.ElSalvador,
        then: Joi.string()
          .trim()
          .min(7)
          .max(11)
          .regex(/^[0-9+]{7,11}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.EquatorialGuinea,
        then: Joi.string()
          .trim()
          .min(9)
          .max(9)
          .regex(/^[0-9+]{9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Estonia,
        then: Joi.string()
          .trim()
          .min(7)
          .max(10)
          .regex(/^[0-9+]{7,10}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Ethiopia,
        then: Joi.string()
          .trim()
          .min(9)
          .max(9)
          .regex(/^[0-9+]{9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.FalklandIslands,
        then: Joi.string()
          .trim()
          .min(5)
          .max(5)
          .regex(/^[0-9+]{5}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.FaroeIslands,
        then: Joi.string()
          .trim()
          .min(6)
          .max(6)
          .regex(/^[0-9+]{6}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.SouthAfrica,
        then: Joi.string()
          .trim()
          .min(9)
          .max(10)
          .regex(/^[0-9+]{9,10}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Gambia,
        then: Joi.string()
          .trim()
          .min(7)
          .max(7)
          .regex(/^[0-9+]{7}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.KyrgyzRepublic,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Laos,
        then: Joi.string()
          .trim()
          .min(8)
          .max(9)
          .regex(/^[0-9+]{8,9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Latvia,
        then: Joi.string()
          .trim()
          .min(7)
          .max(8)
          .regex(/^[0-9+]{7,8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Lebanon,
        then: Joi.string()
          .trim()
          .min(7)
          .max(7)
          .regex(/^[0-9+]{7}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Lesotho,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Liberia,
        then: Joi.string()
          .trim()
          .min(7)
          .max(7)
          .regex(/^[0-9+]{7}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Libya,
        then: Joi.string()
          .trim()
          .min(8)
          .max(9)
          .regex(/^[0-9+]{8,9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Liechtenstein,
        then: Joi.string()
          .trim()
          .min(7)
          .max(7)
          .regex(/^[0-9+]{7}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Lithuania,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Luxembourg,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Macau,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Macedonia,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Madagascar,
        then: Joi.string()
          .trim()
          .min(8)
          .max(10)
          .regex(/^[0-9+]{8,10}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Malawi,
        then: Joi.string()
          .trim()
          .min(7)
          .max(8)
          .regex(/^[0-9+]{7,8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Malaysia,
        then: Joi.string()
          .trim()
          .min(8)
          .max(9)
          .regex(/^[0-9+]{8,9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Maldives,
        then: Joi.string()
          .trim()
          .min(7)
          .max(7)
          .regex(/^[0-9+]{7}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Mali,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Malta,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Mauritania,
        then: Joi.string()
          .trim()
          .min(7)
          .max(7)
          .regex(/^[0-9+]{7}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Mauritius,
        then: Joi.string()
          .trim()
          .min(7)
          .max(7)
          .regex(/^[0-9+]{7}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Mexico,
        then: Joi.string()
          .trim()
          .min(8)
          .max(10)
          .regex(/^[0-9+]{8,10}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Moldova,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Monaco,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Mongolia,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Montenegro,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Morocco,
        then: Joi.string()
          .trim()
          .min(9)
          .max(9)
          .regex(/^[0-9+]{9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Mozambique,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Namibia,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Nepal,
        then: Joi.string()
          .trim()
          .min(8)
          .max(10)
          .regex(/^[0-9+]{8,10}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Netherlands,
        then: Joi.string()
          .trim()
          .min(9)
          .max(9)
          .regex(/^[0-9+]{9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.NetherlandsAntilles,
        then: Joi.string()
          .trim()
          .min(7)
          .max(10)
          .regex(/^[0-9+]{7,10}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.NewCaledonia,
        then: Joi.string()
          .trim()
          .min(6)
          .max(6)
          .regex(/^[0-9+]{6}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.NewZealand,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Nicaragua,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Niger,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Norway,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Oman,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Pakistan,
        then: Joi.string()
          .trim()
          .min(9)
          .max(9)
          .regex(/^[0-9+]{9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Palestine,
        then: Joi.string()
          .trim()
          .min(7)
          .max(7)
          .regex(/^[0-9+]{7}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Panama,
        then: Joi.string()
          .trim()
          .min(7)
          .max(7)
          .regex(/^[0-9+]{7}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.PapuaNewGuinea,
        then: Joi.string()
          .trim()
          .min(7)
          .max(7)
          .regex(/^[0-9+]{7}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Paraguay,
        then: Joi.string()
          .trim()
          .min(7)
          .max(8)
          .regex(/^[0-9+]{7,8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Peru,
        then: Joi.string()
          .trim()
          .min(9)
          .max(9)
          .regex(/^[0-9+]{9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Philippines,
        then: Joi.string()
          .trim()
          .min(7)
          .max(8)
          .regex(/^[0-9+]{7,8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Poland,
        then: Joi.string()
          .trim()
          .min(9)
          .max(9)
          .regex(/^[0-9+]{9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Portugal,
        then: Joi.string()
          .trim()
          .min(9)
          .max(11)
          .regex(/^[0-9+]{9,11}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Qatar,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Reunion,
        then: Joi.string()
          .trim()
          .min(7)
          .max(7)
          .regex(/^[0-9+]{7}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Romania,
        then: Joi.string()
          .trim()
          .min(9)
          .max(9)
          .regex(/^[0-9+]{9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Russia,
        then: Joi.string()
          .trim()
          .min(10)
          .max(10)
          .regex(/^[0-9+]{10}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Rwanda,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Turkmenistan,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/),
      }),
    )
    .concat(
      Joi.when('code', {
        is: Joi.string().valid(
          PhoneCountryCodeEnum.France,
          PhoneCountryCodeEnum.FrenchPolynesia,
          PhoneCountryCodeEnum.FrenchWestIndies,
        ),
        then: Joi.string()
          .trim()
          .min(6)
          .max(6)
          .regex(/^[0-9+]{6}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: Joi.string().valid(
          PhoneCountryCodeEnum.Georgia,
          PhoneCountryCodeEnum.Germany,
        ),
        then: Joi.string()
          .trim()
          .min(5)
          .max(14)
          .regex(/^[0-9+]{5,14}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: Joi.string().valid(PhoneCountryCodeEnum.Finland),
        then: Joi.string()
          .trim()
          .min(5)
          .max(12)
          .regex(/^[0-9+]{5,12}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: Joi.string().valid(PhoneCountryCodeEnum.Fiji),
        then: Joi.string()
          .trim()
          .min(7)
          .max(8)
          .regex(/^[0-9+]{7,8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: Joi.string().valid(PhoneCountryCodeEnum.Ghana),
        then: Joi.string()
          .trim()
          .min(9)
          .max(9)
          .regex(/^[0-9+]{9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: Joi.string().valid(PhoneCountryCodeEnum.Gabon),
        then: Joi.string()
          .trim()
          .min(6)
          .max(7)
          .regex(/^[0-9+]{6,7}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: Joi.string().valid(PhoneCountryCodeEnum.Finland),
        then: Joi.string()
          .trim()
          .min(5)
          .max(12)
          .regex(/^[0-9+]{5,12}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: Joi.string().valid(PhoneCountryCodeEnum.Gibraltar),
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: Joi.string().valid(PhoneCountryCodeEnum.Greece),
        then: Joi.string()
          .trim()
          .min(10)
          .max(10)
          .regex(/^[0-9+]{10}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: Joi.string().valid(PhoneCountryCodeEnum.Greenland),
        then: Joi.string()
          .trim()
          .min(6)
          .max(6)
          .regex(/^[0-9+]{6}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: Joi.string().valid(
          PhoneCountryCodeEnum.Guinea,
          PhoneCountryCodeEnum.Guatemala,
          PhoneCountryCodeEnum.Haiti,
          PhoneCountryCodeEnum.Honduras,
        ),
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9+]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: Joi.string().valid(
          PhoneCountryCodeEnum.Guyana,
          PhoneCountryCodeEnum.GuineaBissau,
        ),
        then: Joi.string()
          .trim()
          .min(7)
          .max(7)
          .regex(/^[0-9+]{7}$/)
          .required(),
      }),
    )

    .concat(
      Joi.when('code', {
        is: Joi.string().valid(PhoneCountryCodeEnum.HongKong),
        then: Joi.string()
          .trim()
          .min(4)
          .max(9)
          .regex(/^[0-9+]{4,9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: Joi.string().valid(PhoneCountryCodeEnum.Hungary),
        then: Joi.string()
          .trim()
          .min(8)
          .max(9)
          .regex(/^[0-9+]{8,9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: Joi.string().valid(PhoneCountryCodeEnum.Iceland),
        then: Joi.string()
          .trim()
          .min(7)
          .max(9)
          .regex(/^[0-9+]{7,9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: Joi.string().valid(PhoneCountryCodeEnum.India),
        then: Joi.string()
          .trim()
          .min(7)
          .max(10)
          .regex(/^[0-9+]{7,10}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: Joi.string().valid(PhoneCountryCodeEnum.Indonesia),
        then: Joi.string()
          .trim()
          .min(5)
          .max(10)
          .regex(/^[0-9+]{5,10}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: Joi.string().valid(PhoneCountryCodeEnum.Iran),
        then: Joi.string()
          .trim()
          .min(6)
          .max(10)
          .regex(/^[0-9+]{6,10}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: Joi.string().valid(PhoneCountryCodeEnum.Iraq),
        then: Joi.string()
          .trim()
          .min(8)
          .max(10)
          .regex(/^[0-9+]{8,10}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: Joi.string().valid(PhoneCountryCodeEnum.Ireland),
        then: Joi.string()
          .trim()
          .min(7)
          .max(11)
          .regex(/^[0-9+]{7,11}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: Joi.string().valid(PhoneCountryCodeEnum.Israel),
        then: Joi.string()
          .trim()
          .min(8)
          .max(9)
          .regex(/^[0-9+]{8,9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: Joi.string().valid(PhoneCountryCodeEnum.Italy),
        then: Joi.string()
          .trim()
          .min(5)
          .max(11)
          .regex(/^[0-9+]{5,11}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: Joi.string().valid(PhoneCountryCodeEnum.Japan),
        then: Joi.string()
          .trim()
          .min(5)
          .max(13)
          .regex(/^[0-9+]{5,13}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: Joi.string().valid(PhoneCountryCodeEnum.Jordan),
        then: Joi.string()
          .trim()
          .min(5)
          .max(9)
          .regex(/^[0-9+]{5,9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: Joi.string().valid(PhoneCountryCodeEnum.Kazakhstan),
        then: Joi.string()
          .trim()
          .min(10)
          .max(10)
          .regex(/^[0-9+]{10}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: Joi.string().valid(PhoneCountryCodeEnum.Kenya),
        then: Joi.string()
          .trim()
          .min(6)
          .max(10)
          .regex(/^[0-9+]{6,10}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: Joi.string().valid(PhoneCountryCodeEnum.Kuwait),
        then: Joi.string()
          .trim()
          .min(7)
          .max(8)
          .regex(/^[0-9+]{7,8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Tunisia,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Turkey,
        then: Joi.string()
          .trim()
          .min(10)
          .max(10)
          .regex(/^[0-9]{10}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Tonga,
        then: Joi.string()
          .trim()
          .min(5)
          .max(5)
          .regex(/^[0-9]{5}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Togo,
        then: Joi.string()
          .trim()
          .min(7)
          .max(8)
          .regex(/^[0-9]{7,8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.TimorLeste,
        then: Joi.string()
          .trim()
          .min(7)
          .max(8)
          .regex(/^[0-9]{7,8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Thailand,
        then: Joi.string()
          .trim()
          .min(8)
          .max(9)
          .regex(/^[0-9]{8,9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Tanzania,
        then: Joi.string()
          .trim()
          .min(9)
          .max(9)
          .regex(/^[0-9]{9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Tajikistan,
        then: Joi.string()
          .trim()
          .min(4)
          .max(9)
          .regex(/^[0-9]{4,9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Taiwan,
        then: Joi.string()
          .trim()
          .min(9)
          .max(9)
          .regex(/^[0-9]{9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Syria,
        then: Joi.string()
          .trim()
          .min(7)
          .max(7)
          .regex(/^[0-9]{7}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Switzerland,
        then: Joi.string()
          .trim()
          .min(9)
          .max(9)
          .regex(/^[0-9]{9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Sweden,
        then: Joi.string()
          .trim()
          .min(7)
          .max(13)
          .regex(/^[0-9]{7,13}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Swaziland,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Suriname,
        then: Joi.string()
          .trim()
          .min(6)
          .max(7)
          .regex(/^[0-9]{6,7}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Sudan,
        then: Joi.string()
          .trim()
          .min(9)
          .max(9)
          .regex(/^[0-9]{9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.SriLanka,
        then: Joi.string()
          .trim()
          .min(7)
          .max(7)
          .regex(/^[0-9]{7}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Spain,
        then: Joi.string()
          .trim()
          .min(9)
          .max(9)
          .regex(/^[0-9]{9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.SouthKorea,
        then: Joi.string()
          .trim()
          .min(7)
          .max(8)
          .regex(/^[0-9]{7,8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Somalia,
        then: Joi.string()
          .trim()
          .min(8)
          .max(9)
          .regex(/^[0-9]{8,9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Slovenia,
        then: Joi.string()
          .trim()
          .min(9)
          .max(9)
          .regex(/^[0-9]{9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Slovakia,
        then: Joi.string()
          .trim()
          .min(9)
          .max(9)
          .regex(/^[0-9]{9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Singapore,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.SierraLeone,
        then: Joi.string()
          .trim()
          .min(8)
          .max(8)
          .regex(/^[0-9]{8}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Seychelles,
        then: Joi.string()
          .trim()
          .min(7)
          .max(7)
          .regex(/^[0-9]{7}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Serbia,
        then: Joi.string()
          .trim()
          .min(7)
          .max(7)
          .regex(/^[0-9]{7}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Senegal,
        then: Joi.string()
          .trim()
          .min(9)
          .max(9)
          .regex(/^[0-9]{9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.SaudiArabia,
        then: Joi.string()
          .trim()
          .min(9)
          .max(9)
          .regex(/^[0-9]{9}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.SanMarino,
        then: Joi.string()
          .trim()
          .min(6)
          .max(10)
          .regex(/^[0-9]{6,10}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Samoa,
        then: Joi.string()
          .trim()
          .min(5)
          .max(10)
          .regex(/^[0-9]{5,10}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.SaintPierreAndMiquelon,
        then: Joi.string()
          .trim()
          .min(6)
          .max(6)
          .regex(/^[0-9]{6}$/)
          .required(),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Uganda,
        then: Joi.string()
          .trim()
          .min(9)
          .max(9)
          .regex(/^[0-9+]{9}$/),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Ukraine,
        then: Joi.string()
          .trim()
          .min(9)
          .max(9)
          .regex(/^[0-9+]{9}$/),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.UnitedArabEmirates,
        then: Joi.string()
          .trim()
          .min(8)
          .max(9)
          .regex(/^[0-9+]{8,9}$/),
      }),
    )
    .concat(
      Joi.when('code', {
        is: Joi.string().valid(
          PhoneCountryCodeEnum.UnitedKingdom,
          PhoneCountryCodeEnum.Guernsey,
        ),
        then: Joi.string()
          .trim()
          .min(7)
          .max(10)
          .regex(/^[0-9]{7,10}$/),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Uruguay,
        then: Joi.string()
          .trim()
          .min(4)
          .max(11)
          .regex(/^[0-9+]{4,11}$/),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Uzbekistan,
        then: Joi.string()
          .trim()
          .min(9)
          .max(9)
          .regex(/^[0-9+]{9}$/),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Venezuela,
        then: Joi.string()
          .trim()
          .min(10)
          .max(10)
          .regex(/^[0-9+]{10}$/),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Vietnam,
        then: Joi.string()
          .trim()
          .min(7)
          .max(10)
          .regex(/^[0-9+]{7,10}$/),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Yemen,
        then: Joi.string()
          .trim()
          .min(6)
          .max(9)
          .regex(/^[0-9+]{6,9}$/),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Zambia,
        then: Joi.string()
          .trim()
          .min(9)
          .max(9)
          .regex(/^[0-9+]{9}$/),
      }),
    )
    .concat(
      Joi.when('code', {
        is: PhoneCountryCodeEnum.Zimbabwe,
        then: Joi.string()
          .trim()
          .min(5)
          .max(10)
          .regex(/^[0-9+]{5,10}$/),
      }),
    ),

  local: Joi.string().trim(),
}).custom((value: PhoneNumberSchema) => {
  switch (value.code) {
    case PhoneCountryCodeEnum.Afghanistan:
    case PhoneCountryCodeEnum.Albania:
    case PhoneCountryCodeEnum.Algeria:
    case PhoneCountryCodeEnum.Angola:
    case PhoneCountryCodeEnum.Argentina:
    case PhoneCountryCodeEnum.Armenia:
    case PhoneCountryCodeEnum.Australia:
    case PhoneCountryCodeEnum.Austria:
    case PhoneCountryCodeEnum.Azerbaijan:
    case PhoneCountryCodeEnum.Bangladesh:
    case PhoneCountryCodeEnum.Belgium:
    case PhoneCountryCodeEnum.Bolivia:
    case PhoneCountryCodeEnum.BosniaAndHerzegovina:
    case PhoneCountryCodeEnum.SouthAfrica:
    case PhoneCountryCodeEnum.SaudiArabia:
    case PhoneCountryCodeEnum.SierraLeone:
    case PhoneCountryCodeEnum.Slovakia:
    case PhoneCountryCodeEnum.Slovenia:
    case PhoneCountryCodeEnum.Sudan:
    case PhoneCountryCodeEnum.Suriname:
    case PhoneCountryCodeEnum.Sweden:
    case PhoneCountryCodeEnum.Switzerland:
    case PhoneCountryCodeEnum.Syria:
    case PhoneCountryCodeEnum.Taiwan:
    case PhoneCountryCodeEnum.Tanzania:
    case PhoneCountryCodeEnum.Thailand:
    case PhoneCountryCodeEnum.Nigeria:
    case PhoneCountryCodeEnum.Uganda:
    case PhoneCountryCodeEnum.Ukraine:
    case PhoneCountryCodeEnum.UnitedArabEmirates:
    case PhoneCountryCodeEnum.Venezuela:
    case PhoneCountryCodeEnum.Vietnam:
    case PhoneCountryCodeEnum.UnitedKingdom:
    case PhoneCountryCodeEnum.Uruguay:
    case PhoneCountryCodeEnum.Yemen:
    case PhoneCountryCodeEnum.Zambia:
    case PhoneCountryCodeEnum.KyrgyzRepublic:
    case PhoneCountryCodeEnum.Laos:
    case PhoneCountryCodeEnum.Lebanon:
    case PhoneCountryCodeEnum.Zimbabwe:
    case PhoneCountryCodeEnum.Libya:
    case PhoneCountryCodeEnum.Lithuania:
    case PhoneCountryCodeEnum.Macau:
    case PhoneCountryCodeEnum.Moldova:
    case PhoneCountryCodeEnum.Mongolia:
    case PhoneCountryCodeEnum.Macedonia:
    case PhoneCountryCodeEnum.Montenegro:
    case PhoneCountryCodeEnum.Namibia:
    case PhoneCountryCodeEnum.Nepal:
    case PhoneCountryCodeEnum.NewZealand:
    case PhoneCountryCodeEnum.Netherlands:
    case PhoneCountryCodeEnum.Paraguay:
    case PhoneCountryCodeEnum.Peru:
    case PhoneCountryCodeEnum.Romania:
    case PhoneCountryCodeEnum.Philippines:
    case PhoneCountryCodeEnum.Poland:
    case PhoneCountryCodeEnum.Morocco:
    case PhoneCountryCodeEnum.Pakistan:
    case PhoneCountryCodeEnum.Brazil:
    case PhoneCountryCodeEnum.Brunei:
    case PhoneCountryCodeEnum.Bulgaria:
    case PhoneCountryCodeEnum.Congo:
    case PhoneCountryCodeEnum.CookIslands:
    case PhoneCountryCodeEnum.CostaRica:
    case PhoneCountryCodeEnum.CoteDIvoire:
    case PhoneCountryCodeEnum.Ecuador:
    case PhoneCountryCodeEnum.ElSalvador:
    case PhoneCountryCodeEnum.EquatorialGuinea:
    case PhoneCountryCodeEnum.Estonia:
    case PhoneCountryCodeEnum.Ethiopia:
    case PhoneCountryCodeEnum.Egypt:
    case PhoneCountryCodeEnum.Croatia:
    case PhoneCountryCodeEnum.Cuba:
    case PhoneCountryCodeEnum.BurkinaFaso:
    case PhoneCountryCodeEnum.Burundi:
    case PhoneCountryCodeEnum.Cambodia:
    case PhoneCountryCodeEnum.China:
    case PhoneCountryCodeEnum.Cameroon:
    case PhoneCountryCodeEnum.CapeVerde:
      value.local = `0${value.number}`;
      break;

    case PhoneCountryCodeEnum.Belarus:
    case PhoneCountryCodeEnum.Turkmenistan:
    case PhoneCountryCodeEnum.Russia:
    case PhoneCountryCodeEnum.Uzbekistan:
      value.local = `8${value.number}`;
      break;

    case PhoneCountryCodeEnum.Jamaica:
      value.local = `876${value.number}`;
      break;

    case PhoneCountryCodeEnum.BritishVirginIslands:
    case PhoneCountryCodeEnum.CaymanIslands:
    case PhoneCountryCodeEnum.CzechRepublic:
    case PhoneCountryCodeEnum.Denmark:
    case PhoneCountryCodeEnum.Djibouti:
    case PhoneCountryCodeEnum.Dominica:
    case PhoneCountryCodeEnum.DominicanRepublic:
    case PhoneCountryCodeEnum.USA:
    case PhoneCountryCodeEnum.Canada:
    case PhoneCountryCodeEnum.Montserrat:
    case PhoneCountryCodeEnum.SaintLucia:
    case PhoneCountryCodeEnum.TrinidadAndTobago:
    case PhoneCountryCodeEnum.PuertoRico:
    case PhoneCountryCodeEnum.TurksAndCaicosIslands:
    case PhoneCountryCodeEnum.VirginIslandsUS:
      value.local = `1${value.number}`;
      break;

    case PhoneCountryCodeEnum.Chad:
    case PhoneCountryCodeEnum.Chile:
      //for Chile
      value.local = `1YZ${value.number}`;
      break;

    case PhoneCountryCodeEnum.Colombia:
      //for Colombia
      value.local = `09${value.number}`;
      break;

    case PhoneCountryCodeEnum.FalklandIslands:
    case PhoneCountryCodeEnum.FaroeIslands:
    case PhoneCountryCodeEnum.Mexico:
      value.local = `01${value.number}`;
      break;

    default:
      value.local = value.number;
      break;
    // TODO: AS THE COMPANY EXPANDS TO OTHER COUNTRIES ADD RULES HERE, TO ENSURE THAT WE HAVE THE RIGHT VALUE FOR LOCAL. phoneNumber.local can be used alongside email to login to the platform
  }

  return value;
});
