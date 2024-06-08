import { useBattery } from '../use-battery'
import { renderHook } from '@testing-library/react'

describe('useBattery', () => {
    it('should return the level and charging status of the battery', async () => {
        if ('getBattery' in navigator) {
            /* eslint-disable  @typescript-eslint/no-explicit-any */
            const battery = await (navigator as any).getBattery()
            const { result } = renderHook(() => useBattery())
            expect(result.current?.level).toBe(battery.level)
            expect(result.current?.charging).toBe(battery.charging)
        }
    })
})
