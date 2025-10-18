"use client"

import { useEffect, useState } from 'react'
import type { AiriaAgentInsights } from '@/lib/airia'

interface UseAgentInsightsResult {
  insights: AiriaAgentInsights
  isLoading: boolean
  source: 'mock' | 'airia'
}

const FALLBACK_INSIGHTS: AiriaAgentInsights = {
  generatedAt: new Date().toISOString(),
  source: 'mock',
  marginAtRisk: {
    window: '30–90d',
    value: -12,
    direction: 'down',
    sparkline: [42, 40, 38, 36, 35, 33, 32, 30, 30, 28, 28, 30],
    message: 'Baseline fallback insights. Connect to Airia to unlock live analytics.',
  },
  ingredientMovers: [
    {
      sku: 'PRO-001',
      ingredient: 'Creatine',
      location: 'CN',
      trend: 'RISING',
      deltaRisk: 12,
      note: 'Mock data pending Airia agent output.',
    },
  ],
  portfolioRisks: [
    {
      id: 'fallback-1',
      sku: 'PRO-001',
      ingredient: 'Creatine',
      source: 'CN',
      riskTier: 'High',
      deltaCogs: 18,
      oldMargin: 42,
      newMargin: 28,
      deltaEbitda: -14,
    },
  ],
  ticker: [
    { name: 'Creatine', location: 'CN', risk: 'HIGH', change: 'ΔCOGS +18%' },
  ],
  topAlerts: [
    {
      title: 'Connect Airia agent',
      summary: 'Once Airia runs your workflow, alerts will update automatically.',
      confidence: 0.5,
      severity: 'low',
    },
  ],
}

export function useAgentInsights(): UseAgentInsightsResult {
  const [insights, setInsights] = useState<AiriaAgentInsights>(FALLBACK_INSIGHTS)
  const [isLoading, setIsLoading] = useState(true)
  const [source, setSource] = useState<'mock' | 'airia'>(FALLBACK_INSIGHTS.source)

  useEffect(() => {
    let isMounted = true

    const readFromSessionStorage = () => {
      if (typeof window === 'undefined') return
      const stored = window.sessionStorage.getItem('agentInsights')
      const storedSource = window.sessionStorage.getItem('agentInsightsSource')
      const generatedAt = window.sessionStorage.getItem('agentInsightsGeneratedAt')

      if (stored) {
        try {
          const parsed = JSON.parse(stored) as AiriaAgentInsights
          if (parsed && typeof parsed === 'object') {
            parsed.generatedAt = generatedAt || parsed.generatedAt || new Date().toISOString()
            if (isMounted) {
              setInsights(parsed)
              if (storedSource === 'airia' || storedSource === 'mock') {
                setSource(storedSource)
              } else if (parsed.source === 'airia' || parsed.source === 'mock') {
                setSource(parsed.source)
              }
            }
          }
        } catch (error) {
          console.warn('Failed to parse stored agent insights:', error)
        }
      }
    }

    readFromSessionStorage()

    const fetchLatestInsights = async () => {
      try {
        const response = await fetch('/api/insights', { cache: 'no-store' })
        if (!response.ok) {
          return
        }
        const payload = await response.json()
        const latest = payload?.data?.insights ?? payload?.data
        if (!latest) {
          return
        }
        if (isMounted) {
          setInsights(latest as AiriaAgentInsights)
          const resolvedSource = (payload?.data?.source as 'mock' | 'airia') || (latest.source as 'mock' | 'airia')
          if (resolvedSource === 'airia' || resolvedSource === 'mock') {
            setSource(resolvedSource)
          }
          if (typeof window !== 'undefined') {
            window.sessionStorage.setItem('agentInsights', JSON.stringify(latest))
            if (payload?.data?.generatedAt) {
              window.sessionStorage.setItem('agentInsightsGeneratedAt', payload.data.generatedAt)
            }
            if (payload?.data?.source) {
              window.sessionStorage.setItem('agentInsightsSource', payload.data.source)
            }
          }
        }
      } catch (error) {
        console.warn('Unable to fetch latest Airia insights:', error)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchLatestInsights()

    return () => {
      isMounted = false
    }
  }, [])

  return {
    insights,
    isLoading,
    source,
  }
}
