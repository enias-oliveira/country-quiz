// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export interface Quiz {
  questionType: Question
  alternatives: [string, string, string, string]
  correctAlternativeIndex: number
  capital?: string
  flagUrl?: string
}

export type Question = 'flag' | 'capital'

export interface Country {
  name: string
  capital: string
  flagUrl: string
}
