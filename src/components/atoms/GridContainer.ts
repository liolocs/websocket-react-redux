import styled from 'styled-components'
import {
	space,
	layout,
	color,
	typography,
	grid,
	background,
	border,
	position,
	SpaceProps,
	LayoutProps,
	ColorProps,
	TypographyProps,
	GridProps,
	BackgroundProps,
	BorderProps,
	PositionProps
} from 'styled-system'

type Props = SpaceProps &
	LayoutProps &
	ColorProps &
	TypographyProps &
	GridProps &
	BackgroundProps &
	BorderProps &
	PositionProps

const GridContainer = styled('div')<Props>(space, layout, color, typography, grid, background, border, position)

GridContainer.defaultProps = {
    display: 'grid',
    gridTemplateColumns:  'fr',
    gridTemplateRows: '1fr',
    gridTemplateAreas: ` '.' `,
    gridColumnGap: '0px',
    gridRowGap: '0px',
    height: '100%',
    width: '100%'
}

export default GridContainer