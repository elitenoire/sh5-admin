import { useCallback } from 'react'
import { Group } from '@visx/group'
import { BarGroup } from '@visx/shape'
import { AxisBottom } from '@visx/axis'
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale'
import { useTooltip, TooltipWithBounds } from '@visx/tooltip'
import { LegendOrdinal } from '@visx/legend'
import { Text } from '@visx/text'
import { localPoint } from '@visx/event'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { timeParse, timeFormat } from 'd3-time-format'

import { data, keys } from './data/monthlyActivity'

const defaultMargin = { top: 60, right: 10, bottom: 40, left: 10 }

const parseDate = timeParse('%Y-%m-%d')
const format = timeFormat('%b')
const formatDate = date => format(parseDate(date))

// accessors
const getDate = d => d.date

// scales
const dateScale = scaleBand({
	domain: data.map(getDate),
	padding: 0.2,
})
const activityScale = scaleBand({
	domain: keys,
	padding: 0.1,
})
const volumeScale = scaleLinear({
	domain: [0, Math.max(...data.map(d => Math.max(...keys.map(key => Number(d[key])))))],
})
const colorScale = scaleOrdinal({
	domain: keys,
	range: ['success', 'error', 'primary'],
})

function BarChart({ width, height, margin = defaultMargin }) {
	const { tooltipTop, tooltipLeft, hideTooltip, showTooltip, tooltipData } = useTooltip()

	// bounds
	const xMax = width - margin.left - margin.right
	const yMax = height - margin.top - margin.bottom

	// update scale output dimensions
	dateScale.rangeRound([0, xMax])
	volumeScale.range([yMax, 0])
	activityScale.rangeRound([0, dateScale.bandwidth()])

	const handleTooltip = useCallback(
		(bar, groupIndex) => {
			return e => {
				const point = localPoint(e)
				if (!point) return
				showTooltip({
					tooltipData: { ...bar, gid: groupIndex },
					tooltipTop: point.y,
					tooltipLeft: point.x,
				})
			}
		},
		[showTooltip]
	)

	return width < 10 ? null : (
		<div className="relative">
			<svg width={width} height={height} className="cursor-pointer">
				<rect
					x={0}
					y={0}
					width={width}
					height={height}
					rx={30}
					className="fill-base-100 dark:fill-neutral/50"
				/>
				<Group top={margin.top} left={margin.left}>
					<BarGroup
						data={data}
						keys={keys}
						height={yMax}
						x0={getDate}
						x0Scale={dateScale}
						x1Scale={activityScale}
						yScale={volumeScale}
						color={colorScale}
					>
						{barGroups =>
							barGroups.map(barGroup => (
								<Group key={`bar-group-${barGroup.index}-${barGroup.x0}`} left={barGroup.x0}>
									{barGroup.bars.map(bar => (
										<rect
											key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
											x={bar.x}
											y={bar.y}
											width={bar.width}
											height={bar.height}
											className={`text-${bar.color} opacity-80 fill-current`}
											rx={8}
											onMouseLeave={hideTooltip}
											onMouseMove={handleTooltip(bar, barGroup.index)}
											onTouchMove={handleTooltip(bar, barGroup.index)}
										/>
									))}
								</Group>
							))
						}
					</BarGroup>
				</Group>
				<AxisBottom
					left={margin.left}
					top={yMax + margin.top}
					tickFormat={formatDate}
					scale={dateScale}
					hideAxisLine
					tickLabelProps={() => ({
						textAnchor: 'middle',
						className: 'fill-base-content text-sm font-medium',
					})}
					tickLineProps={{ className: 'stroke-base-content' }}
					axisLineClassName="stroke-base-content"
				/>
				<Text x={margin.left * 3} y={margin.top / 1.5} className="xs:text-xl font-medium fill-base-content">
					Monthly Activities (Jan - May)
				</Text>
			</svg>
			<div className={`absolute flex justify-center text-sm w-full py-2`}>
				<LegendOrdinal
					scale={colorScale}
					fill={({ value }) => {
						const altColor = value.charAt(0)
						const color = altColor + value.charAt(1)
						return `hsl(var(--${color},var(--${altColor})))`
					}}
					shape="circle"
					direction="row"
					labelMargin="0 1rem 0 0"
				/>
			</div>
			{tooltipData && (
				<TooltipWithBounds
					key={Math.random()}
					top={tooltipTop}
					left={tooltipLeft}
					className="!p-5 !rounded-xl min-w-[50] !text-neutral-content !bg-neutral dark:!bg-neutral/90"
				>
					<div>
						<span>key: </span>
						<strong className={`text-${colorScale(tooltipData.key)} opacity-80`}>{tooltipData.key}</strong>
					</div>
					<div>
						<span>volume: </span>
						<strong className={`text-${colorScale(tooltipData.key)}`}>{tooltipData.value}</strong>
					</div>
					<div>
						<span>month: </span>
						<strong className={`text-${colorScale(tooltipData.key)} opacity-80`}>
							{timeFormat('%B %Y')(parseDate(data[tooltipData.gid].date))}
						</strong>
					</div>
				</TooltipWithBounds>
			)}
		</div>
	)
}

function ResponsiveBarChart({ maxH = 400 }) {
	return (
		<ParentSize>
			{({ width, height }) => {
				const clampedHeight = Math.min(height, maxH)
				return <BarChart width={width} height={clampedHeight} />
			}}
		</ParentSize>
	)
}
export default ResponsiveBarChart
