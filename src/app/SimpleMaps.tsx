"use client"
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps"
import { mapData } from "./canada.topojson"
import { geoCentroid } from "d3-geo"
import { Box, Tooltip } from "@mui/material"
import React from "react"
import { Instance } from "@popperjs/core"

export function SimpleMapsExample() {
  const positionRef = React.useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })
  const popperRef = React.useRef<Instance>(null)
  const areaRef = React.useRef<HTMLDivElement>(null)

  const handleMouseMove = (event: React.MouseEvent) => {
    positionRef.current = { x: event.clientX, y: event.clientY }

    if (popperRef.current != null) {
      popperRef.current.update()
    }
  }

  return (
    <ComposableMap
      style={{ backgroundColor: "pink" }}
      projection="geoAlbers"
      projectionConfig={{
        scale: 700,
        center: [0, 60],
      }}
      fill="white"
      stroke="black"
      strokeWidth={0.5}
    >
      <Geographies geography={mapData.data}>
        {({ geographies }) => {
          return (
            <>
              {geographies.map((geo, index) => {
                return (
                  <Tooltip
                    key={geo.rsmKey}
                    title={geo.properties.name}
                    followCursor
                  >
                    <Geography
                      geography={geo}
                      key={geo.rsmKey}
                      style={{
                        default: {
                          fill: "lightblue",
                          filter: `brightness(${
                            index * (100 / geographies.length)
                          }%)`,
                        },
                        hover: {
                          fill: "lightblue",
                        },
                      }}
                    />
                  </Tooltip>
                )
              })}

              {geographies.map((geo) => {
                return (
                  <Marker
                    key={geo.rsmKey}
                    coordinates={
                      geo.properties.name === "Quebec"
                        ? [50.91648847230855, -78.75478201144095]
                        : geoCentroid(geo)
                    }
                  >
                    <text textAnchor="middle">{geo.properties.name}</text>
                  </Marker>
                )
              })}
            </>
          )
        }}
      </Geographies>
    </ComposableMap>
  )
}
