import { Link } from 'react-router-dom';
import { Alert, Button, Card, Input } from 'reactstrap';
import styled, { css, keyframes } from 'styled-components';

export const PageTitle = styled.p`
  font-size: ${({ theme, fontSize }) => fontSize || theme.font.pageTitle.size};
  color: ${({ theme, color }) => color || theme.font.pageTitle.color};
  font-weight: ${({ theme, fontWeight }) =>
    fontWeight || theme.font.pageTitle.weight};
  line-height: ${({ theme, lineHeight }) =>
    lineHeight || theme.font.pageTitle.lineHeight};
  margin-bottom: ${({ marginBottom }) => marginBottom || '0'};
`;
export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: ${({ margin }) => margin || `30px 0 20px 0`};
`;
export const HeaderContainer = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: ${({ columns }) => columns || 'auto auto'};
  justify-content: ${({ justifyContent }) => justifyContent || 'space-between'};
  align-items: ${({ alignItems }) => alignItems || 'flex-end'};
  grid-column-gap: 30px;
  margin: ${({ margin }) => margin || '30px 0 20px 0'};
  @media (max-width: 800px) {
    grid-template-columns: 1fr auto;
    justify-content: space-between;
    grid-column-gap: 10px;
  }
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    justify-content: start;
    grid-row-gap: 15px;
  }
`;
export const Container = styled.div`
  display: grid;
  background-color: ${({ bgColor, theme }) => bgColor || theme.card.bgColor};
  border-radius: ${({ borderRadius, theme }) =>
    borderRadius || theme.card.borderRadius};
  border: 1px solid
    ${({ borderColor, theme }) => borderColor || theme.card.borderColor};
  padding: ${({ padding, theme }) => padding || theme.card.padding};
  margin-top: ${({ marginTop, theme }) => marginTop || theme.card.marginTop};
  gap: ${({ gap }) => gap && gap};
  @media (max-width: 1300px) {
    max-width: 100vw;
    overflow: auto;
  }
`;

// this container is used to span two div side by side
export const HorizontalContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 80px;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column; /* Stack items vertically */
    align-items: flex-start; /* Align items to the left */
    gap: 20px; /* Adjust gap for mobile */
  }
`;
export const ApprovalFilterContainer = styled.div`
  margin-bottom: 0;
`;

export const CardTitle = styled.p`
  margin: ${({ margin }) => margin || `auto 0`};
  color: ${({ color, theme }) => color || theme.card.title.color};
  font-size: ${({ fontSize, theme }) => fontSize || theme.card.title.size};
  font-weight: ${({ fontWeight, theme }) =>
    fontWeight || theme.card.title.weight};
`;

export const CommonText = styled.p`
  margin: ${({ margin }) => margin || `auto 0`};
  color: ${({ color, name, $label, label, theme }) =>
    color
      ? color
      : name
      ? theme.font.pageText.colorMain
      : $label || label
      ? theme.font.otherLabel.color
      : theme.font.pageText.colorSecondary};
  font-size: ${({ fontSize, $label, label, theme }) =>
    fontSize
      ? fontSize
      : $label || label
      ? theme.font.otherLabel.size
      : theme.font.pageText.size};
  font-weight: ${({ fontWeight, $title, title, $label, label, theme }) =>
    fontWeight
      ? fontWeight
      : $label || label
      ? theme.font.otherLabel.weight
      : $title || title
      ? theme.fontWeights.semibold
      : theme.font.pageText.weight};

  @media screen and (max-width: 768px) {
    font-size: ${({ tabFontSize }) => tabFontSize};
  }
  @media screen and (max-width: 500px) {
    font-size: ${({ mobileFontSize }) => mobileFontSize};
  }
