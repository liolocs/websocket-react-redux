import styled from 'styled-components'
import {
	space,
	layout,
	color,
	typography,
	flexbox,
	background,
	border,
	position,
	SpaceProps,
	LayoutProps,
	ColorProps,
	TypographyProps,
	FlexboxProps,
	BackgroundProps,
	BorderProps,
	PositionProps
} from 'styled-system'

type Props = SpaceProps &
	LayoutProps &
	ColorProps &
	TypographyProps &
	FlexboxProps &
	BackgroundProps &
	BorderProps &
	PositionProps

const Sheet = styled('div')<Props>(space, layout, color, typography, flexbox, background, border, position)

Sheet.defaultProps = {
	display: 'flex',
    flex: 'row nowrap',
    width: '100%',
    height: '100vh'
}

export default Sheet