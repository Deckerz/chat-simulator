import { Member, MemberId } from '@/types/member'
import { Ref, ref } from 'vue'

const defaultMembers: Member[] = [
  {
    id: 0,
    name: 'Admin',
    color: 'blueGray'
  },
  {
    id: 1,
    name: 'You',
    color: 'gray'
  },
  {
    id: 2,
    name: 'People',
    color: 'violet'
  },
  {
    id: 3,
    name: 'Dave',
    color: 'cyan'
  },
  {
    id: 4,
    name: 'Greg',
    color: 'emerald'
  },
  {
    id: 5,
    name: 'Amber',
    color: 'amber'
  }
]
const membersRef: Ref<Member[]> = ref(defaultMembers)

const possibleColors = [
  'gray',
  'rose',
  'fuchsia',
  'violet',
  'blue',
  'cyan',
  'emerald',
  'lime',
  'amber'
]

export default function useMembers() {
  let i = defaultMembers.length + 1

  const createMember = (name: string, image?: string) => {
    const firstUnusedColor = possibleColors.find((possibleColor) => !membersRef.value.some((member) => member.color === possibleColor))
    const newMember: Member = {
      name,
      image,
      color: firstUnusedColor || 'gray',
      id: i++
    }
    membersRef.value.push(newMember)
  }

  const updateMember = (newMember: Member) => {
    const memberIndex = membersRef.value.findIndex((member) => member.id === newMember.id)
    if (!memberIndex) {
      return
    }
    membersRef.value[memberIndex] = newMember
  }

  const removeMember = (id: MemberId) => {
    if (!id) {
      return
    }
    const memberIndex = membersRef.value.findIndex((member) => member.id === id)
    membersRef.value.splice(memberIndex, 1)
  }

  const getMember = (id: MemberId): Member | undefined => {
    return membersRef.value.find((member) => member.id === id)
  }

  return {
    membersRef,
    createMember,
    updateMember,
    removeMember,
    getMember,
    possibleColors
  }
}

export type UseMembers = ReturnType<typeof useMembers>;