`;
export const ColoredText = styled.p`
  margin: ${({ margin }) => margin || '0'};
  color: ${({ color, primary, theme, type }) =>
    color
      ? color
      : primary
      ? theme.colors.main.primary
      : type && type === 'success'
      ? theme.colors.main.success
      : type && type === 'error'
      ? theme.colors.main.error
      : type && type === 'blue'
      ? theme.colors.main.blue
      : type && type === 'warning'
      ? theme.colors.main.warning
      : theme.font.pageTextImportantRegular.color};
  font-size: ${({ fontSize, theme }) =>
    fontSize || theme.font.pageTextImportantRegular.size};
  font-weight: ${({ fontWeight, semibold, theme }) =>
    fontWeight
      ? fontWeight
      : semibold
      ? theme.font.pageTextImportantSemibold.weight
      : theme.font.pageTextImportantRegular.weight};

  ${({ hover, primary }) =>
    hover &&
    primary &&
    css`
      &:hover {
        color: ${({ theme }) => theme.colors.hover.primary};
      }
    `}

  ${({ hover, type }) =>
    hover &&
    type &&
    type === 'warning' &&
    css`
      &:hover {
        color: ${({ theme }) => theme.colors.hover.warning};
      }
    `}

  @media screen and (max-width: 900px) {
    font-size: 14px;
  }
  @media screen and (max-width: 500px) {
    font-size: 13px;
  }
`;
export const ColoredTextDiv = styled.div`
  margin: ${({ margin }) => margin || '0'};
  color: ${({ color, primary, theme, type }) =>
    color
      ? color
      : primary
      ? theme.colors.main.primary
      : type && type === 'success'
      ? theme.colors.main.success
      : type && type === 'error'
      ? theme.colors.main.error
      : type && type === 'blue'
      ? theme.colors.main.blue
      : type && type === 'warning'
      ? theme.colors.main.warning
      : theme.font.pageTextImportantRegular.color};
  font-size: ${({ fontSize, theme }) =>
    fontSize || theme.font.pageTextImportantRegular.size};
  font-weight: ${({ fontWeight, semibold, theme }) =>
    fontWeight
      ? fontWeight
      : semibold
      ? theme.font.pageTextImportantSemibold.weight
      : theme.font.pageTextImportantRegular.weight};

  ${({ hover, primary }) =>
    hover &&
    primary &&
    css`
      &:hover {
        color: ${({ theme }) => theme.colors.hover.primary};
      }
    `}

  ${({ hover, type }) =>
    hover &&
    type &&
    type === 'warning' &&
    css`
      &:hover {
        color: ${({ theme }) => theme.colors.hover.warning};
      }
    `}

  @media screen and (max-width: 900px) {
    font-size: 14px;
  }
  @media screen and (max-width: 500px) {
    font-size: 13px;
  }
`;
export const TableText = styled.p`
  margin: auto 0;
  color: ${({ color, name, theme }) =>
    color
      ? color
      : name
      ? theme.font.pageText.colorSecondary
      : theme.font.pageText.colorLabel};
  font-size: ${({ fontSize, name, theme }) =>
    fontSize ? fontSize : !name ? '13px' : '13.5px'};
  font-weight: ${({ fontWeight, name, theme }) =>
    fontWeight
      ? fontWeight
      : !name
      ? theme.fontWeights.semibold
      : theme.font.pageText.weight};
  height: ${({ height }) => height};
  ${({ hoverPointer }) =>
    hoverPointer &&
    css`
      cursor: pointer;
    `}
  &:hover {
    ${({ hoverUnderline }) =>
      hoverUnderline &&
      css`
        text-decoration: underline;
      `}
  }
`;

export const LabelWithTextSection = styled.div`
  display: grid;
  grid-row-gap: ${({ gap }) => gap || `6px`};
  padding: ${({ padding }) => padding || '0'};
  margin: ${({ margin }) => margin || '0'};
`;

export const InputWithLabelSection = styled.div`
  display: grid;
  grid-row-gap: ${({ gap }) => gap || '6px'};
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0'};
`;
export const InputLabel = styled.p`
  margin: ${({ margin }) => margin || `auto 0`};
  color: ${({ color, theme }) => color || theme.font.inputLabel.color};
  font-size: ${({ fontSize, theme }) => fontSize || theme.font.inputLabel.size};
  font-weight: ${({ fontWeight, theme }) =>
    fontWeight || theme.font.inputLabel.weight};
