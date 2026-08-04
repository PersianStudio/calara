import { getImageApi } from '@ice-web-app/shared-helpers';
import { useElementOnScreen } from '@ice-web-app/shared-hooks';
import {
  Avatar,
  AvatarProps,
  Badge,
  BadgeOrigin,
  BadgeProps,
  BoxProps,
  Skeleton,
  SxProps,
  Theme,
  styled,
} from '@mui/material';
import classnames from 'classnames';
import { FC, MouseEvent, ReactNode, RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { ThemeColor } from '../../materio/@core/types';
import { getInitials } from '../../utils/getInitials';
import { DsTypography } from '../typography/DsTypography';
import { DsTypographyProps } from '../typography/types';

const BadgeContentSpan = styled('span', {
  name: 'MuiBadgeContentSpan',
})<{ color: ThemeColor; badgeSize: number }>(({ color, badgeSize }) => ({
  width: badgeSize,
  height: badgeSize,
  borderRadius: '50%',
  cursor: 'pointer',
  backgroundColor: `var(--mui-palette-${color}-main)`,
  boxShadow: '0 0 0 2px var(--mui-palette-background-paper)',
}));

export interface DsAvatarProps extends AvatarProps {
  size?: BoxProps['width'];
  ref?: RefObject<HTMLDivElement>;
  badgeColor?: ThemeColor;
  badgeContent?: ReactNode;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  badgeSize?: number;
  badgeProps?: BadgeProps;
  badgeSx?: SxProps<Theme>;
  skeletonSx?: SxProps<Theme>;
  anchorOrigin?: BadgeOrigin;
  imgUrl?: string | null;
  textVariant?: DsTypographyProps['variant'];
  textSx?: SxProps<Theme>;
  loading?: boolean;
}

export const DsAvatar: FC<DsAvatarProps> = ({
  badgeColor,
  onClick,
  badgeSize = 10,
  textSx,
  sx,
  src: initialSrc,
  imgUrl,
  textVariant = 'body1_500',
  loading = false,
  badgeProps,
  badgeSx,
  skeletonSx,
  size,
  className,
  alt,
  variant,
  anchorOrigin = { vertical: 'bottom', horizontal: 'right' },
  ...props
}) => {
  const [loadingAvatar, setLoadingAvatar] = useState<boolean>(!initialSrc);
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(initialSrc);
  const [elementRef, isVisible] = useElementOnScreen();
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (!imgUrl) {
      setAvatarSrc(initialSrc || undefined);
      setLoadingAvatar(false);
    } else {
      setAvatarSrc(undefined);
      setLoadingAvatar(true);
    }
    hasFetchedRef.current = false;
  }, [imgUrl]);

  useEffect(() => {
    setAvatarSrc(initialSrc);
  }, [initialSrc]);

  useEffect(() => {
    if (!isVisible || hasFetchedRef.current || avatarSrc) return;

    if (imgUrl) {
      hasFetchedRef.current = true;
      setLoadingAvatar(true);
      getImageApi({ src: imgUrl })
        .then((blob) => {
          setAvatarSrc(blob);
        })
        .catch(() => {
          // Missing/404 profile images are common on mock API — fall back to initials, don't overlay.
        })
        .finally(() => setLoadingAvatar(false));
    } else {
      setLoadingAvatar(false);
    }
  }, [imgUrl, isVisible]);

  const Avtr = useMemo(() => {
    return (
      <Avatar
        sx={{
          width: size,
          height: size,
          minWidth: size,
          minHeight: size,
          backgroundColor: ({ palette }) => palette.iceGray['opacity-24'],
          ...sx,
        }}
        className={classnames('cursor-pointer', className)}
        variant={variant}
        src={avatarSrc}
        {...(!badgeColor && { onClick })}
        {...props}
      >
        <DsTypography variant={textVariant} component="span" sx={{ textTransform: 'uppercase', ...textSx }}>
          {alt && getInitials(alt, 2)}
        </DsTypography>
      </Avatar>
    );
  }, [avatarSrc, size, sx, className, textVariant, textSx, alt, badgeColor, onClick, props, imgUrl]);

  const badgeContentMemo = useMemo(
    () => (badgeColor ? <BadgeContentSpan color={badgeColor} onClick={onClick} badgeSize={badgeSize} /> : null),
    [badgeColor, badgeSize, onClick],
  );

  return loadingAvatar || loading ? (
    <Skeleton
      variant="rounded"
      animation="wave"
      ref={elementRef}
      sx={{
        bgcolor: 'grey.200',
        borderRadius: variant === 'square' ? 0 : '50%',
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        ...skeletonSx,
      }}
    />
  ) : badgeColor ? (
    <Badge
      sx={badgeSx}
      ref={elementRef}
      badgeContent={badgeContentMemo}
      anchorOrigin={anchorOrigin}
      overlap="circular"
      {...badgeProps}
    >
      {Avtr}
    </Badge>
  ) : (
    Avtr
  );
};
