export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "medium" | "icon";
  children?: React.ReactNode;
}