`;
export const FilterLabel = styled.p`
  margin: ${({ margin }) => margin || `auto 0`};
  color: ${({ color, theme }) => color || theme.font.filterLabel.color};
  font-size: ${({ fontSize, theme }) =>
    fontSize || theme.font.filterLabel.size};
  font-weight: ${({ fontWeight, theme }) =>
    fontWeight || theme.font.filterLabel.weight};
`;
export const InputField = styled.input`
  border-radius: ${({ theme }) => theme.input.borderRadius};
  background-color: ${({ bgColor, error, theme }) =>
    error
      ? theme.input.bgColor.error
      : bgColor
      ? bgColor
      : theme.input.bgColor.default};
  border: 1px solid
    ${({ borderColor, theme, error }) =>
      error
        ? theme.input.borderColor.error
        : borderColor
        ? borderColor
        : theme.input.borderColor.default};
  color: ${({ textColor, theme }) => textColor || theme.input.textColor};
  font-size: ${({ fontSize, theme }) => fontSize || theme.input.fontSize};
  padding: 5px 10px;
  width: ${({ width }) => width || '100%'};
  min-height: ${({ height, theme }) => height || theme.input.minHeight};
  ::placeholder,
  ::-webkit-input-placeholder {
    font-size: ${({ fontSize, theme }) =>
      fontSize || theme.input.placeholder.size};
    color: ${({ theme }) => theme.input.placeholder.color};
  }
  :-ms-input-placeholder {
    font-size: ${({ fontSize, theme }) =>
      fontSize || theme.input.placeholder.size};
    color: ${({ theme }) => theme.input.placeholder.color};
  }
  &:hover {
    border-color: ${({ hoverBorderColor, theme, error }) =>
      !error && (hoverBorderColor || theme.input.borderColor.hover)};
    box-shadow: ${({ theme, error }) => !error && theme.input.focusShadow};
  }
  &:focus {
    outline: none;
    border-color: ${({ focusBorderColor, theme, error }) =>
      !error && (focusBorderColor || theme.input.borderColor.focus)};
    box-shadow: ${({ theme, error }) => !error && theme.input.focusShadow};
  }
`;
export const InputTextArea = styled.textarea`
  border-radius: ${({ theme }) => theme.input.borderRadius};
  background-color: ${({ bgColor, error, theme }) =>
    error
      ? theme.input.bgColor.error
      : bgColor
      ? bgColor
      : theme.input.bgColor.default};
  border: 1px solid
    ${({ borderColor, theme, error }) =>
      error
        ? theme.input.borderColor.error
        : borderColor
        ? borderColor
        : theme.input.borderColor.default};
  color: ${({ textColor, theme }) => textColor || theme.input.textColor};
  font-size: ${({ fontSize, theme }) => fontSize || theme.input.fontSize};
  padding: ${({ padding }) => padding || '9px 10px'};
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '40px'};
  ::placeholder,
  ::-webkit-input-placeholder {
    font-size: ${({ fontSize, theme }) =>
      fontSize || theme.input.placeholder.size};
    color: ${({ theme }) => theme.input.placeholder.color};
  }
  :-ms-input-placeholder {
    font-size: ${({ fontSize, theme }) =>
      fontSize || theme.input.placeholder.size};
    color: ${({ theme }) => theme.input.placeholder.color};
  }
  &:hover {
    border-color: ${({ hoverBorderColor, theme, error }) =>
      !error && (hoverBorderColor || theme.input.borderColor.hover)};
    box-shadow: ${({ theme, error }) => !error && theme.input.focusShadow};
  }
  &:focus {
    outline: none;
    border-color: ${({ focusBorderColor, theme, error }) =>
      !error && (focusBorderColor || theme.input.borderColor.focus)};
    box-shadow: ${({ theme, error }) => !error && theme.input.focusShadow};
  }
