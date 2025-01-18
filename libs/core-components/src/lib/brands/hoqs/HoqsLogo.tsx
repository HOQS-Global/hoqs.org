import dark from './logo-dark.png';
import light from './logo-light.png';

interface HoqsIconProps {
  variant?: string;
  size?: number;
}

const logoMode = {
  dark: light,
  light: dark
}

export function HoqsLogo({ variant = 'dark', size = 128 }: HoqsIconProps) {
  return <img src={logoMode[variant]} height={size} width={size} alt="HOQS logo" />;
}


export default HoqsLogo;