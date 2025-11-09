import Openai from 'openai'
import { config } from '../config'

export const openai = new Openai({
  apiKey: config.OPENAI_API_KEY
})