`;
export const FormAlert = styled.span`
  font-size: ${({ fontSize }) => fontSize || '13px'};
  color: ${({ theme }) => theme.colors.main.error};
  margin: ${({ margin }) => margin || '5px 0 0 5px'};
`;

// common image
export const CommonImage = styled.img`
  margin: ${({ margin }) => margin || '0'};
  height: ${({ size }) => size};
  width: ${({ size }) => size};
`;

// assign dropdown
export const AssignListContainer = styled.div`
  position: absolute;
  left: ${({ left }) => left || '0px'};
  max-height: ${({ height }) => height || '300px'};
  overflow: auto;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  grid-row-gap: ${({ gap }) => gap || '0'};
  width: ${({ width }) => width || '260px'};
  padding: ${({ padding }) => padding || '0 0 10px'};
  border: 1px solid ${({ theme }) => theme.colors.border.secondary};
  border-radius: ${({ theme }) => theme.dropdown.borderRadius};
  z-index: 5;
  background-color: ${({ theme }) => theme.colors.main.white};

  ::-webkit-scrollbar {
    width: ${({ theme }) => theme.dropdown.scrollbar.width};
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.dropdown.scrollbar.trackBgColor};
    border-radius: ${({ theme }) => theme.dropdown.scrollbar.thumbBorderRadius};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.dropdown.scrollbar.thumbBgColor};
    border-radius: ${({ theme }) => theme.dropdown.scrollbar.thumbBorderRadius};
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.dropdown.scrollbar.thumbHoverBgColor};
  }

  top: ${({ top }) => top || '50px'};
  ${({ autoPlacement }) =>
    autoPlacement &&
    css`
      @media screen and (max-height: 850px) {
        top: auto;
        bottom: ${({ bottom }) => bottom || '50px'};
      }
    `}
`;
export const AssignListItem = styled.div`
  display: grid;
  grid-template-columns: ${({ columns }) => columns || '35px auto'};
  grid-column-gap: 12px;
  padding: ${({ padding }) => padding || '7px 15px'};
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.dropdown.option.hoverBgColor};
  }
`;
export const AssignListText = styled.span`
  font-size: ${({ fontSize, theme }) => fontSize || theme.dropdown.fontSize};
  color: ${({ color, theme }) => color || theme.dropdown.option.textColor};
`;

export const SearchBarWithAssignListContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  grid-row-gap: ${({ gap }) => gap || '0'};
`;
export const AssigneeSearchBarWrapper = styled.div`
  position: sticky;
  padding: ${({ padding }) => padding || '10px 8px 0'};
  margin: ${({ margin }) => margin || '0 0 5px 0'};
  background: ${({ theme }) => theme.colors.main.white};
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;
export const AssigneeSearchBarContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 36px;
  background: ${({ theme }) => theme.colors.main.whiteBg};
  border: 1px solid ${({ theme }) => theme.colors.border.secondary};
  border-radius: ${({ theme }) => theme.input.borderRadius};
  padding: 4px 10px;
  &:hover {
    border-color: ${({ hoverBorderColor, theme }) =>
      hoverBorderColor || theme.input.borderColor.hover};
    box-shadow: ${({ theme }) => theme.input.focusShadow};
  }
  &:focus-within {
    border-color: ${({ focusBorderColor, theme }) =>
      focusBorderColor || theme.input.borderColor.focus};
    box-shadow: ${({ theme }) => theme.input.focusShadow};
  }
`;
export const AssigneeSearchIcon = styled.img`
  position: absolute;
  top: 7px;
  left: 10px;
`;
export const AssigneeSearchInput = styled.input`
  width: 100%;
  padding-left: 25px;
  color: ${({ textColor, theme }) => textColor || theme.input.textColor};
  font-size: ${({ fontSize, theme }) => fontSize || theme.input.fontSize};
  border: none;
  ::placeholder,
  ::-webkit-input-placeholder {
    font-size: ${({ fontSize, theme }) =>
      fontSize || theme.input.placeholder.size};
    color: ${({ theme }) => theme.input.placeholder.color};
  }
  :-ms-input-placeholder {
    font-size: ${({ fontSize, theme }) =>
      fontSize || theme.input.placeholder.size};
    color: ${({ theme }) => theme.input.placeholder.color};
  }
  &:focus {
    outline: none;
  }
`;

