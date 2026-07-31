import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { assets, goals, totalValue, recommendations } = await request.json()

    // Prepare context for Claude
    const assetsContext = assets
      .map(
        (a: any) =>
          `${a.name} (${a.type}): $${parseFloat(a.totalValue || '0').toLocaleString()} (${a.allocation}% allocation)`
      )
      .join('\n')

    const goalsContext = goals
      .map(
        (g: any) =>
          `${g.name} (${g.goalType}): $${parseFloat(g.currentAmount || '0').toLocaleString()} / $${parseFloat(g.targetAmount || '0').toLocaleString()} - ${g.priority} priority`
      )
      .join('\n')

    const recsContext = recommendations.map((r: any) => `- ${r.title}: ${r.description}`).join('\n')

    const prompt = `You are a professional financial advisor analyzing a client's portfolio and providing personalized insights. 
    
    Portfolio Summary:
    - Total Value: $${totalValue.toLocaleString()}
    - Number of Holdings: ${assets.length}
    
    Current Holdings:
    ${assetsContext}
    
    Financial Goals:
    ${goalsContext || 'No goals set'}
    
    Algorithm-Generated Recommendations:
    ${recsContext}
    
    Provide a concise 2-3 sentence AI-generated summary of this portfolio. Focus on:
    1. Overall portfolio health and diversification
    2. How assets align with stated goals
    3. One key insight or actionable next step
    
    Be encouraging but honest. Use professional but approachable language. Do not exceed 150 words.`

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      system: 'You are a professional financial advisor providing personalized portfolio insights based on asset allocation, goals, and financial recommendations.',
      prompt: prompt,
      temperature: 0.7,
      maxTokens: 200,
    })

    // Return streaming response
    return new Response(result.toTextStream(), {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Error generating insights:', error)
    return new Response(
      JSON.stringify({
        error: 'Failed to generate insights',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
