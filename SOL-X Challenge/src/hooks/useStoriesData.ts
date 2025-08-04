import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Story, UserRank, Vessel, StoryFeature, StorySubmission } from '../types'

export function useStoriesData() {
  const [stories, setStories] = useState<Story[]>([])
  const [userRanks, setUserRanks] = useState<UserRank[]>([])
  const [vessels, setVessels] = useState<Vessel[]>([])
  const [storyFeatures, setStoryFeatures] = useState<StoryFeature[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
    
    // Set up real-time subscriptions
    const storiesSubscription = supabase
      .channel('stories-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'stories' }, () => {
        fetchData()
      })
      .subscribe()

    return () => {
      storiesSubscription.unsubscribe()
    }
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch all data in parallel
      const [storiesResult, ranksResult, vesselsResult, featuresResult] = await Promise.all([
        supabase
          .from('stories')
          .select(`
            *,
            user_rank:user_ranks(*),
            vessel:vessels(*),
            story_feature_tags(
              story_features(*)
            )
          `)
          .eq('published', true)
          .order('created_at', { ascending: false }),
        
        supabase
          .from('user_ranks')
          .select('*')
          .order('display_order'),
        
        supabase
          .from('vessels')
          .select('*')
          .order('display_order'),
        
        supabase
          .from('story_features')
          .select('*')
          .order('display_order')
      ])

      if (storiesResult.error) throw storiesResult.error
      if (ranksResult.error) throw ranksResult.error
      if (vesselsResult.error) throw vesselsResult.error
      if (featuresResult.error) throw featuresResult.error

      // Transform stories data
      const transformedStories: Story[] = storiesResult.data?.map(story => ({
        ...story,
        features: story.story_feature_tags?.map((tag: any) => tag.story_features) || []
      })) || []

      setStories(transformedStories)
      setUserRanks(ranksResult.data || [])
      setVessels(vesselsResult.data || [])
      setStoryFeatures(featuresResult.data || [])
    } catch (err) {
      console.error('Error fetching stories data:', err)
      setError(err instanceof Error ? err.message : 'Unable to connect to database')
    } finally {
      setLoading(false)
    }
  }

  const submitStory = async (submission: StorySubmission) => {
    try {
      setError(null)

      // Validate required fields
      if (!submission.user_name?.trim()) {
        throw new Error('Name is required')
      }
      if (!submission.user_rank_id) {
        throw new Error('Rank is required')
      }
      if (!submission.vessel_id) {
        throw new Error('Vessel is required')
      }
      if (!submission.story?.trim()) {
        throw new Error('Story is required')
      }

      console.log('Submitting story:', submission)

      // Prepare story data - ensure published is false for anonymous submissions
      const storyData = {
        user_name: submission.user_name.trim(),
        user_rank_id: submission.user_rank_id,
        vessel_id: submission.vessel_id,
        story: submission.story.trim(),
        published: false, // Always false for user submissions - moderators will publish
        featured: false,
        avatar: '👤' // Default avatar
      }

      console.log('Inserting story data:', storyData)

      // Insert the story
      const { data: insertedStory, error: storyError } = await supabase
        .from('stories')
        .insert(storyData)
        .select()
        .single()

      if (storyError) {
        console.error('Story insertion error:', storyError)
        throw new Error(`Failed to submit story: ${storyError.message}`)
      }

      console.log('Story inserted successfully:', insertedStory)

      // Insert feature tags if any are selected
      if (submission.feature_ids && submission.feature_ids.length > 0) {
        const featureTags = submission.feature_ids.map(featureId => ({
          story_id: insertedStory.id,
          feature_id: featureId
        }))

        console.log('Inserting feature tags:', featureTags)

        const { error: tagsError } = await supabase
          .from('story_feature_tags')
          .insert(featureTags)

        if (tagsError) {
          console.error('Feature tags insertion error:', tagsError)
          // Don't throw here as the story was already created successfully
          console.warn('Feature tags could not be inserted, but story was created')
        }
      }

      return { success: true, data: insertedStory }
    } catch (err) {
      console.error('Error submitting story:', err)
      let errorMessage = 'Failed to submit story'
      
      if (err instanceof Error) {
        if (err.message.includes('connection') || err.message.includes('network')) {
          errorMessage = 'Connection error. Please check your internet connection and try again.'
        } else {
          errorMessage = err.message
        }
      }
      
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const getFeaturedStories = () => {
    return stories.filter(story => story.featured).slice(0, 3)
  }

  return { 
    stories, 
    userRanks, 
    vessels, 
    storyFeatures, 
    loading, 
    error, 
    submitStory,
    getFeaturedStories,
    refetch: fetchData 
  }
}