export const ShowMoreAssigneeList = styled.div`
  position: absolute;
  left: ${({ left }) => left || '0px'};
  max-height: 300px;
  overflow: auto;
  width: 250px;
  display: grid;
  grid-template-columns: ${({ columns }) => columns || '35px auto'};
  grid-gap: 10px 12px;
  align-items: center;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.dropdown.borderRadius};
  z-index: 5;
  background-color: ${({ theme }) => theme.colors.main.white};
  ::-webkit-scrollbar {
    width: ${({ theme }) => theme.dropdown.scrollbar.width};
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.dropdown.scrollbar.trackBgColor};
    border-radius: ${({ theme }) => theme.dropdown.scrollbar.thumbBorderRadius};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.dropdown.scrollbar.thumbBgColor};
    border-radius: ${({ theme }) => theme.dropdown.scrollbar.thumbBorderRadius};
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.dropdown.scrollbar.thumbHoverBgColor};
  }

  top: ${({ top }) => top || '50px'};

  ${({ bottom }) =>
    bottom &&
    css`
      bottom: ${({ bottom }) => bottom};
    `}

  ${({ autoPlacement }) =>
    autoPlacement &&
    css`
      @media screen and (max-height: 850px) {
        top: auto;
        bottom: ${({ bottom }) => bottom || '50px'};
      }
    `}
`;

export const AssigneeMoreText = styled.p`
  margin: auto 0;
  color: ${({ color, theme }) => color || theme.colors.main.labelText};
  font-size: ${({ fontSize }) => fontSize || '12px'};
  font-weight: ${({ fontWeight, theme }) =>
    fontWeight || theme.fontWeights.semibold};
  cursor: pointer;
`;
export const MailSendSection = styled.div`
  display: grid;
  align-content: center;
  justify-content: start;
  grid-row-gap: 2px;
`;
export const ResendInvite = styled.p`
  color: ${({ theme }) => theme.colors.main.primary};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  margin: ${({ margin }) => margin || '0'};
  &:hover {
    color: ${({ theme }) => theme.colors.hover.primary};
  }
`;

export const Plus = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

export const CommonIconWhButton = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: ${props =>
    props.tempColumns ? props.tempColumns : `25px auto`};
  grid-column-gap: 8px;
  color: ${props => (props.color ? props.color : `#2F394E`)};
  font-size: ${props => (props.fontSize ? props.fontSize : `14px`)};
  font-weight: ${props => props.fontWeight && `600`};
  background-color: ${({ bgColor }) => bgColor || '#fff'};
  border: ${props =>
    props.borderColor ? `1px solid ${props.borderColor}` : `1px solid #20BEAD`};
  border-radius: ${props => (props.radius ? props.radius : `6px`)};
  padding: ${props => (props.padding ? props.padding : `10px 25px`)};
  cursor: pointer;
  white-space: nowrap;
  text-align: center;
  &:hover {
    border-color: ${({ hoverBorderColor, color }) =>
      hoverBorderColor ? hoverBorderColor : color ? color : '#1cb1a1'};
  }
`;
const widthAnimation = keyframes`
  0% {
    opacity: 0;
    width: 0;
  }
  100% {
    opacity: 1;
    width: 100%
  }
