import React from 'react';
import { Grid } from '@components/Layout/Grid';
import { Button } from '@components/Form/Button';
import { Input } from '@components/Form/Input';
import { HelperText } from '@components/Form/HelperText';
import { Typography } from '@components/DataDisplay/Typography';
import { useForm } from '@hooks/useForm';
import { resetPasswordSchema } from '@utils/yupSchemas';

export const Form = (): JSX.Element => {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isValidForm,
    isSubmitting,
  } = useForm({
    initialValues: {
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: resetPasswordSchema,
    onSubmit: (values, helpers) => {
      console.log(values);
    },
  });

  return (
    <div>
      <Typography as='h3' white>
        Crea una nueva contraseña
      </Typography>
      <Typography margin='12px 0 24px 0'>
        Su nueva contraseña debe ser diferente de las contraseñas de uso
        anterior
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid cols='1' gap={1.5}>
          <div>
            <Input
              placeholder='Tu nueva contraseña'
              fullWidth
              name='password'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              type='password'
              showPasswordStrengthBar
            />
            {errors.password && (
              <HelperText error>{errors.password}</HelperText>
            )}
          </div>
          <div>
            <Input
              placeholder='Verifica tu contraseña'
              fullWidth
              name='passwordConfirmation'
              value={values.passwordConfirmation}
              onChange={handleChange}
              onBlur={handleBlur}
              type='password'
            />
            {errors.passwordConfirmation && (
              <HelperText error>{errors.passwordConfirmation}</HelperText>
            )}
          </div>
          <Button
            primary
            fullWidth
            type='submit'
            disabled={!isValidForm || isSubmitting}
          >
            Restablecer contraseña
          </Button>
        </Grid>
      </form>
    </div>
  );
};
