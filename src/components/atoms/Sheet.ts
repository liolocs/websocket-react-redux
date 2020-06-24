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
	grid,
	SpaceProps,
	LayoutProps,
	ColorProps,
	TypographyProps,
	FlexboxProps,
	BackgroundProps,
	BorderProps,
	PositionProps,
	GridProps
} from 'styled-system'

type Props = SpaceProps &
	LayoutProps &
	ColorProps &
	TypographyProps &
	FlexboxProps &
	BackgroundProps &
	BorderProps &
	PositionProps & 
	GridProps

const Sheet = styled('div')<Props>(space, layout, color, typography, flexbox, background, border, position, grid)

export default Sheet