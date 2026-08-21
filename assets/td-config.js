tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0052D9',
          1: '#F2F3FF',
          2: '#D9E1FF',
          6: '#366EF4',
          7: '#0052D9',
          8: '#003CAB',
        },
        success: { DEFAULT: '#2BA471', 1: '#E3F9E9' },
        warning: { DEFAULT: '#E37318', 1: '#FFF1E9' },
        error: { DEFAULT: '#D54941', 1: '#FFF0ED' },
        yituo: '#F15A24',
      },
      fontFamily: {
        sans: ['PingFang SC', '-apple-system', 'BlinkMacSystemFont', 'Helvetica Neue', 'sans-serif'],
      },
      borderRadius: {
        td: '6px',
        'td-lg': '9px',
        'td-xl': '12px',
      },
    },
  },
};
