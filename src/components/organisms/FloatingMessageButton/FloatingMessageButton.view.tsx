'use client'

import { MessageSquareIcon } from 'lucide-react'

export default function FloatingMessageButton() {
  return (
    <button
      className="fixed z-3333333 bottom-6 right-6 bg-white hover:bg-blue-700  p-4 rounded-full shadow-lg transition-all flex items-center justify-center"
      aria-label="Abrir mensagens"
    >
      <MessageSquareIcon size={36} fill="#080f38" strokeWidth={0}/>
    </button>
  )
}
