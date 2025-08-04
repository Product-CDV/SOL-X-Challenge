import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Challenge, LeaderboardEntry, Participant, Prize, CrewLeaderboard, VesselLeaderboard } from '../types'

export function useSupabaseData() {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
    
    // Set up real-time subscriptions
    const challengesSubscription = supabase
      .channel('challenges-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'challenges' }, () => {
        fetchData()
      })
      .subscribe()

    const prizesSubscription = supabase
      .channel('prizes-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'prizes' }, () => {
        fetchData()
      })
      .subscribe()

    const participantsSubscription = supabase
      .channel('participants-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'participants' }, () => {
        fetchData()
      })
      .subscribe()

    const crewLeaderboardSubscription = supabase
      .channel('crew-leaderboards-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'crew_leaderboards' }, () => {
        fetchData()
      })
      .subscribe()

    const vesselLeaderboardSubscription = supabase
      .channel('vessel-leaderboards-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'vessel_leaderboards' }, () => {
        fetchData()
      })
      .subscribe()

    return () => {
      challengesSubscription.unsubscribe()
      prizesSubscription.unsubscribe()
      participantsSubscription.unsubscribe()
      crewLeaderboardSubscription.unsubscribe()
      vesselLeaderboardSubscription.unsubscribe()
    }
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch challenges with prizes
      const { data: challengesData, error: challengesError } = await supabase
        .from('challenges')
        .select(`
          *,
          prizes (*)
        `)
        .order('created_at')

      if (challengesError) throw challengesError

      // Fetch participants (legacy data for backward compatibility)
      const { data: participantsData, error: participantsError } = await supabase
        .from('participants')
        .select('*')
        .order('rank')

      if (participantsError) throw participantsError

      // Fetch crew leaderboards
      const { data: crewLeaderboardData, error: crewError } = await supabase
        .from('crew_leaderboards')
        .select('*')
        .order('rank')

      if (crewError) throw crewError

      // Fetch vessel leaderboards
      const { data: vesselLeaderboardData, error: vesselError } = await supabase
        .from('vessel_leaderboards')
        .select('*')
        .order('rank')

      if (vesselError) throw vesselError

      // Transform data to match existing types
      const transformedChallenges: Challenge[] = challengesData?.map(challenge => ({
        id: challenge.id,
        name: challenge.name,
        description: challenge.description,
        category: challenge.category,
        icon: challenge.icon,
        gradient: challenge.gradient,
        start_date: challenge.start_date,
        end_date: challenge.end_date,
        prizes: challenge.prizes?.map((prize: any) => ({
          position: prize.position,
          title: prize.title,
          description: prize.description,
          value: prize.value
        })) || []
      })) || []

      // Define custom order with Walk the Deck first (only vessel version for leaderboard)
      const challengeOrder = [
        'steps-count',           // Walk the Deck (Vessel) - first and only
        'geofence',              // Put a Ring on Me
        'heat-stress',           // Sizzling Seas
        'heart-rate',            // Heartbeat of the Ocean
        'smartwatch-utilisation', // Smartwatch Utilisation
        'user-experience'        // SOL-X Hero (stories only)
      ]

      // Filter out walk-the-deck-crew from leaderboard display
      const filteredChallenges = transformedChallenges.filter(challenge => 
        challenge.id !== 'steps-count-crew'
      )

      // Sort challenges according to custom order
      const sortedChallenges = filteredChallenges.sort((a, b) => {
        const aIndex = challengeOrder.indexOf(a.id)
        const bIndex = challengeOrder.indexOf(b.id)
        
        // If challenge not in order array, put it at the end
        if (aIndex === -1 && bIndex === -1) return 0
        if (aIndex === -1) return 1
        if (bIndex === -1) return -1
        
        return aIndex - bIndex
      })

      // Group participants by challenge (legacy)
      const participantsByChallenge = participantsData?.reduce((acc, participant) => {
        if (!acc[participant.challenge_id]) {
          acc[participant.challenge_id] = []
        }
        acc[participant.challenge_id].push({
          id: participant.id,
          name: participant.name,
          avatar: participant.avatar,
          score: participant.score,
          challengeId: participant.challenge_id,
          rank: participant.rank,
          badge: participant.badge
        })
        return acc
      }, {} as Record<string, Participant[]>) || {}

      // Group crew leaderboards by challenge
      const crewLeaderboardsByChallenge = crewLeaderboardData?.reduce((acc, crew) => {
        if (!acc[crew.challenge_id]) {
          acc[crew.challenge_id] = []
        }
        acc[crew.challenge_id].push(crew)
        return acc
      }, {} as Record<string, CrewLeaderboard[]>) || {}

      // Group vessel leaderboards by challenge
      const vesselLeaderboardsByChallenge = vesselLeaderboardData?.reduce((acc, vessel) => {
        if (!acc[vessel.challenge_id]) {
          acc[vessel.challenge_id] = []
        }
        acc[vessel.challenge_id].push(vessel)
        return acc
      }, {} as Record<string, VesselLeaderboard[]>) || {}

      // Create leaderboard entries in the same order as challenges
      const transformedLeaderboardData: LeaderboardEntry[] = sortedChallenges.map(challenge => ({
        challengeId: challenge.id,
        challengeName: challenge.name,
        participants: participantsByChallenge[challenge.id] || [],
        crewLeaderboard: crewLeaderboardsByChallenge[challenge.id] || [],
        vesselLeaderboard: vesselLeaderboardsByChallenge[challenge.id] || []
      }))

      setChallenges(sortedChallenges)
      setLeaderboardData(transformedLeaderboardData)
    } catch (err) {
      console.error('Error fetching data:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return { challenges, leaderboardData, loading, error, refetch: fetchData }
}