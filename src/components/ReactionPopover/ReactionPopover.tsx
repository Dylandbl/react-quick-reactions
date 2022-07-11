import { useEffect, useState } from "react";
import {
  OuterDiv,
  CloseButton,
  Header,
  SelectionContainer,
  ReactionElement,
  Overlay,
} from "../../styles/ReactionPopoverStyles";
import { PopoverProps } from "../../types";
import { CloseSvg } from "../svg/CloseSvg";

export const ReactionPopover = (props: PopoverProps) => {
  const {
    isVisible = false,
    onClickEmoji,
    closeButtonAlt = null,
    headerAlt = "Quick reactions",
    outerDivClass,
    closeButtonClass,
    headerClass,
    selectionContainerClass,
    reactionElementClass,
    reactionsArray,
    changeHeaderOnReactionElemHover = true,
    hideHeader,
    hideCloseButton,
    disableClickAwayToClose,
    wide,
  } = props;
  const [isPopoverVisible, setIsPopoverVisible] = useState(isVisible);
  const [popoverHeader, setPopoverHeader] = useState(headerAlt);

  useEffect(() => {
    setIsPopoverVisible(isVisible);
  }, [isVisible]);

  // Resets the popover header to its default value (props.headerAlt).
  const resetHeader = () => setPopoverHeader(headerAlt);

  return (
    <>
      {!disableClickAwayToClose && isPopoverVisible && (
        <Overlay
          onClick={() => {
            setIsPopoverVisible(false);
          }}
        />
      )}
      <OuterDiv
        className={"rqr-outer-div " + outerDivClass}
        visible={isPopoverVisible}
        hideHeader={hideHeader}
        wide={wide}
      >
        {!hideCloseButton && (
          <CloseButton
            className={"rqr-close-button " + closeButtonClass}
            onClick={() => setIsPopoverVisible(false)}
          >
            {closeButtonAlt ? closeButtonAlt : <CloseSvg />}
          </CloseButton>
        )}
        {!hideHeader && (
          <Header className={"rqr-header " + headerClass}>
            {popoverHeader}
          </Header>
        )}
        <SelectionContainer
          className={"rqr-selection-container " + selectionContainerClass}
        >
          {reactionsArray?.map((item, index) => (
            <ReactionElement
              className={"rqr-reaction-element " + reactionElementClass}
              key={item?.name + "-" + index}
              id={item?.id}
              onClick={(e) => onClickEmoji(e.target as Element)}
              onMouseEnter={
                changeHeaderOnReactionElemHover
                  ? () => setPopoverHeader(item?.name)
                  : () => undefined
              }
              onMouseLeave={resetHeader}
            >
              {item?.content}
            </ReactionElement>
          ))}
        </SelectionContainer>
      </OuterDiv>
    </>
  );
};
