export interface Message {
  title: string
  body: string
  level: 'active' | 'timeSensitive' | 'passive'
  badge: number
  autoCopy: boolean
  copy: string | undefined
  sound: string
  icon: string
  group: string
  isArchive: boolean
  url: string
}

export interface BarkMessage {
  device_key: string
  title: string
  body: string
  level: 'active' | 'timeSensitive' | 'passive'
  badge: number
  autoCopy: boolean
  copy: string | undefined
  sound: string
  icon: string
  group: string
  isArchive: 0 | 1
  url: string
}
