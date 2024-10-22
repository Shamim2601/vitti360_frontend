import styled, { css, keyframes } from 'styled-components';

export const PrimaryButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${({ height, theme }) => height || theme.button.primary.height};
  width: ${({ width }) => width};
  padding: ${({ padding }) => padding || '0 25px'};
  margin: ${({ margin }) => margin || '0'};
  cursor: ${({ cursor }) => cursor || `pointer`};

  background-color: ${({ bgColor, theme }) =>
    bgColor || theme.button.primary.bgColor};
  color: ${({ textColor, theme }) =>
    textColor || theme.button.primary.textColor};
  font-size: ${({ fontSize, theme }) => fontSize || theme.button.fontSize};
  font-weight: ${({ fontWeight, theme }) =>
    fontWeight || theme.button.primary.fontWeight};
  border-radius: ${({ theme }) => theme.button.borderRadius};
  border: none;

  &:hover {
    background-color: ${({ hoverColor, disabled, theme }) =>
      !disabled && (hoverColor || theme.button.primary.hoverBgColor)};
  }
  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: ${({ disabledBgColor, theme }) =>
      disabledBgColor || theme.button.primary.disabledBgColor};
    cursor: not-allowed;
  }
`;

// div styled buttons
const CommonDivButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width};
  padding: ${({ padding }) => padding || '0 25px'};
  letter-spacing: ${({ letterSpacing }) => letterSpacing || '0.5px'};
  cursor: ${({ cursor, disabled }) =>
    disabled ? 'not-allowed' : cursor || `pointer`};
  border-radius: ${({ borderRadius, theme }) =>
    borderRadius || theme.button.borderRadius};
  margin: ${({ margin }) => margin};
`;
export const SecondaryButton = styled(CommonDivButton)`
  min-height: ${({ height, theme }) => height || theme.button.secondary.height};

  background-color: ${({ bgColor, theme }) =>
    bgColor || theme.button.secondary.bgColor};
  color: ${({ textColor, theme }) =>
    textColor || theme.button.secondary.textColor};
  font-size: ${({ fontSize, theme }) => fontSize || theme.button.fontSize};
  font-weight: ${({ fontWeight, theme }) =>
    fontWeight || theme.button.secondary.fontWeight};
  border: 1px solid
    ${({ borderColor, theme }) =>
      borderColor || theme.button.secondary.borderColor};

  &:hover {
    background-color: ${({ hoverBgColor, theme }) =>
      hoverBgColor || theme.button.secondary.hoverBgColor};
    border-color: ${({ hoverBgColor, theme }) =>
      hoverBgColor || theme.button.secondary.hoverBgColor};
    color: ${({ hoverTextColor, theme }) =>
      hoverTextColor || theme.button.secondary.hoverTextColor};
  }
`;
export const WhiteButton = styled(CommonDivButton)`
  min-height: ${({ height, theme }) => height || theme.button.height};
  width: ${({ width }) => width || 'auto'};

  background-color: ${({ bgColor, theme }) =>
    bgColor || theme.colors.main.white};
  color: ${({ color, type, theme }) =>
    color
      ? color
      : type && type === 'cancel'
      ? theme.button.cancel.textColor
      : type && type === 'delete'
      ? theme.button.deleteOutline.textColor
      : theme.colors.main.textSecondary};
  font-size: ${({ fontSize, theme }) => fontSize || theme.button.fontSize};
  font-weight: ${({ fontWeight, theme }) =>
    fontWeight || theme.fontWeights.regular};
  border: 1px solid
    ${({ borderColor, primary, type, theme }) =>
      borderColor
        ? borderColor
        : primary
        ? theme.button.primary.bgColor
        : type && type === 'cancel'
        ? theme.button.cancel.borderColor
        : type && type === 'delete'
        ? theme.button.deleteOutline.borderColor
        : theme.colors.border.secondaryLight};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:hover {
    border-color: ${({ hoverBorderColor, primary, type, theme, disabled }) =>
      disabled
        ? theme.input.borderColor.default
        : hoverBorderColor
        ? hoverBorderColor
        : primary
        ? theme.button.primary.bgColor
        : type === 'nav'
        ? theme.dropdown.borderColor.hover
        : type === 'cancel'
        ? theme.button.cancel.hoverBorderColor
        : type === 'delete'
        ? theme.button.deleteOutline.hoverBorderColor
        : theme.button.cancel.hoverBorderColor};
    color: ${({ theme, primary }) => primary && theme.button.primary.bgColor};
    box-shadow: ${({ theme, disabled }) =>
      disabled ? 'none' : theme.dropdown.focusShadow};
  }
`;
export const ColoredButton = styled(CommonDivButton)`
  min-height: ${({ height, theme }) => height || theme.button.height};
  background-color: ${({ bgColor, type, theme }) =>
    bgColor
      ? bgColor
      : type && type === 'delete'
      ? theme.button.deleteFilled.bgColor
      : type && type === 'blue'
      ? theme.button.blueButton.bgColor
      : type && type === 'gray'
      ? theme.button.grayButton.bgColor
      : type && type === 'grayMedium'
      ? theme.button.grayMediumButton.bgColor
      : type && type === 'black'
      ? theme.button.blackButton.bgColor
      : theme.button.primary.bgColor};
  color: ${({ color, theme }) => color || theme.colors.main.white};
  font-size: ${({ fontSize, theme }) => fontSize || theme.button.fontSize};
  font-weight: ${({ fontWeight, theme }) =>
    fontWeight || theme.fontWeights.semibold};
  border: none;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  &:hover {
    background-color: ${({ hoverBgColor, bgColor, type, theme, disabled }) =>
      !disabled &&
      (hoverBgColor
        ? hoverBgColor
        : bgColor
        ? bgColor
        : type && type === 'delete'
        ? theme.button.deleteFilled.hoverBgColor
        : type && type === 'blue'
        ? theme.button.blueButton.hoverBgColor
        : type && type === 'gray'
        ? theme.button.grayButton.hoverBgColor
        : type && type === 'grayMedium'
        ? theme.button.grayMediumButton.hoverBgColor
        : type && type === 'black'
        ? theme.button.blackButton.hoverBgColor
        : theme.button.primary.hoverBgColor)};
  }
`;
export const EditButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 28px;
  width: 28px;
  background-color: ${({ theme }) => theme.colors.main.gray};
  border-radius: ${({ theme }) => theme.borderRadii.circle};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover.gray};
  }
