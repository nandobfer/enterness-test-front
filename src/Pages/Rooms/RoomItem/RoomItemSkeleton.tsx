import React from "react"
import { Avatar, Box, Chip, Paper, Skeleton, Typography } from "@mui/material"
import { Group } from "@mui/icons-material"

interface RoomItemSkeletonProps {}

export const RoomItemSkeleton: React.FC<RoomItemSkeletonProps> = (props) => {
    return (
        <Paper sx={{ flex: 1, padding: 2, borderRadius: 3, gap: 2, alignItems: "center" }} elevation={0}>
            <Avatar sx={{ bgcolor: "transparent" }}>
                <Skeleton variant="circular" width={40} height={40} />
            </Avatar>

            <Box sx={{ flexDirection: "column", flex: 1 }}>
                <Box sx={{ alignItems: "center", justifyContent: "space-between" }}>
                    <Typography variant="body1">
                        <Skeleton width={100} />
                    </Typography>
                    <Chip icon={<Group />} label={<Skeleton width={20} />} size="small" />
                </Box>

                <Box sx={{ justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="subtitle2" color="textSecondary" noWrap>
                        <Skeleton width={300} />
                    </Typography>
                    {/* data */}
                </Box>
            </Box>
        </Paper>
    )
}
