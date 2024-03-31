export enum EventType {
  SessionStarted = 'SessionStarted',
  FileOpening = 'FileOpening',
  FileClosed = 'FileClosed',
  SessionEnded = 'SessionEnded',
  StreamStarted = 'StreamStarted',
  StreamEnded = 'StreamEnded',
}

interface BaseEventData {
  RoomId: number
  ShortId: number
  Name: string
  Title: string
  AreaNameParent: string
  AreaNameChild: string
  Recording: boolean
  Streaming: boolean
  DanmakuConnected: boolean
}

export interface Event {
  EventType: EventType
  EventTimestamp: number
  EventId: number
  EventData: BaseEventData
}