`;

export const DeleteButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 28px;
  width: 28px;
  background-color: ${({ theme }) => theme.colors.main.error};
  border-radius: ${({ theme }) => theme.borderRadii.circle};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover.error};
  }
`;

export const ButtonIcon = styled.img`
  width: ${({ size }) => size || '18px'};
  height: ${({ size }) => size || '18px'};
  margin-top: -2px;
`;

export const ExportButtonIcon = styled(ButtonIcon)`
  filter: grayscale(0) brightness(0) opacity(1);
  color: #767676;
  transition: color 0.3s ease;
`;
export const WhiteButtonWithIcon = styled(WhiteButton)`
  grid-column-gap: 8px;
  margin: ${({ margin }) => margin};
`;
export const ColoredButtonWithIcon = styled(ColoredButton)`
  grid-column-gap: 8px;
  margin: ${({ margin }) => margin};
`;
export const ExportButtonWithIcon = styled(WhiteButton)`
  grid-column-gap: 8px;
  margin: ${({ margin }) => margin};
  font-weight: bold;

  background-color: white;
  color: #767676;
  border: 1px solid #6fa4ea;

  &:hover {
    background-color: #6fa4ea;
    color: white;
    border-color: #4294ff;

    ${ExportButtonIcon} {
      color: white;
      filter: brightness(0) saturate(100%) invert(100%);
    }
  }
`;

export const ModalDeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${({ height, theme }) => height || theme.button.height};
  padding: ${({ padding }) => padding || '0 25px'};

  color: ${({ theme }) => theme.button.deleteFilled.textColor};
  font-size: ${({ theme }) => theme.button.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  border-radius: ${({ theme }) => theme.button.borderRadius};
  background-color: ${({ theme }) => theme.button.deleteFilled.bgColor};
  border: none;

  &:hover {
    background-color: ${({ disabled, theme }) =>
      !disabled && theme.button.deleteFilled.hoverBgColor};
  }
  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) =>
      theme.button.deleteFilled.disabledBgColor};
  }
  &:focus {
    outline: none;
  }
