import { IconName, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NeumorphicButton } from "../../../abstract/Neumorphic/Button/NeumorphicButton";

type NavigationSidebarButtonProps = {
  icon: IconName | Array<IconName>;
  iconSize?: SizeProp;

  color: string;
  link?: string | Array<string>;
  akg: string | Array<string>;
  className?: string;
  onClick?: () => void;
};

export const NavigationSidebarButton: React.FC<
  NavigationSidebarButtonProps
> = ({ icon, iconSize, color, link, akg, className, onClick }) => {
  return (
    <div className="hidden md:flex md:flex-col md:justify-center md:items-center">
      {typeof icon === "string" ? (
        <NeumorphicButton
          link={typeof link === "string" ? link : undefined}
          lala={typeof akg === "string" ? akg : "key"}
          onClick={onClick ? onClick : () => 0}
        >
          <FontAwesomeIcon
            icon={icon}
            color={color}
            size={iconSize ? iconSize : "2x"}
            className={className}
          />
        </NeumorphicButton>
      ) : (
        icon.length > 0 &&
        icon.map((ico: IconName, i: number) => (
          <div className="my-4" key={`div-${i}-${ico}`}>
            <NeumorphicButton
              link={typeof link !== "undefined" ? link[i] : "/"}
              lala={ico + i}
              key={ico + i}
            >
              <FontAwesomeIcon
                icon={ico}
                color={color}
                size={iconSize ? iconSize : "sm"}
                className={className}
              />
            </NeumorphicButton>
          </div>
        ))
      )}
    </div>
  );
};
