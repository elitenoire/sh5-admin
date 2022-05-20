import { Group } from '@visx/group'
import { BarGroup } from '@visx/shape'
import { AxisBottom } from '@visx/axis'
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale'
import { useTooltip, useTooltipInPortal, defaultStyles } from '@visx/tooltip'
import { LegendOrdinal } from '@visx/legend'
import { Text } from '@visx/text'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { timeParse, timeFormat } from 'd3-time-format'

import { data, keys } from './data/monthlyActivity'

const blue = '#aeeef8'
export const green = '#e5fd3d'
const purple = '#9caff6'
export const background = '#612efb'

const defaultMargin = { top: 60, right: 10, bottom: 40, left: 10 }
const tooltipStyles = {
	...defaultStyles,
	minWidth: 60,
	backgroundColor: 'rgba(0,0,0,0.9)',
	color: 'white',
	padding: 20,
	borderRadius: 12,
}

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

let tooltipTimeout

function logger(data) {
	console.log(data)
}

function BarChart({ width, height, events = false, margin = defaultMargin }) {
	const { tooltipOpen, tooltipTop, tooltipLeft, hideTooltip, showTooltip, tooltipData } = useTooltip()

	const { containerRef, TooltipInPortal } = useTooltipInPortal()

	// bounds
	const xMax = width - margin.left - margin.right
	const yMax = height - margin.top - margin.bottom

	// update scale output dimensions
	dateScale.rangeRound([0, xMax])
	volumeScale.range([yMax, 0])
	activityScale.rangeRound([0, dateScale.bandwidth()])

	return width < 10 ? null : (
		<div style={{ position: 'relative' }}>
			<svg ref={containerRef} width={width} height={height}>
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
											rx={4}
											onClick={() => {
												if (!events) return
												const { key, value, color } = bar
												alert(JSON.stringify({ key, value, color }))
											}}
											onMouseLeave={() => {
												tooltipTimeout = window.setTimeout(() => {
													hideTooltip()
												}, 300)
											}}
											onMouseMove={event => {
												if (tooltipTimeout) clearTimeout(tooltipTimeout)
												const top = event.clientY - margin.top - bar.height
												const left = bar.x + bar.width / 2
												// console.log({ bar, barGroups })
												showTooltip({
													tooltipData: { ...bar, gid: barGroup.index },
													tooltipTop: top,
													tooltipLeft: left,
												})
											}}
										/>
									))}
								</Group>
							))
						}
					</BarGroup>
				</Group>
				<AxisBottom
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
				<Text x={margin.left * 3} y={margin.top / 1.5} className="text-xl font-medium fill-base-content">
					Monthly Activities (Jan - May)
				</Text>
			</svg>
			<div className={`absolute flex justify-center text-sm w-full py-2`}>
				<LegendOrdinal
					scale={colorScale}
					// shapeStyle={({value}) => ({

					// })}
					shape="circle"
					direction="row"
					labelMargin="0 1rem 0 0"
				/>
			</div>
			{tooltipOpen && tooltipData && (
				<TooltipInPortal key={Math.random()} top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
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
				</TooltipInPortal>
			)}
		</div>
	)
}

function ResponsiveBarChart({ maxH = 500 }) {
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
