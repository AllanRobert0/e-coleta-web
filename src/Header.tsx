import React from "react";

/**
 * required-> title: string;
 * not required-> title?: string;
 *
 * @interface HeaderProps
 */
interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header>
      <h1>{props.title}</h1>
    </header>
  );
};

export default Header;
