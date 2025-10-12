import { Button } from "@/components/ui/button";
import { IconType } from "react-icons";

interface ButtonIconProps {
  icon: IconType;
  children: React.ReactNode;
  onClick?: () => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const ButtonIcon = ({
  icon: Icon,
  children,
  onClick,
  variant = "ghost",
  size = "default",
  className = "",
}: ButtonIconProps) => {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      className={`flex items-center justify-center gap-2 ${className}`}
    >
      <Icon className="w-4 h-4" />
      {children}
    </Button>
  );
};

export default ButtonIcon;
