import { Axis } from '@visx/axis'
import { curveNatural } from '@visx/curve'
import { LinearGradient } from '@visx/gradient'
import { MarkerCircle } from '@visx/marker'
import { scaleLinear } from '@visx/scale'
import { LinePath } from '@visx/shape'
import { Text } from '@visx/text'
import ParentSize from '@visx/responsive/lib/components/ParentSize'

import { data } from './data/productSales'

function LineChart({ data, height, width }) {
	const padding = 55

	const xScale = scaleLinear({
		domain: [1, 10],
		range: [0 + padding, width - padding],
	})

	const yScale = scaleLinear({
		domain: [0, 250],
		range: [height - padding, padding * 2],
	})

	const colors = {
		black: '#edf8f7',
		accent: '#3366FF',
		darkAccent: '#46BAAD',
	}

	return (
		<svg height={height} width={width}>
			<rect
				x={0}
				y={0}
				width={width}
				height={height}
				className="fill-primary-content dark:fill-neutral/50"
				rx={30}
			/>

			<Axis
				scale={xScale}
				top={height - padding}
				orientation="bottom"
				strokeWidth={1.5}
				tickLabelProps={() => ({
					textAnchor: 'middle',
					verticalAnchor: 'middle',
					className: 'fill-base-content',
				})}
				tickLineProps={{ className: 'stroke-primary' }}
				axisLineClassName="stroke-primary"
			/>

			<Axis
				hideZero
				scale={yScale}
				numTicks={5}
				left={padding}
				orientation="left"
				strokeWidth={1.5}
				tickLabelProps={() => ({
					textAnchor: 'end',
					verticalAnchor: 'middle',
					className: 'fill-base-content',
				})}
				tickLineProps={{ className: 'stroke-primary' }}
				axisLineClassName="stroke-primary"
			/>

			<LinearGradient id="background-gradient" from={colors.darkAccent} to={colors.black} />

			<LinePath
				data={data}
				x={d => xScale(d[0])}
				y={d => yScale(d[1])}
				fill="url('#background-gradient')"
				curve={curveNatural}
			/>

			<LinearGradient id="line-gradient" from={colors.accent} to={colors.darkAccent} />
			<MarkerCircle id="marker-circle" className="fill-primary" size={1.5} refX={2} />

			<LinePath
				data={data}
				x={d => xScale(d[0])}
				y={d => yScale(d[1])}
				stroke="url('#line-gradient')"
				strokeWidth={3}
				curve={curveNatural}
				markerEnd="url(#marker-circle)"
			/>

			<Text x={padding / 2} y={padding} className="text-2xl font-medium fill-base-content">
				Total Sales (over 10 days)
			</Text>
		</svg>
	)
}

function ResponsiveLineChart({ maxH = 500 }) {
	return (
		<ParentSize>
			{({ width, height }) => {
				const clampedHeight = Math.min(height, maxH)
				return <LineChart data={data} width={width} height={clampedHeight} />
			}}
		</ParentSize>
	)
}
export default ResponsiveLineChart