`;
export const ActivityBarTrack = styled.div`
  display: grid;
  grid-template-columns: ${props => `${props.percent}%`};
  justify-content: start;
  background-color: ${props =>
    props.percent < 30
      ? `${props.red}4d` || `#FE59694d`
      : props.percent < 60
      ? `${props.yellow}4d` || `#F2C7414d`
      : `${props.green}4d` || `#20BEAD4d`};
  border-radius: ${({ borderRadius }) => borderRadius || '20px'};
  height: ${({ height }) => height || '6px'};
  margin-top: ${({ marginTop }) => marginTop || `10px`};
  min-width: ${({ width }) => width || '120px'};

  @media screen and (max-width: 500px) {
    min-width: ${({ mobileWidth }) => mobileWidth};
    height: ${({ mobileHeight, height }) =>
      mobileHeight ? mobileHeight : height ? height : '6px'};
  }
`;
export const ActivityBarTrain = styled.div`
  height: ${({ height }) => height || '6px'};
  border-radius: ${({ borderRadius }) => borderRadius || '20px'};
  background-color: ${props =>
    props.percent < 30
      ? props.red || `#FE5969`
      : props.percent < 60
      ? props.yellow || `#F2C741`
      : props.green || `#20BEAD`};
  animation: 0.6s ${widthAnimation} ease;

  @media screen and (max-width: 500px) {
    height: ${({ mobileHeight, height }) =>
      mobileHeight ? mobileHeight : height ? height : '6px'};
  }
`;

const heightAnimation = height => keyframes`
  0% {
    opacity: 0;
    height: 0;
  }
  100% {
    opacity: 1;
    height: ${height};
  }
`;
export const VerticalBarTrack = styled.div`
  width: ${({ width }) => width || '10px'};
  height: ${({ height }) => height || '180px'};
  display: flex;
  align-items: flex-end;
  background-color: ${({ backgroundColor }) => backgroundColor || '#e4e7eb'};
  border-radius: ${({ borderRadius }) => borderRadius || '20px'};
`;
export const VerticalBarTrain = styled.div`
  height: ${({ percent }) => (percent ? `${percent}%` : '0')};
  width: ${({ width }) => width || '10px'};
  border-radius: ${({ borderRadius }) => borderRadius || '20px'};
  background-color: ${props =>
    props.percent < 30
      ? props.red || `#FE5969`
      : props.percent < 60
      ? props.yellow || `#F2C741`
      : props.green || `#20BEAD`};
  animation: 0.6s ${({ percent }) => heightAnimation(percent)} ease;
`;

export const AppsUrlsBarTrain = styled.div`
  height: 6px;
  border-radius: 20px;
  background-color: #20bead;
`;
export const StyledLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`;
export const CreateProjectLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
  @media (max-width: 767px) {
    margin-right: auto;
  }
`;

export const TextInputSection = styled.div`
  display: flex;
  flex-direction: column;
  grid-row-gap: 10px;
  @media (max-width: 767px) {
    grid-row-gap: 10px;
  }
`;
export const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  margin-left: ${props => (props.marginLeft ? props.marginLeft : '0')};
`;
export const BackLinkSection = styled.div`
  display: grid;
  grid-template-columns: 40px auto;
  grid-column-gap: ${({ gap }) => gap || '20px'};
  justify-content: start;
  align-content: center;
  cursor: pointer;
`;

export const ArrowBox = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  border-radius: ${({ theme }) => theme.borderRadii.button};
  background-color: ${({ theme }) => theme.colors.main.white};
  width: ${({ size }) => size || `40px`};
  height: ${({ size }) => size || `40px`};
  border: 1px solid ${({ theme }) => theme.colors.border.secondaryLight};

  cursor: pointer;
  &:hover {
    border-color: ${({ isActionButton, theme }) =>
      isActionButton
        ? theme.colors.border.primary
        : theme.colors.border.secondary};
  }
`;

export const ManagerBadge = styled.img`
  position: absolute;
  bottom: ${({ bottom }) => bottom || '-5px'};
  right: ${({ right }) => right || '-10px'};
  top: ${({ top }) => top};
  left: ${({ left }) => left};
`;

export const GrayButton = styled.div`
  padding: 13px 30px;
  background-color: #7f9dbf;
  color: white;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  @media (max-width: 767px) {
    padding: 10px 25px;
  }