`;

export const TabButtonContainer = styled.div`
  display: grid;
  width: ${({ width }) => width};
  grid-template-columns: ${({ columns }) => columns || `auto auto`};
  justify-content: start;
  align-items: center;
  grid-column-gap: 5px;
  height: min-content;
  border: 1px solid ${({ theme }) => theme.colors.border.secondaryLight};
  border-radius: ${({ theme }) => theme.borderRadii.button};
  padding: 3px;
  background-color: ${({ theme }) => theme.colors.main.white};
  margin: ${({ margin }) => margin};
`;
export const TabButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  padding: 0 12px;
  border-radius: 6px;
  color: ${({ index, selected, theme }) =>
    index === selected ? theme.colors.main.white : theme.colors.main.textMain};
  background-color: ${({ index, selected, theme }) =>
    index == selected ? theme.colors.main.primary : theme.colors.main.white};
  cursor: pointer;
  border: 1px solid
    ${({ index, selected, theme }) =>
      index == selected ? theme.colors.main.primary : `transparent`};

  &:hover {
    border-color: ${({ theme }) => theme.colors.main.primary};
  }
`;

const rotate = active => keyframes`
  0% {
		transform: rotate(0deg)
	}
  20% {
    transform: rotate(45deg);
  }
	50% {
    transform: rotate(180deg)
  }
	80% {
		transform: rotate(340deg)
	}
	100% {
    transform: rotate(360deg);
	}
`;
export const RefreshButton = styled.div`
  grid-column-gap: 8px;
  margin: ${({ margin }) => margin};
  min-height: ${({ height, theme }) => height || theme.button.height};
  width: ${({ width }) => width};
  padding: ${({ padding }) => padding || '0 10px'};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  background-color: ${({ theme }) => theme.colors.main.blue};
  border-radius: ${({ theme }) => theme.button.borderRadius};
  color: ${({ color, theme }) => color || theme.colors.main.white};
  font-size: ${({ fontSize, theme }) => fontSize || theme.button.fontSize};
  font-weight: ${({ fontWeight, theme }) =>
    fontWeight || theme.fontWeights.semibold};

  &:hover {
    border-color: ${({ theme }) => theme.colors.main.blue};
    background-color: ${({ theme }) => theme.colors.hover.blue};
  }

  ${({ isLoading }) =>
    isLoading &&
    css`
      ${ButtonIcon} {
        animation: ${rotate} 1.2s linear infinite;
      }
    `}
`;

export const RadiusButton = styled(CommonDivButton)`
  min-height: 36px;
  background-color: ${({ active, theme }) =>
    active ? theme.button.primary.bgColor : theme.button.sandButton.bgColor};
  border: 1px solid;
  border-color: ${({ active, theme }) =>
    active ? theme.button.primary.bgColor : theme.button.sandButton.bgColor};
  color: ${({ active, theme }) =>
    active ? theme.colors.main.white : theme.button.sandButton.textColor};
  font-size: ${({ theme }) => theme.button.fontSize};
  font-weight: ${({ theme }) => theme.button.sandButton.fontWeight};
  padding: 0 12px;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    border-color: ${({ theme }) => theme.button.primary.bgColor};
  }
`;

export const FilterButton = styled(CommonDivButton)`
  padding: ${({ padding }) => padding || '0 25px'};
  margin: ${({ margin }) => margin || '0'};
  /* min-height: ${({ height, theme }) => height || theme.button.height}; */
  height: ${({ height }) => height || '40px'};
  font-size: ${({ fontSize, theme }) => fontSize || theme.button.fontSize};
  font-weight: ${({ fontWeight, theme }) =>
    fontWeight || theme.fontWeights.regular};
  background-color: ${({ bgColor, theme }) =>
    bgColor || theme.button.secondary.bgColor};
  border: 1px solid
    ${({ borderColor, theme }) =>
      borderColor ? borderColor : theme.input.borderColor.default};
  border-radius: ${({ borderRadius }) => borderRadius || '6px'};
  padding: ${({ padding }) => padding || '0'};
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.dropdown.borderColor.hover};
    box-shadow: ${({ theme }) => theme.dropdown.focusShadow};
  }
`;
