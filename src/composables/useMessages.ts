import { Message, MessageId } from '@/types/message'
import { Member } from '@/types/member'
import { Ref, ref, computed } from 'vue'

const defaultMessages: any = [
  {
    text: '2020 has entered the chat',
    memberId: 0
  },
  {
    text: 'Hello everybody 👋',
    memberId: 1
  },
  {
    text: 'Let\'s get t his started',
    memberId: 2
  }
]
const messagesRef: Ref<Message[]> = ref(defaultMessages.map((message: any, i: number) => {
  return {
    ...message,
    id: i,
    order: i + 1
  }
}))

export default function useMessages() {
  let i = defaultMessages.length

  const createMessage = (text: string, image: string, member: Member) => {
    const newMessage: Message = {
      id: i++,
      text,
      image,
      order: messagesRef.value.length + 1,
      memberId: member.id
    }
    messagesRef.value.push(newMessage)
  }

  const updateMessage = (newMessage: Message) => {
    const index = messagesRef.value.findIndex((message) => message.id === newMessage.id)
    if (index < 0) {
      return
    }
    messagesRef.value[index] = newMessage
  }

  const removeMessage = (id: MessageId) => {
    const index = messagesRef.value.findIndex((message) => message.id === id)
    if (index < 0) {
      return
    }
    const message = messagesRef.value[index]
    const order = message.order
    messagesRef.value.splice(index, 1)
    messagesRef.value.forEach((message) => {
      if (message.order > order) {
        message.order = message.order - 1
      }
    })
  }

  const getMessage = (id: MessageId): Message | undefined => {
    return messagesRef.value.find((message) => message.id === id)
  }

  const sortMessages = (sourceMessage: Message, targetMessage: Message): void => {
    const sourceOrder = sourceMessage.order
    const targetOrder = targetMessage.order
    if (sourceOrder === targetOrder) {
      return
    }
    messagesRef.value.forEach((message) => {
      if (message.id === sourceMessage.id) {
        return
      }
      if (targetOrder > sourceOrder) {
        if (message.order > sourceOrder && message.order <= targetOrder) {
          message.order = message.order - 1
        }
      } else {
        if (message.order < sourceOrder && message.order > targetOrder) {
          message.order = message.order + 1
        }
      }
    })
    if (targetOrder > sourceOrder) {
      sourceMessage.order = targetOrder
    } else {
      sourceMessage.order = targetOrder + 1
    }
  }

  const sortedMessagesRef: Ref<Message[]> = computed(() => messagesRef.value.sort((a, b) => (a.order > b.order) ? 1 : -1))

  return {
    messagesRef,
    createMessage,
    updateMessage,
    removeMessage,
    getMessage,
    sortMessages,
    sortedMessagesRef
  }
}

export type UseMessages = ReturnType<typeof useMessages>;