`;

export const CommonGrid = styled.div`
  display: grid;
  grid-template-columns: ${({ columns }) => columns || `auto auto`};
  justify-content: ${({ justifyContent }) => justifyContent || `space-between`};
  align-content: ${({ alignContent }) => alignContent};
  align-items: ${({ alignItem }) => alignItem};
  grid-gap: ${({ gap }) => gap || `15px`};
  padding: ${({ padding }) => padding || '0'};
  margin: ${({ margin }) => margin};

  ${({ newTask }) =>
    newTask &&
    css`
      grid-template-columns: 100%;
      border: 1px solid ${({ theme }) => theme.colors.border.primary};
    `}
  ${({ noTask, newTask }) =>
    noTask &&
    newTask &&
    css`
      margin: 20px 25px 0px;
      border-radius: ${({ theme }) => theme.borderRadii.card};
    `}

  @media screen and (max-width: 500px) {
    grid-template-columns: ${({ mobileColumns, columns }) =>
      mobileColumns ? mobileColumns : columns ? columns : 'auto auto'};
  }
`;

export const CommonFlex = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  gap: ${({ gap }) => gap ?? `20px`};
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
  align-items: ${({ alignItems }) => alignItems || 'center'};
  padding: ${({ padding }) => padding || '0'};
  margin: ${({ margin }) => margin || '0'};
  background-color: ${({ bgColor }) => bgColor};
`;

export const HeaderPDF = styled.div`
  display: grid;
  grid-template-columns: auto;
  justify-items: center;
  grid-row-gap: 10px;
`;

export const FooterPDF = styled.div`
  display: grid;
`;

export const RedStar = styled.span`
  color: #fc5768;
  font-size: 16px;
  font-weight: 700;
  line-height: 100%;
`;

export const TodayButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: 6px;
  background: #fff;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.button.primary.bgColor};
    color: #fff;
  }
`;

// Round Letter
export const RoundLetterSection = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: ${({ gap }) => gap || `10px`};
  align-content: center;
  justify-content: start;
`;
export const FirstWordRound = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size || `34px`};
  height: ${({ size }) => size || `34px`};
  border-radius: 50%;
  color: ${({ color, theme }) => color || theme.colors.main.white};
  background-color: ${({ backColor }) => backColor};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight, theme }) =>
    fontWeight || theme.fontWeights.semibold};
`;
export const RoundMiniImage = styled.img`
  width: ${({ imageSize }) => imageSize || `40px`};
  height: ${({ imageSize }) => imageSize || `40px`};
  border-radius: 50%;
`;

// extra --- need to remove later
export const CustomInput = styled(Input)`
  background: #fff;
  border: 1px solid #e4e7eb;
  border-radius: 6px;
  height: 45px;
  padding: 10px 20px !important;
  &:focus {
    border: 1px solid #20bead;
  }
  &::placeholder {
    color: rgba(51, 71, 91, 0.5);
    font-size: 15px;
  }
  &:disabled {
    background: #f5f5f9;
  }
`;

export const SingleColorButton = styled(Button)`
  background: #20bead;
  border-radius: 6px;
  color: #fff;
  height: 50px;
  font-size: 18px;
  font-weight: 400;
  &:focus {
    background: #20bead !important;
  }
  &:hover {
    background: #20bead !important;
  }
`;

export const CustomFormAlert = styled(Alert)`
  background: rgba(241, 87, 98, 0.1) !important;
  color: ${({ theme }) => theme.colors.main.error};
  border-radius: ${({ theme }) => theme.borderRadii.button} !important;
  min-height: 40px !important;
  font-size: 13px !important;
  padding: 0;
  margin: 8px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CenteredTooltip = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;
  padding: 5px 8px;
  border-radius: ${({ theme }) => theme.borderRadii.tooltip};
  font-size: ${({ fontSize }) => fontSize || '10px'};
  color: ${({ textColor, theme }) => textColor || theme.colors.main.white};
  border: 1px solid
    ${({ borderColor, theme }) => borderColor || theme.colors.main.textMain};
  background-color: ${({ bgColor, theme }) =>
    bgColor || theme.colors.main.textMain};
  z-index: 5;
  width: max-content;
  max-width: 300px;
  top: ${({ top }) => top || '0'};
  left: ${({ left }) => left || '50%'};
  right: ${({ right }) => right};
  margin-top: ${({ marginTop }) => marginTop || '0'};
  opacity: 0;
