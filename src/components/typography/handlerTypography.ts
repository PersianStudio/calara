/* function getProperty(type: string, screenSize: boolean) {
  if (screenSize) {
    const property = {
      '64px-700': {
        fontWeight: 700,
        fontSize: responsiveFontSize(64),
        lineHeight: 96 / 64,
      },
      '64px-500': {
        fontWeight: 500,
        fontSize: responsiveFontSize(64),
        lineHeight: 96 / 64,
      },
      '64px-400': {
        fontWeight: 400,
        fontSize: responsiveFontSize(64),
        lineHeight: 96 / 64,
      },
      '_56px-600': {
        fontWeight: 600,
        fontSize: responsiveFontSize(56),
        lineHeight: 84 / 56,
      },
      '56px-500': {
        fontWeight: 500,
        fontSize: responsiveFontSize(56),
        lineHeight: 84 / 56,
      },
      '56px-400': {
        fontWeight: 400,
        fontSize: responsiveFontSize(56),
        lineHeight: 84 / 56,
      },
      '48px-700': {
        fontWeight: 700,
        fontSize: responsiveFontSize(48),
        lineHeight: 72 / 48,
      },
      '48px-500': {
        fontWeight: 500,
        fontSize: responsiveFontSize(48),
        lineHeight: 72 / 48,
      },
      '48px-400': {
        fontWeight: 400,
        fontSize: responsiveFontSize(48),
        lineHeight: 72 / 48,
      },
      '40px-700': {
        fontWeight: 700,
        fontSize: responsiveFontSize(40),
        lineHeight: 60 / 40,
      },
      '40px-600': {
        fontWeight: 600,
        fontSize: responsiveFontSize(40),
        lineHeight: 60 / 40,
      },
      '42px-600': {
        fontWeight: 600,
        fontSize: responsiveFontSize(42),
        lineHeight: 60 / 40,
      },
      '42px-700': {
        fontWeight: 700,
        fontSize: responsiveFontSize(42),
        lineHeight: 60 / 40,
      },
      '40px-500': {
        fontWeight: 500,
        fontSize: responsiveFontSize(40),
        lineHeight: 60 / 40,
      },
      '40px-400': {
        fontWeight: 400,
        fontSize: responsiveFontSize(40),
        lineHeight: 60 / 40,
      },
      '30px-700': {
        fontWeight: 700,
        fontSize: responsiveFontSize(30),
        lineHeight: 48 / 30,
      },
      '32px-700': {
        fontWeight: 700,
        fontSize: responsiveFontSize(32),
        lineHeight: 48 / 32,
      },
      '34px-700': {
        fontWeight: 700,
        fontSize: responsiveFontSize(34),
        lineHeight: 48 / 34,
      },
      '37px-700': {
        fontWeight: 700,
        fontSize: responsiveFontSize(37),
        lineHeight: 48 / 37,
      },
      '30px-500': {
        fontWeight: 500,
        fontSize: responsiveFontSize(30),
        lineHeight: 48 / 30,
      },
      '32px-500': {
        fontWeight: 500,
        fontSize: responsiveFontSize(32),
        lineHeight: 48 / 32,
      },
      '34px-500': {
        fontWeight: 500,
        fontSize: responsiveFontSize(34),
        lineHeight: 48 / 34,
      },
      '37px-500': {
        fontWeight: 500,
        fontSize: responsiveFontSize(37),
        lineHeight: 48 / 37,
      },
      '30px-400': {
        fontWeight: 400,
        fontSize: responsiveFontSize(30),
        lineHeight: 48 / 30,
      },
      '32px-400': {
        fontWeight: 400,
        fontSize: responsiveFontSize(32),
        lineHeight: 48 / 32,
      },
      '34px-400': {
        fontWeight: 400,
        fontSize: responsiveFontSize(34),
        lineHeight: 48 / 34,
      },
      '37px-400': {
        fontWeight: 400,
        fontSize: responsiveFontSize(37),
        lineHeight: 48 / 37,
      },
      '24px-700': {
        fontWeight: 700,
        fontSize: responsiveFontSize(24),
        lineHeight: 36 / 24,
      },
      '26px-700': {
        fontWeight: 700,
        fontSize: responsiveFontSize(26),
        lineHeight: 36 / 26,
      },
      '28px-700': {
        fontWeight: 700,
        fontSize: responsiveFontSize(28),
        lineHeight: 36 / 28,
      },
      '24px-500': {
        fontWeight: 500,
        fontSize: responsiveFontSize(24),
        lineHeight: 36 / 24,
      },
      '26px-500': {
        fontWeight: 500,
        fontSize: responsiveFontSize(26),
        lineHeight: 36 / 26,
      },
      '28px-500': {
        fontWeight: 500,
        fontSize: responsiveFontSize(28),
        lineHeight: 36 / 28,
      },
      '24px-400': {
        fontWeight: 400,
        fontSize: responsiveFontSize(24),
        lineHeight: 36 / 24,
      },
      '26px-400': {
        fontWeight: 400,
        fontSize: responsiveFontSize(26),
        lineHeight: 36 / 26,
      },
      '28px-400': {
        fontWeight: 400,
        fontSize: responsiveFontSize(28),
        lineHeight: 36 / 28,
      },
      '18px-700': {
        fontWeight: 700,
        fontSize: responsiveFontSize(18),
        lineHeight: 30 / 18,
      },
      '19px-700': {
        fontWeight: 700,
        fontSize: responsiveFontSize(19),
        lineHeight: 30 / 19,
      },
      '20px-700': {
        fontWeight: 700,
        fontSize: responsiveFontSize(20),
        lineHeight: 30 / 20,
      },
      '21px-700': {
        fontWeight: 700,
        fontSize: responsiveFontSize(21),
        lineHeight: 30 / 21,
      },
      '22px-700': {
        fontWeight: 700,
        fontSize: responsiveFontSize(22),
        lineHeight: 30 / 22,
      },
      '18px-500': {
        fontWeight: 500,
        fontSize: responsiveFontSize(18),
        lineHeight: 30 / 18,
      },
      '19px-500': {
        fontWeight: 500,
        fontSize: responsiveFontSize(19),
        lineHeight: 30 / 19,
      },
      '20px-500': {
        fontWeight: 500,
        fontSize: responsiveFontSize(20),
        lineHeight: 30 / 20,
      },
      '21px-500': {
        fontWeight: 500,
        fontSize: responsiveFontSize(21),
        lineHeight: 30 / 21,
      },
      '22px-500': {
        fontWeight: 500,
        fontSize: responsiveFontSize(22),
        lineHeight: 30 / 22,
      },
      '18px-600': {
        fontWeight: 600,
        fontSize: responsiveFontSize(18),
        lineHeight: 30 / 18,
      },
      '18px-400': {
        fontWeight: 400,
        fontSize: responsiveFontSize(18),
        lineHeight: 30 / 18,
      },
      '19px-400': {
        fontWeight: 400,
        fontSize: responsiveFontSize(19),
        lineHeight: 30 / 19,
      },
      '20px-400': {
        fontWeight: 400,
        fontSize: responsiveFontSize(20),
        lineHeight: 30 / 20,
      },
      '21px-400': {
        fontWeight: 400,
        fontSize: responsiveFontSize(21),
        lineHeight: 30 / 21,
      },
      '22px-400': {
        fontWeight: 400,
        fontSize: responsiveFontSize(22),
        lineHeight: 30 / 22,
      },
      '15px-700': {
        fontWeight: 700,
        fontSize: responsiveFontSize(15),
        lineHeight: 24 / 15,
      },
      '16px-700': {
        fontWeight: 700,
        fontSize: responsiveFontSize(16),
        lineHeight: 24 / 16,
      },
      '17px-700': {
        fontWeight: 700,
        fontSize: responsiveFontSize(17),
        lineHeight: 24 / 17,
      },
      '15px-500': {
        fontWeight: 500,
        fontSize: responsiveFontSize(15),
        lineHeight: 24 / 15,
      },
      '16px-500': {
        fontWeight: 500,
        fontSize: responsiveFontSize(16),
        lineHeight: 24 / 16,
      },
      '17px-500': {
        fontWeight: 500,
        fontSize: responsiveFontSize(17),
        lineHeight: 24 / 17,
      },
      '15px-400': {
        fontWeight: 400,
        fontSize: responsiveFontSize(15),
        lineHeight: 24 / 15,
      },
      '16px-400': {
        fontWeight: 400,
        fontSize: responsiveFontSize(16),
        lineHeight: 24 / 16,
      },
      '17px-400': {
        fontWeight: 400,
        fontSize: responsiveFontSize(17),
        lineHeight: 24 / 17,
      },

      '8px-700': {
        fontWeight: 700,
        fontSize: responsiveFontSize(8),
        lineHeight: 18 / 8,
      },
      '10px-700': {
        fontWeight: 700,
        fontSize: responsiveFontSize(10),
        lineHeight: 18 / 10,
      },
      '11px-700': {
        fontWeight: 700,
        fontSize: responsiveFontSize(11),
        lineHeight: 18 / 11,
      },
      '12px-700': {
        fontWeight: 700,
        fontSize: responsiveFontSize(12),
        lineHeight: 18 / 12,
      },
      '13px-700': {
        fontWeight: 700,
        fontSize: responsiveFontSize(13),
        lineHeight: 18 / 13,
      },
      '14px-700': {
        fontWeight: 700,
        fontSize: responsiveFontSize(14),
        lineHeight: 18 / 14,
      },

      '8px-500': {
        fontWeight: 500,
        fontSize: responsiveFontSize(8),
        lineHeight: 18 / 8,
      },
      '10px-500': {
        fontWeight: 500,
        fontSize: responsiveFontSize(10),
        lineHeight: 18 / 10,
      },
      '11px-500': {
        fontWeight: 500,
        fontSize: responsiveFontSize(11),
        lineHeight: 18 / 11,
      },
      '12px-500': {
        fontWeight: 500,
        fontSize: responsiveFontSize(12),
        lineHeight: 18 / 12,
      },
      '13px-500': {
        fontWeight: 500,
        fontSize: responsiveFontSize(13),
        lineHeight: 18 / 13,
      },
      '14px-500': {
        fontWeight: 500,
        fontSize: responsiveFontSize(14),
        lineHeight: 18 / 14,
      },

      '8px-400': {
        fontWeight: 400,
        fontSize: responsiveFontSize(8),
        lineHeight: 18 / 8,
      },
      '10px-400': {
        fontWeight: 400,
        fontSize: responsiveFontSize(10),
        lineHeight: 18 / 10,
      },
      '11px-400': {
        fontWeight: 400,
        fontSize: responsiveFontSize(11),
        lineHeight: 18 / 11,
      },
      '12px-400': {
        fontWeight: 400,
        fontSize: responsiveFontSize(12),
        lineHeight: 18 / 12,
      },
      '13px-400': {
        fontWeight: 400,
        fontSize: responsiveFontSize(13),
        lineHeight: 18 / 13,
      },
      '14px-400': {
        fontWeight: 400,
        fontSize: responsiveFontSize(14),
        lineHeight: 18 / 14,
      },

      'button-xLarge': {
        fontWeight: 500,
        fontSize: responsiveFontSize(18),
        lineHeight: 30 / 18,
      },
      'button-large': {
        fontWeight: 500,
        fontSize: responsiveFontSize(16),
        lineHeight: 24 / 16,
      },
      'button-medium': {
        fontWeight: 500,
        fontSize: responsiveFontSize(14),
        lineHeight: 22 / 14,
      },
      'button-small': {
        fontWeight: 500,
        fontSize: responsiveFontSize(12),
        lineHeight: 18 / 12,
      },
    }[type];
    return property;
  }
}

export default function handlerTypography(type: DsTypographyType) {
  return getProperty(type, true);
}
 */
