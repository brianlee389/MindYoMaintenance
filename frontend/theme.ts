import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  Theme,
} from '@react-navigation/native';
import {ColorSchemeName} from 'react-native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      animationColor: string;
    }
    interface Theme {
      statusBar: 'light' | 'dark' | 'auto' | 'inverted' | undefined;
    }
  }
}

interface ReactNavigationTheme extends Theme {
  statusBar: 'light' | 'dark' | 'auto' | 'inverted' | undefined;
}

export function combineThemes(
  themeType: ColorSchemeName
): ReactNativePaper.Theme | ReactNavigationTheme {

  const CombinedDarkTheme: ReactNativePaper.Theme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    mode: 'adaptive',
    statusBar: 'dark',
    colors: {
      ...PaperDarkTheme.colors,
      ...NavigationDarkTheme.colors,
      background: '#FBFBFB',//'#F8F4E3',
      // backgroundColor: '#13293d',
      animationColor: '#6262ff',
      primary: '#13293d',
      accent: '#13293d',
    },
  };

  const customTheme = {
    ...PaperDarkTheme,
    dark: false,
    roundness: 4,
    colors: {
      background: '#F8F4E3',
      primary: '#FFFFFF',
      accent: '#13293d',
      surface: '#13293d',
      onSurface: '#13293d',
      error: '#B00020',
      backdrop: '#FFFFFF',
      notification: '#f50057',
      text: '#000000'
    },
    animation: {
      scale: 1.0,
    },
  };


  return combineDarkTheme();
  // return themeType === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;
}

export function combineDarkTheme() {
  const CombinedDefaultTheme: ReactNativePaper.Theme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    statusBar: 'dark',
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      backgroundColor: '#0276b3',
      animationColor: '#2922ff',
      primary: '#0276b3',
      accent: '#2922ff',
    },
  };

  return CombinedDefaultTheme;
}
