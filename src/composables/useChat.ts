import { Chat } from '@/types/chat'
import { Ref, ref } from 'vue'

const chatSettingsRef: Ref<Chat> = ref({
  name: 'Some Chat',
  image: require('@/assets/group.png')
})

const setChatName = (name: string) => {
  chatSettingsRef.value.name = name
}

const setChatImage = (image: string) => {
  chatSettingsRef.value.image = image
}

export default function useChat() {
  return {
    chatSettingsRef,
    setChatName,
    setChatImage
  }
}

export type UseChat = ReturnType<typeof useChat>;
