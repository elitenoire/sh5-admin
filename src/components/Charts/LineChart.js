import { useMemo, useCallback } from 'react'
import { Axis } from '@visx/axis'
import { curveNatural } from '@visx/curve'
import { LinearGradient } from '@visx/gradient'
import { MarkerCircle } from '@visx/marker'
import { scaleLinear } from '@visx/scale'
import { LinePath, Line } from '@visx/shape'
import { Text } from '@visx/text'
import { Group } from '@visx/group'
import { localPoint } from '@visx/event'
import { useTooltip, TooltipWithBounds } from '@visx/tooltip'
import { bisector, extent } from 'd3-array'
import ParentSize from '@visx/responsive/lib/components/ParentSize'

import { data } from './data/productSales'

const colors = {
	black: '#edf8f7',
	accent: '#3366FF',
	darkAccent: '#46BAAD',
}

// Defining selector functions
const getXValue = d => d[0]
const getYValue = d => d[1]

const bisectDate = bisector(getXValue).left

function LineChart({ data, height, width }) {
	const { tooltipTop = 0, tooltipLeft = 0, hideTooltip, showTooltip, tooltipData } = useTooltip()

	const margin = { top: 40, right: 40, bottom: 50, left: 60 }
	// defining inner measurements
	const iWidth = width - margin.left - margin.right
	const iHeight = height - margin.top - margin.bottom

	const xScale = useMemo(
		() =>
			scaleLinear({
				domain: [1, 10], // extent(data, getXValue)
				range: [0, iWidth],
				// nice: true,
			}),
		[iWidth]
	)

	const yScale = useMemo(
		() =>
			scaleLinear({
				domain: [0, 250],
				range: [iHeight, 0],
				// nice: true,
			}),
		[iHeight]
	)

	const handleTooltip = useCallback(
		e => {
			const { x } = localPoint(e) || { x: 0 }
			const x0 = xScale.invert(x - margin.left) // get day from the scale
			const index = bisectDate(data, x0, 1) // get index of this day from the array
			const d0 = data[index - 1]
			const d1 = data[index]
			let d = d0
			// is previous data point available?
			if (d1 && getXValue(d1)) {
				d = x0.valueOf() - getXValue(d0).valueOf() > getXValue(d1).valueOf() - x0.valueOf() ? d1 : d0
			}
			showTooltip({
				tooltipData: d,
				tooltipLeft: xScale(getXValue(d)) + margin.left,
				tooltipTop: yScale(getYValue(d)),
			})
		},
		[data, margin.left, showTooltip, xScale, yScale]
	)

	return (
		<div className="relative">
			<svg height={height} width={width}>
				<rect
					x={0}
					y={0}
					width={width}
					height={height}
					className="fill-primary-content dark:fill-neutral/50"
					rx={30}
				/>
				<Group left={margin.left} top={margin.top}>
					<Axis
						scale={xScale}
						top={iHeight}
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
						x={d => xScale(getXValue(d))}
						y={d => yScale(getYValue(d))}
						fill="url('#background-gradient')"
						curve={curveNatural}
					/>
					<LinearGradient id="line-gradient" from={colors.accent} to={colors.darkAccent} />
					<MarkerCircle id="marker-circle" className="fill-primary" size={1.5} refX={2} />
					<LinePath
						data={data}
						x={d => xScale(getXValue(d))}
						y={d => yScale(getYValue(d))}
						stroke="url('#line-gradient')"
						strokeWidth={3}
						curve={curveNatural}
						// shapeRendering="geometricPrecision"
						markerStart="url(#marker-circle)"
						markerMid="url(#marker-circle)"
						markerEnd="url(#marker-circle)"
					/>
					<Text x={margin.left} y={margin.top / 5} className="xs:text-xl font-medium fill-base-content">
						Total Sales (over 10 days)
					</Text>
					{tooltipData && (
						<Group>
							<Line
								from={{ x: tooltipLeft - margin.left, y: 0 }}
								to={{ x: tooltipLeft - margin.left, y: iHeight }}
								strokeWidth={1}
								pointerEvents="none"
								strokeDasharray="5, 5"
								className="stroke-error"
							/>
							<circle
								cx={tooltipLeft - margin.left}
								cy={tooltipTop}
								r={8}
								fillOpacity={0.5}
								pointerEvents="none"
								className="fill-error"
							/>
							<circle
								cx={tooltipLeft - margin.left}
								cy={tooltipTop}
								r={4}
								pointerEvents="none"
								className="fill-error"
							/>
						</Group>
					)}
					<rect
						x={0}
						y={0}
						width={iWidth}
						height={iHeight}
						fill="transparent"
						onMouseLeave={hideTooltip}
						onMouseMove={handleTooltip}
					/>
				</Group>
			</svg>
			{tooltipData && (
				<TooltipWithBounds
					key={Math.random()}
					top={tooltipTop}
					left={tooltipLeft}
					className="!p-5 !rounded-xl min-w-[50] !text-neutral-content !bg-neutral dark:!bg-neutral/90"
				>
					<div>
						<span>{`Day ${getXValue(tooltipData)}: `}</span>
						<strong className="font-success">{getYValue(tooltipData)}</strong>
					</div>
				</TooltipWithBounds>
			)}
		</div>
	)
}

function ResponsiveLineChart({ maxH = 400 }) {
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
