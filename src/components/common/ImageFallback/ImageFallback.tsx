import React, { ReactElement } from 'react';
import { Box, SxProps } from '@mui/material';
import classes from './ImageFallback.module.scss';
import classNames from 'classnames';
import { ReactComponent as NoImage } from '../../../assets/images/no-image.svg';

interface IProps {
  className?: string;
  sx?: SxProps;
}

export default function ImageFallback({ className, sx }: IProps): ReactElement {
  return (
    <Box
      component={NoImage}
      className={classNames(classes.image, className)}
      sx={{
        ...(sx || {}),
      }}
    />
  );
}
