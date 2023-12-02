import { useEffect, useState } from 'react'

interface BatteryStatus {
    level: number
    charging: boolean
}

export const useBattery = (): BatteryStatus | null => {
    const [battery, setBattery] = useState<BatteryStatus | null>(null)

    useEffect(() => {
        const updateBatteryStatus = async () => {
            try {
                /* eslint-disable  @typescript-eslint/no-explicit-any */
                const batteryInfo = await (navigator as any).getBattery()
                setBattery({
                    level: batteryInfo.level * 100,
                    charging: batteryInfo.charging,
                })
            } catch (error) {
                console.error('Error getting battery status:', error)
            }
        }

        updateBatteryStatus()

        const intervalId = setInterval(updateBatteryStatus, 30000)

        return () => clearInterval(intervalId)
    }, [])

    return battery
}
