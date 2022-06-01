import React from "react";
import { NavigationSidebar } from "../../components/Sidebars/Navigation/NavigationSidebar";
import { PageProps } from "../page-types";

export const Home: React.FC<PageProps> = ({ sidebar }: PageProps) => {
  return <div>{sidebar}</div>;
};
