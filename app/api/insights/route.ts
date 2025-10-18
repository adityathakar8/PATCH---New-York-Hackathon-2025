import { NextRequest, NextResponse } from 'next/server'
import { getLatestAgentInsights, initializeClickHouseTables } from '@/lib/clickhouse'

export async function GET(request: NextRequest) {
  try {
    await initializeClickHouseTables()

    const businessContextId = request.nextUrl.searchParams.get('businessContextId')
    const latest = await getLatestAgentInsights(businessContextId)

    if (!latest) {
      return NextResponse.json({
        data: null,
        message: 'No Airia insights found. Upload data to generate insights.',
      })
    }

    return NextResponse.json({
      data: {
        id: latest.id,
        businessContextId: latest.business_context_id ?? null,
        generatedAt: latest.insights.generatedAt,
        source: latest.insights.source,
        insights: latest.insights,
      },
    })
  } catch (error) {
    console.error('Failed to retrieve Airia insights:', error)
    return NextResponse.json({
      error: 'Failed to fetch Airia insights',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 })
  }
}