`;
export const SingleAssigneeRoundImage = styled.div`
  position: relative;
  width: ${({ size }) => size || '40px'};
  height: ${({ size }) => size || '40px'};
  border-radius: ${({ theme }) => theme.borderRadii.circle};
  background-color: ${({ theme, bgColor }) =>
    bgColor ? bgColor : theme.colors.main.white};
  cursor: pointer;
  &:hover ${CenteredTooltip} {
    opacity: 1;
    visibility: visible;
  }
`;

// feature not available in demo image
export const FeatureImageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ padding }) => padding || '80px'};
`;
export const FeatureImage = styled.img`
  max-width: 600px;
  border-radius: ${({ theme }) => theme.borderRadii.card};
  box-shadow: 0px 3px 26px rgba(111, 127, 162, 0.3);
`;
export const FeatureImageTitle = styled.div`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.main.textSecondary};
  margin: 30px 0 15px;
`;
export const FeatureImageSubtitle = styled.div`
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.main.labelText};
`;

// divider line
export const DividerLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme, color }) =>
    color || theme.colors.border.secondaryLight};
  margin: ${({ margin }) => margin || '0'};
`;
export const TimeInputField = styled.input`
  text-align: center;
  border-radius: ${({ theme }) => theme.input.borderRadius};
  background-color: ${({ bgColor, error, theme }) =>
    theme.input.bgColor.default};
  border: 1px solid
    ${({ borderColor, theme, error }) =>
      error
        ? theme.input.borderColor.error
        : borderColor
        ? borderColor
        : theme.input.borderColor.default};
  color: ${({ textColor, theme }) => textColor || theme.input.textColor};
  font-size: ${({ fontSize, theme }) => fontSize || theme.input.fontSize};
  padding: 8px 10px;
  width: ${({ width }) => width || '100%'};
  &:hover {
    border-color: ${({ hoverBorderColor, theme, error }) =>
      !error && (hoverBorderColor || theme.input.borderColor.hover)};
    box-shadow: ${({ theme, error }) => !error && theme.input.focusShadow};
  }
  &:focus {
    outline: none;
    border-color: ${({ focusBorderColor, theme, error }) =>
      !error && (focusBorderColor || theme.input.borderColor.focus)};
    box-shadow: ${({ theme, error }) => !error && theme.input.focusShadow};
  }
`;

export const ExportReportRadioButton = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid ${({ active }) => (active ? '#27C26C' : '#A6A9B3')};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &::after {
    content: '';
    width: 10px;
    height: 10px;
    background-color: ${({ active }) => (active ? '#27C26C' : 'transparent')};
    border-radius: 50%;
  }
`;

export const IconArrow = styled.img`
  margin: ${({ margin }) => margin || '0'};
  height: ${({ size }) => size};
  width: ${({ size }) => size};
  background-color: ${({ bgColor, theme }) =>
    bgColor || theme.button.secondary.bgColor};
  border: 1px solid
    ${({ borderColor, theme }) =>
      borderColor ? borderColor : theme.input.borderColor.default};
  border-radius: ${({ borderRadius }) => borderRadius || '6px'};
  padding: ${({ padding }) => padding || '0'};
  box-sizing: border-box; // Ensures padding is inside the border
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:hover {
    border-color: ${({ theme, disabled }) =>
      disabled
        ? theme.input.borderColor.default
        : theme.dropdown.borderColor.hover};
    box-shadow: ${({ theme, disabled }) =>
      disabled ? 'none' : theme.dropdown.focusShadow};
  }
`;
