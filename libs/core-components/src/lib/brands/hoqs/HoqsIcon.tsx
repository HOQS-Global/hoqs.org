import logo from './hoqs.svg';

interface HoqsLogoProps {
  size: number;
}

export function HoqsIcon({ size = 128 }: HoqsLogoProps) {
  return <img src={logo} height={size} width={size} alt="HOQS logo" />;
}


export default HoqsIcon;