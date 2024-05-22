import * as Joi from 'joi';

export const geospatialValidator = Joi.object({
  radius: Joi.number(),
  longitude: Joi.when('radius', {
    is: Joi.exist(),
    then: Joi.number().min(-180).max(180).required(),
  }),
  latitude: Joi.when('radius', {
    is: Joi.exist(),
    then: Joi.number().min(-90).max(90).required(),
  }),
})
  /** enforce that if any of the fields is provided, all of them are provided */
  .and('latitude', 'longitude', 'radius')
  .custom(
    (
      value: { longitude: number; latitude: number; radius: number },
      helpers,
    ) => {
      if (!value.latitude || !value.longitude || !value.radius) {
        value.latitude = null;
        value.longitude = null;
        value.radius = null;
        return value;
      }
      /** the validation on top already ensures that the values don't go beyond the required */
      const longPattern = /^([\d{+,-}]{1,})(.)([\d]{4,})$/;
      const latPattern = /^([\d{+,-}]{1,})(.)([\d]{4,})$/;
      if (!latPattern.test(`${value.latitude}`)) {
        return helpers.message({ '*': 'please provide a valid latitude' });
      }
      if (!longPattern.test(`${value.longitude}`)) {
        return helpers.message({
          '*': 'please provide a valid longitude ',
        });
      }
      return value;
    },
  );
