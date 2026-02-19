import logo from "../components/logo.png";

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = "", size }: LogoProps) {
  return (
    <img 
      src={logo} 
      alt="The Serenity Haven Logo" 
      className={className}
      style={size ? { width: size, height: size } : undefined}
    />
  );
}