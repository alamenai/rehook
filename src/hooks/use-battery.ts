import { useEffect, useState } from 'react'

interface BatteryManager {
    charging: boolean
    chargingTime: number
    dischargingTime: number
    level: number
}

export const useBattery = (): BatteryManager | undefined => {
    const [battery, setBattery] = useState<BatteryManager>()

    const updateBatteryStatus = async () => {
        try {
            /* eslint-disable  @typescript-eslint/no-explicit-any */
            const batteryInfo: BatteryManager = await (navigator as any).getBattery()

            if (batteryInfo) {
                setBattery(batteryInfo)
            }
        } catch (error) {
            console.error('Error getting battery status:', error)
        }
    }

    useEffect(() => {
        updateBatteryStatus()

        const intervalId = setInterval(updateBatteryStatus, 30000)

        return () => clearInterval(intervalId)
    }, [])

    return battery
}
